const express = require('express');
const report = express.Router();
const network = require('../model/network');
const db = require('../model/db');
const dateFormat = require('dateformat');
const multer = require('multer');
const upload = multer({ dest: './public/uploads/' });
const fs = require('fs');

//report data minipuplate
report.get('/id', function(req, res,nex){
    res.send(req.user.user_id);
});

report.get( "/all", function(req,response,nex){
   db.get_connection(qb=>{
      qb.select("*").get("report",(err,res)=>{
        qb.release();
        if(err) return response.sendStatus(400);
        response.send(res);
      })
   })
})

report.post('/new',upload.array('pdfs'),function(req, response, nex){
  const files = req.files;
  if(req.isAuthenticated()){
      for (let i = 0, len = files.length; i < len; i++) {
        let oldpath = files[i].path;
        let newpath = files[i].destination + files[i].originalname;
        var report = {};
        report.user_id = req.user.user_id;
        report.ReportName =  files[i].originalname;
        var now = new Date();
        report.ReportDate = dateFormat(now, "yyyy-mm-dd");
        console.log(report.ReportDate);
        report.ReportPath = "uploads/"+files[i].originalname;
        db.get_connection(qb=>{
          qb.insert("Report",report, (err,res)=>{
            qb.release();
            if(err) return  response.sendStatus(400);
            console.log('Report insert ok');
            fs.rename(oldpath, newpath, function (err) {
              if (err) return response.sendStatus(400);
            });
          });
        });
   }
   response.sendStatus(200);
 }
});

report.put('/update/:id',function(req,res,nex){

});

report.delete('/delete/:id', function(req,res,nex){

});

module.exports = report;
