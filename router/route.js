//import infrastructure package
const express = require('express');
const router = express.Router();
var multer = require('multer');
var upload = multer({ dest: 'uploads/' });
var fs = require('fs');

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

router.get('/network/:id', function (req, res, nex) {
  //render newtork network info page
  res.render('network');
});

router.get('/network/Create/New', function (req, res, nex) {
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

router.post('/newreport', upload.array('pdfs'), function (req, res, next) {
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

router.get('/tool', function (req, res, nex) {
  //render common support tool page
  res.render('tool');
});

router.get('/support', function (req, res, nex) {
  // render support page
  res.render('support');
})

module.exports = router;
