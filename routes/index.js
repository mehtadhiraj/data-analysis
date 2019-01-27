var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var fs = require('fs');
var path = require('path');
var util = require('util');
var csv=require('csvtojson')
var execSync = require('child_process').execSync;
var code = execSync('node -v');

/* GET home page. */
router.get('/', function(req, res, next) {
  
  res.render('./gen_vis/main', {
      filesLength : 0
  });
});

router.post('/', function(req, res, next){
  //Logic for reading csv goes here
  var fileNames = [];
  var fetchData = [];
  var data = [];
  var leafNode;
  var form = new formidable.IncomingForm();
  form.parse(req, function(err, fields, files){
    leafNode = Object.keys(fields);
    console.log(leafNode);
    let fileLength = Object.keys(files).length
    // csv file as well as a callback function
    for(var fileIndex = 0; fileIndex < fileLength; fileIndex++){
      fileIndex = fileIndex.toString();
      let fileName = path.parse(files['csvfile'+fileIndex].name).name; 
      fileNames.push(fileName);
      if(fileName != ""){
        csv().fromFile(files['csvfile'+fileIndex].path).then(function(result, err){
          // if an error has occured then handle it
          if(err){
              console.log("An Error Has Occured");
              console.log(err);  
          }
          fs.writeFileSync('./public/data/'+fileName+'.js', '', function(){console.log('done')})
          fs.appendFileSync('./public/data/'+fileName+'.js', 'var '+ fileName +'= [', function (err) {
            if (err) throw err;
            console.log('Saved!');
          });
          for(var index = 0; index < result.length-1; index++){
            fetchData.push(result[index])
            fs.appendFileSync('./public/data/'+fileName+'.js', util.inspect(result[index])+',\n', function (err) {
              if (err) throw err;
              console.log('Saved!');
            });
          }
          fs.appendFileSync('./public/data/'+fileName+'.js', util.inspect(result[result.length-1])+']', function (err) {
            if (err) throw err;
            console.log('Saved!');
          });
          // var fetchData = require('../public/data/'+fileName);
          // data.push(fetchData);
          // console.log(fetchData);
          data.push(fetchData);
          // console.log(data)
        });
      }
    }
    // console.log(data);
    res.render('gen_vis/main', {
        filesLength: fileNames.length,
        data : data,
        fileNames : fileNames,
        leafNode : leafNode[0]
    });
    // res.render('./gen_vis/main', {
    //   filesLength : 0
    // });  
  })
})

module.exports = router;