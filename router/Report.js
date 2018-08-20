const express = require('express');
const report = express.Router();
const network = require('../model/network');
const db = require('../model/db');

//report data minipuplate
report.get('/reportdata/:id', function(req, res,nex){

});

report.post('/reportdata/new', function(req,res,nex){

});

report.put('/reportdata/update/:id',function(req,res,nex){

});

report.delete('/reportdata/delete/:id', function(req,res,nex){

});

module.exports = report;
