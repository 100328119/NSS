const express = require('express');
const secure = express.Router();
const db = require('../model/db');
const bcrypt = require('bcrypt');
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
    res.redirect('/login');
})
passport.serializeUser(function(user_id, done) {
  done(null, user_id);
});

passport.deserializeUser(function(user_id, done) {
    done(null, user_id);
});

module.exports = secure;
