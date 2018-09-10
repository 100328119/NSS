const express = require('express');
const Tool = express.Router();
const network = require('../model/network');
const db = require('../model/db');
//tool data minipuplate
Tool.get('/all', function(req, response,nex){
  db.get_connection(qb=>{
    qb.select('*').get('tool', (err, res)=>{
      qb.release();
      if(err){
        console.error(err);
        return response.sendStatus(400);
      }
      return response.send(res);
    })
  })
});

Tool.post('/new', function(req,response,nex){
  db.get_connection(qb=>{
    qb.insert('tool',req.body, (err, res)=>{
      if(err){
        console.error(err);
        return response.sendStatus(400);
      }
        qb.select('*').get('tool', (err, res)=>{
          qb.release();
          if(err){
            console.error(err);
            return response.sendStatus(400);
          }
          return response.send(res);
        })
    })
  })
});

Tool.put('/update/:id',function(req,response,nex){
  db.get_connection(qb=>{
    qb.update('tool', req.body,{id:req.params.id}, (err, res)=>{
      if(err){
        console.error(err);
        return response.sendStatus(400);
      }
      qb.select('*').get('tool', (err, res)=>{
        qb.release();
        if(err){
          console.error(err);
          return response.sendStatus(400);
        }
        return response.send(res);
      })
    })
  })
});

Tool.delete('/delete/:id', function(req,response,nex){
  db.get_connection(qb=>{
    qb.delete('tool', {id: req.params.id}, (err, res) => {
      if(err){
        console.error(err);
        return response.sendStatus(400);
      }
      qb.select('*').get('tool', (err, res)=>{
        qb.release();
        if(err){
          console.error(err);
          return response.sendStatus(400);
        }
        return response.send(res);
      })
    })
  })
});

module.exports = Tool;
