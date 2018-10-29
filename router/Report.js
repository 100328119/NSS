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
  let files = req.files;
  console.log(files);
  if(req.isAuthenticated()){
    db.get_connection(qb=>{
      for (let i = 0, len = files.length; i < len; i++) {
        let oldpath = files[i].path;
        let newpath = files[i].destination + files[i].originalname;
        var report = {};
        report.user_id = req.user.user_id;
        report.ReportName =  files[i].originalname;
        var now = new Date();
        report.ReportDate = dateFormat(now, "yyyy-mm-dd");
        report.ReportPath = "uploads/"+files[i].originalname;
        console.log(report);
           qb.insert("Report",report, (err,res)=>{
            if(err) return  response.sendStatus(400);
            console.log(res);
            fs.rename(oldpath, newpath, function (err) {
              if (err) return response.sendStatus(400);
            });
          });
        }
        qb.release();
     });
   response.sendStatus(200);
 }
});

report.put('/update/:id',function(req,response,nex){
  qb.delete('report', {id: req.params.id}, (err, res) => {
      if (err) return console.error(err);
      fs.unlink(req.body.ReportPath, function (err) {
        if (err) throw err;
        // if no error, file has been deleted successfully
        return response.sendStatus(200);
      });
  })
});

report.put('/delete/:id', function(req,response,nex){
  console.log(req.body);
  db.get_connection(qb=>{
    qb.delete('report', {id: req.params.id}, (err, res) => {
        if (err) return console.error(err);
        fs.unlink('public/'+req.body.ReportPath, function (err) {
          if (err){
             console.error(err);
            return response.sendStatus(400);
          }
          qb.select("*").get("report",(err,res)=>{
            qb.release();
            if (err) return console.error(err);
            return response.send(res);
          })
        });
    })
  })
});

module.exports = report;
