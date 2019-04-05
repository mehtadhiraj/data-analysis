var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var fs = require('fs');
var path = require('path');
var util = require('util');
var csv=require('csvtojson')
var execSync = require('child_process').execSync;
var code = execSync('node -v');
var database = require('../config/database');
var Sync = require('sync');
var fileNames = [];
const fetchData = [];

router.get('/', (req, res, next)=>{
  
  database.connectToServer(function () {
    var db = database.getDb();
    let distinctProject;  
    var collection = db.collection( 'project');
    var distinct = collection.distinct('projectName');
    
    distinct.then(project =>{  
      var data = {projectName : project};
      console.log(data);
      res.render('./main', data)
    });
  });
})

/* GET home page. */
router.get('/facebook', function(req, res, next) {
  var data = [];
  var leafNode = ['facebookData'];
  var tempData;
  var db;
  database.connectToServer(function () {
    db = database.getDb();
    db.collection( 'frnd' ).find().forEach( result => {
      // tempData = result;
      // fetchData.push(tempData);
      result.Friend_List.forEach((list)=>{
        tempData = {
          username: result.username+'-'+result.fb_id,
          friends : list.username+'-'+list.fb_id
        }
        // tempData.Friend_List = list.username+'-'+list.fb_id;
        fetchData.push(tempData);
      });
      // console.log(fetchData);
      
      // // var fetchData = require('../public/data/facebookData');
      // // data.push(fetchData);
      // // console.log(fetchData);
      // data.push(fetchData);
    });
    console.log(fetchData, '===============');
    var data = [];
    fs.writeFileSync('./public/data/facebookData.js', '', function(){console.log('done')})
    fs.appendFileSync('./public/data/facebookData.js', 'var facebookData'+'= [', function (err) {
      if (err) throw err;
      console.log('Saved!');
    });
    for(var index = 0; index < fetchData.length-1; index++){
      data.push(fetchData[index])
      fs.appendFileSync('./public/data/facebookData.js', util.inspect(fetchData[index])+',\n', function (err) {
        if (err) throw err;
        console.log('Saved!');
      });
    }
    fs.appendFileSync('./public/data/facebookData.js', util.inspect(fetchData[fetchData.length-1])+']', function (err) {
      if (err) throw err;
      console.log('Saved!');
    });
    res.render('./facebook', {
      filesLength: 1,
      data : data,
      fileNames : ['facebookData'],
      leafNode : leafNode[0]
    });  
  });

  
});


// Get request to project page
router.get('/project', (req, res, next)=>{
  res.render('project')
})

router.post('/', function(req, res, next){
  //Logic for reading csv goes here
  
  var fetchData = [];
  var data = [];
  var leafNode;
  // var form = new formidable.IncomingForm();
  // form.parse(req, function(err, fields, files){
  //   leafNode = Object.keys(fields);
  //   let fileLength = Object.keys(files).length
    // csv file as well as a callback function
    // for(var fileIndex = 0; fileIndex < fileLength; fileIndex++){
    //   fileIndex = fileIndex.toString();
    //   let fileName = path.parse(files['csvfile'+fileIndex].name).name; 
    //   fileNames.push(fileName);
    //   if(fileName != ""){
    //     csv().fromFile(files['csvfile'+fileIndex].path).then(function(result, err){
          
    //       // if an error has occured then handle it
    //       if(err){
    //           console.log("An Error Has Occured");
    //           console.log(err);  
    //       }
    //       fs.writeFileSync('./public/data/'+fileName+'.js', '', function(){console.log('done')})
    //       fs.appendFileSync('./public/data/'+fileName+'.js', 'var '+ fileName +'= [', function (err) {
    //         if (err) throw err;
    //         console.log('Saved!');
    //       });
    //       for(var index = 0; index < result.length-1; index++){
    //         result[index].projectName = fields.project;
    //         fetchData.push(result[index])
    //         fs.appendFileSync('./public/data/'+fileName+'.js', util.inspect(result[index])+',\n', function (err) {
    //           if (err) throw err;
    //           console.log('Saved!');
    //         });
    //       }
    //       result[result.length-1].projectName = fields.project;
    //       fs.appendFileSync('./public/data/'+fileName+'.js', util.inspect(result[result.length-1])+']', function (err) {
    //         if (err) throw err;
    //         console.log('Saved!');
    //       });
          
    //       database.connectToServer(function () {
    //         var db = database.getDb();
    //         var collection = db.collection( 'project' );
    //         collection.insertMany(result);
    //       });
    //       data.push(fetchData);
    //     });
    //   }
    // }
    
    res.render('./main');  
  })
// })

// router.get('/common/:files', function(req, res, next){
//   console.log(req.params);
//   res.render('./gen_vis/common',{
//     filesLength: req.params.files.split('-').length,
//     fileNames:req.params.files.split('-')
//   });
// })

module.exports = router;