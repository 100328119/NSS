const express = require('express');
const secure = express.Router();
const db = require('../model/db');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const saltRounds = 10;

secure.post('/register',function(req,response,nex){
    let newUser = {};
    newUser.email = req.body.email;
    newUser.admin_id = req.body.admin_id;
      bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
        newUser.password = hash;
        db.get_connection(qb=>{
          qb.insert('users',newUser,(err,res)=>{
            qb.release();
            if(err) return console.error(err);
            console.log(res);
            return response.sendStatus(200)
          })
        });
     // Store hash in your password DB.
    });
});

secure.post('/login',function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
     if (err) { return next(err); }
     if (!user) { return res.redirect('/login'); }
     req.logIn(user, function(err) {
       if (err) { return next(err); }
       return res.redirect('/dashboard');
     });
   })(req, res, next);
});

secure.get('/logout',function(req,res,next){
    req.logout();
    req.session.destroy();
    res.redirect('/dashboard');
});

secure.get('/users', function(req,response,nex){
  db.get_connection(qb=>{
    qb.select(['u.id','u.email','u.admin_id','u.status','a.type']).from('users u').join('admin a','a.id=u.admin_id','left').get((err,res)=>{
      qb.release();
      if(err){
        console.error(err);
        return response.sendStatus(400);
      }
      return response.send(res);
    })
  })
});

secure.put('/updateuser/:id',function(req,response,nex){
  db.get_connection(qb=>{
    qb.update('users', req.body,{id:req.params.id},(err,res)=>{
      if(err){
        console.error(err);
        return response.sendStatus(400);
      };
      qb.select(['u.id','u.email','u.admin_id','u.status','a.type']).from('users u').join('admin a','a.id=u.admin_id','left').get((err,res)=>{
        qb.release();
        if(err){
          console.error(err);
          return response.sendStatus(400);
        }
        return response.send(res);
      });
    })
  })
});

secure.get('/admin',function(req,response,nex){
  db.get_connection(qb=>{
    qb.select("*").get("admin",(err,res)=>{
      qb.release();
      if(err){
        console.error(err);
        return response.sendStatus(400);
      }
      return response.send(res);
    })
  })
});

secure.put('/updatepass/:id', function(req, response,nex){
  bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
    req.body.password = hash;
      db.get_connection(qb=>{
        qb.update('users', req.body,{id:req.params.id},(err,res)=>{
          if(err){
            console.error(err);
            return response.sendStatus(400);
          };
          return response.send(200);
        })
      })
    });
})

secure.post('/newadmin', function(req, response, nex){
  db.get_connection(qb=>{
    qb.select('*').where({email:req.body.email}).get('users',(err,res)=>{
      if(err){
        console.error(err);
        return response.sendStatus(400);
      };
      if(res.length == 0 || res === undefined ){
        bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
          req.body.password = hash;
              qb.insert('users',req.body,(err,res)=>{
                if(err){
                  console.error(err);
                  return response.sendStatus(400);
                };
                qb.select(['u.id','u.email','u.admin_id','u.status','a.type']).from('users u').join('admin a','a.id=u.admin_id','left').get((err,res)=>{
                  qb.release();
                  if(err){
                    console.error(err);
                    return response.sendStatus(400);
                  }
                  return response.send(res);
                })
            })
          })
      }else{
        return response.sendStatus(400);
      }
    })
  })
});

secure.put('/resetpass', function(req, response, nex){
    if(req.isAuthenticated()){
        db.get_connection(qb=>{
          console.log(req.user.user_id);
          qb.select('password').where({id:req.user.user_id}).get('users', (err,res)=>{
              if(err){
                console.error(err);
                return response.sendStatus(400);
              };
              bcrypt.compare(req.body.oldpass,res[0].password,(err,resp)=>{
                 if(resp === true){
                   bcrypt.hash(req.body.password, saltRounds, function(err, hash){
                     req.body.password = hash;
                     delete req.body.oldpass;
                     qb.update('users',req.body,{id:req.user.user_id},(err,res)=>{
                       qb.release();
                       if(err){
                         console.error(err);
                         return response.sendStatus(400);
                       };
                       req.logout();
                       req.session.destroy();
                       response.sendStatus(200);
                     })
                   })
                 }else{
                   return response.sendStatus(400)
                 }
              })
          })
        })
    }
})

passport.serializeUser(function(user_id, done) {
  done(null, user_id);
});

passport.deserializeUser(function(user_id, done) {
    done(null, user_id);
});

module.exports = secure;
