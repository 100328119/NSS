//import infrastructure package
const express = require('express');
const router = express.Router();
const db = require('../model/db');

//page redirection
router.get('/', function (req, response, next) {
      response.render('dashboard');
});

router.get('/dashboard', function (req, response, next) {
      response.render('dashboard');
});

router.get('/login', function (req, res, nex) {
  res.render('login', { layout: false });
});

router.get('/resetpass', function(req, res, nex){
  res.render('resetpass',{ layout: false });
})

// router.get('/register', function (req, res, nex) {
//   res.render('register', { layout: false });
// });

router.get('/management', function(req, res, nex){
  if(req.isAuthenticated()){
    res.render('management');
    }else{
      res.redirect('/dashboard');
    }

})

router.get('/network/:id', function (req, res, nex) {
  //render newtork network info page
  res.render('network');
});

router.get('/network/Create/New', function (req, res, nex) {
  //render create new newtork page
  if(req.isAuthenticated()){
    res.render('newNetwork');
  }else{
    res.redirect('/dashboard');
  }
});

router.get('/report/:id', function (req, response, next) {
  //render Operation report page
  db.get_connection(qb=>{
    qb.select("ReportPath").where({id:req.params.id}).get('report',(err,res)=>{
       if(err) return response.sendStatus(400);
      response.render('ReportView',{path:res[0].ReportPath});
    })
  })
});

router.get('/ReportTable', function(req, response, nex){
  response.render('ReportTable');
})

router.get('/newreport', function (req, res, nex) {
  //render create new report page
  if(req.isAuthenticated()){
    res.render('newreport');
  }else{
    res.redirect('/dashboard');
  }
});

router.get('/ReportView', function(req, response, nex){
  response.render('ReportView');
});

router.get('/tool', function (req, res, nex) {
  //render common support tool page
  res.render('tool');
});

router.get('/support', function (req, res, nex) {
  // render support page
  res.render('support');
});

router.get('/diagram/:id', function(req, res, nex) {
  res.render('Diagram');
})


module.exports = router;
