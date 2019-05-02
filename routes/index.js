var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var fs = require('fs');
var path = require('path');
var util = require('util');
var csv=require('csvtojson')
var database = require('../config/database');


// To home page
router.get('/', (req, res, next)=>{
  database.connectToServer(function (value) {   
    var db = database.getDb();
    console.log(db);
    let distinctProject;  
    var collection = db.collection( 'project');
    var distinct = collection.distinct('projectname');
    // Select all the projects from the database
    distinct.then(project =>{  
      var data = {projectName : project};
      res.render('./main', data)
    });
  });
})

// Submit created project
router.post('/', function(req, res, next){
  //Logic for reading csv goes here
  var form = new formidable.IncomingForm();
  form.parse(req, function(err, fields, files){
    let fileLength = Object.keys(files).length;
    let fileNames = [];
    let projectName = fields.project;
    // csv file as well as a callback function
    for(var fileIndex = 0; fileIndex < fileLength; fileIndex++){
      fileIndex = fileIndex.toString();
      let fileName = path.parse(files['csvfile'+fileIndex].name).name; 
      fileNames.push(fileName);
      if(fileName != ""){
        // Reading CSV file
        csv().fromFile(files['csvfile'+fileIndex].path).then(function(result, err){      
          // if an error has occured then handle it
          if(err) throw err;
          // Adding attributes filename and projectname in a json to further differentiate the projects
          for(var index = 0; index < result.length-1; index++){
            result[index].filename = fileName;
            result[index].projectname = projectName;
          }
          // Inserting the data fetched from csv file in a database.
          database.connectToServer(function () {
            var db = database.getDb();
            var collection = db.collection( 'project' );
              collection.insertMany(result);
          });
        });
      }
    }   
    res.redirect('/');  
  })
})

// Visualize facebook data
router.get('/facebook/:lists', function(req, res, next) {
  //list contains the arguments of fb_id whose details have to visualized
  var data = [];
  var tempData;
  var l=req.params.lists;
  var list=l.split(',');

  database.connectToServer(function () {
    var db = database.getDb();
    /* 
       fetching data from frnd collection and converting it to array
       which return a Promise. Using the promeise to get the data 
    */
    db.collection( 'frnd' ).find().toArray().then( (result) => {
      var fetchData = [];
      /* 
        Iterating through the friend list of each result to create a
        json object such that each json contains one friend name init accordingly 
        if there is a friened list of 1000 friends than it create 1000 objects with a user mapped to each friend. 
      */
      //data is fetched from frnd collections
      result.forEach((friend)=>{
        if (list.indexOf(friend.fb_id) >= 0) { //filtering and taking only those provided in the list 
          friend.Friend_List.forEach( (list) => {
            tempData = {
              username: friend.username+'-'+friend.fb_id,
              friends : list.username+'-'+list.fb_id
            }
            fetchData.push(tempData);
          });
        }
      });  
      // Writing fetched data in a facebookData.js file
      fs.writeFileSync('./public/data/facebookData.js', '', function(){console.log('done')})
      fs.appendFileSync('./public/data/facebookData.js', 'var facebookData'+'= [', function (err) {
        if (err) throw err;
      });
      for(var index = 0; index < fetchData.length-1; index++){
        fs.appendFileSync('./public/data/facebookData.js', util.inspect(fetchData[index])+',\n', function (err) {
          if (err) throw err;
        });
      }
      fs.appendFileSync('./public/data/facebookData.js', util.inspect(fetchData[fetchData.length-1])+']', function (err) {
        if (err) throw err;
      });
      res.render('./facebook', {
        filesLength: 1,
        fileNames : ['facebookData'],
      }); 
    });
  });
});


// Visualizing project data
router.get('/project/:name', (req, res, next)=>{
  // Connect to database
  database.connectToServer(function () {
    var db = database.getDb();
    var projectName = req.params.name;
    var collection = db.collection( 'project'); // Select a collection
    /* 
      Select query for the selected project.
      This query is = "SELECT * FROM project WHERE projectname='projectName'";
      converting the fetch result to array which returns promise.
    */
    var projectDocs = db.collection( 'project').find({'projectname': projectName}).toArray().then( (project) => {
      // Finding the different files in a selected project.
      collection.distinct('filename', {'projectname': projectName}).then( (files) => {
        let fileLength = files.length;
        let fileNames = [];
        let fetchData = [];
        // Creating js file for the same.
        for(var fileIndex = 0; fileIndex < fileLength; fileIndex++){
          fileNames.push('fileName'+fileIndex);
          fs.writeFileSync('./public/data/fileName'+fileIndex+'.js', '', function(){console.log('done')})
          fs.appendFileSync('./public/data/fileName'+fileIndex+'.js', 'var fileName'+fileIndex+'= [', function (err) {
            if (err) throw err;      
          }); 
          // Iterating through selected project and removing mongodbs default _id. and writing in js file,
          project.forEach( (data) => {
            delete data._id;
            if(data.filename == files[fileIndex]){
              fs.appendFileSync('./public/data/fileName'+fileIndex+'.js', util.inspect(data)+',\n', function (err) {
                if (err) throw err;
              });
            }
          })
          fs.appendFileSync('./public/data/fileName'+fileIndex+'.js', ']', function (err) {
            if (err) throw err;
          });
        } 
        res.render('project',{
          filesLength: fileLength,
          fileNames: fileNames,
          projectName: projectName
        }); 
      });
    });
  });
})



// router.get('/common/:files', function(req, res, next){
//   console.log(req.params);
//   res.render('./gen_vis/common',{
//     filesLength: req.params.files.split('-').length,
//     fileNames:req.params.files.split('-')
//   });
// })

module.exports = router;