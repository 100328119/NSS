const express = require('express');
const report = express.Router();
const network = require('../model/network');
const db = require('../model/db');
var multer = require('multer');
var upload = multer({ dest: 'uploads/' });
var fs = require('fs');


//report data minipuplate
report.get('/:id', function(req, res,nex){

});

report.post('/new', upload.array('pdfs'), function(req,res,nex){
  const files = req.files;

  for (let i = 0, len = files.length; i < len; i++) {
    let oldpath = files[i].path;
    let newpath = files[i].destination + files[i].originalname;

    fs.rename(oldpath, newpath, function (err) {
      if (err) return err;
    });
  }

  res.json(req.files);
});

report.put('/update/:id',function(req,res,nex){

});

report.delete('/delete/:id', function(req,res,nex){

});

module.exports = report;
