//import infrastructure package
const express = require('express');
const router = express.Router();

//page redirection
router.get('/dashboard', function(req,res,next){
  // render dashborad page
  res.render('dashboard');
});

router.get('/login',function(req,res,nex){
  res.render('login', {layout: false});
});

router.get('/register',function(req,res,nex){
  res.render('register', {layout: false});
});

router.get('/newtork/:type/:id',function(req,res,nex){
  //render newtork network info page
    res.render('network');
});

router.get('/network/new',function(req,res,nex){
  //render create new newtork page
    res.render('newNetwork');
});

router.get('/report/:id',function(req,res,next){
  //render Operation report page
    res.render('report');
});

router.get('/newreport',function(req,res,nex){
  //render create new report page
    res.render('newreport');
});

router.get('/tool',function(req,res,nex){
  //render common support tool page
    res.render('tool');
});

router.get('/support', function(req,res,nex){
  // render support page
  res.render('support');
})

module.exports = router;
