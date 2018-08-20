const express = require('express');
const Tool = express.Router();
const network = require('../model/network');
const db = require('../model/db');
//tool data minipuplate
Tool.get('/tooldata/:id', function(req, res,nex){

});

Tool.post('/tooldata/new', function(req,res,nex){

});

Tool.put('/tooldata/update/:id',function(req,res,nex){

});

Tool.delete('/tooldata/delete/:id', function(req,res,nex){

});
module.exports = Tool;
