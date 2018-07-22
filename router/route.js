//import infrastructure package
const express = require('express');
const router = express.Router();

//page redirection
router.get('/dashboard', function(req,res,next){
  // render dashborad page
  res.render('dashboard');
});

router.get('/store/:type/:id',function(req,res,nex){
  //render store network info page
    res.render('store');
    res.send()
});

router.get('/store/new',function(req,res,nex){
  //render create new store page
    res.render('newstore');
});

router.get('/report/:id',function(req,res,next){
  //render Operation report page
    res.render('report');
});

router.get('/report/new',function(req,res,nex){
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

//Restful api
// store data minipuplate
router.get('/storedata/all',function(req,res,nex){
  //get all store information
  let stores = [
    {
      'type':'BCLS',
      'S_ID':'001'
    },
    {
      'type':'BCLS',
      'S_ID':'002'
    },
    {
      'type':'BCCS',
      'S_ID':'001'
    },
    {
      'type':'BCCS',
      'S_ID':'002'
    }
];
 let storeObj = JSON.stringify(stores)
 let storeJSON = JSON.parse(storeObj);
 res.send(storeJSON);
});
router.get('/storedata/:storetype/:id', function(req,res,nex){
  //get specific store data
});

router.post('/storedata/new', function(req,res,nex){
  // add data
});

router.put('/storedata/update/:id',function(req,res,nex){
  //update
});

router.delete('/storedata/delete/:id', function(req,res,nex){
  //remove
});

//report data minipuplate
router.get('/reportdata/:id', function(req, res,nex){

});

router.post('/reportdata/new', function(req,res,nex){

});

router.put('/reportdata/update/:id',function(req,res,nex){

});

router.delete('/reportdata/delete/:id', function(req,res,nex){

});

//tool data minipuplate
router.get('/tooldata/:id', function(req, res,nex){

});

router.post('/tooldata/new', function(req,res,nex){

});

router.put('/tooldata/update/:id',function(req,res,nex){

});

router.delete('/tooldata/delete/:id', function(req,res,nex){

});

module.exports = router;
