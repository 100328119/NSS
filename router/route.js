//import infrastructure package
const express = require('express');
const fs = require('fs');
const router = express.Router();

//page redirection
router.get('/dashboard', function (req, res, next) {
  // render dashborad page
  res.render('dashboard');
});

router.get('/login', function (req, res, nex) {
  res.render('login', { layout: false });
});

router.get('/register', function (req, res, nex) {
  res.render('register', { layout: false });
});

router.get('/newtork/:type/:id', function (req, res, nex) {
  //render newtork network info page
  res.render('network');
});

router.get('/network/new', function (req, res, nex) {
  //render create new newtork page
  res.render('newNetwork');
});

router.get('/report/:id', function (req, res, next) {
  //render Operation report page
  res.render('report');
});

router.get('/newreport', function (req, res, nex) {
  //render create new report page
  res.render('newreport');
});

//- Upload files and save them on the server file system
router.post('/fileupload', function (req, res) {
  //- Use a module called formidable to upload file to server
  const formidable = require('formidable');

  //- Parse a file upload
  let form = new formidable.IncomingForm();
  form.encoding = "utf-8";
  form.uploadDir = "./uploads";
  form.keepExtensions = true;
  form.maxFieldsSize = 10 * 1024 * 1024; // Max fields size = 10MB
  form.multiples = true;

  form.parse(req, function (err, fields, files) {
    if (err) {
      res.json({
        result: "failed",
        data: {},
        message: `Cannot upload files. Error is ${err}`
      });
    }
    console.log(files);
    if (files.filetoupload.length > 0) {
      let fileNames = [];
      files.filetoupload.forEach((file) => {
        fileNames.push(file.name);

        let oldpath = file.path;
        let newpath = './uploads/' + file.name;
        fs.rename(oldpath, newpath, function (err) {
          if (err) throw err;
        });
      });
      res.json({
        result: "ok",
        data: fileNames,
        numberOfFiles: fileNames.length,
        message: "Files uploaded successfully"
      });
    } else {
      res.json({
        result: "failed",
        data: {},
        numberOfFiles: 0,
        message: "No files uploaded"
      });
    }
  });
});

router.get('/tool', function (req, res, nex) {
  //render common support tool page
  res.render('tool');
});

router.get('/support', function (req, res, nex) {
  // render support page
  res.render('support');
})

module.exports = router;
