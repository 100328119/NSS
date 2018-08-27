//import infrastructure package
const express = require('express');
const bodyParser = require('body-parser');
const handlebars = require('express-handlebars').create({defaultLayout:'main'});
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const MySQLStore = require('express-mysql-session')(session);
const app = express();
const options = require('./config/dbconfig.json');
const bcrypt = require('bcrypt');
const db = require('./model/db');
//handlebars front end framework
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

//frontend middleware
app.use(express.static(__dirname + '/public'));
//
let sessionStore = new MySQLStore(options);
app.use(session({
  secret: 'fdsjkherw',
  resave: false,
  store: sessionStore,
  saveUninitialized: true,
  // cookie: { secure: true }
}));

app.use(passport.initialize());
app.use(passport.session());
//get post body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//page redirection
app.use(function(req,response,nex){
   if(req.isAuthenticated()){
     response.locals.isAuthenticated = req.isAuthenticated();
     console.log(req.user.user_id);
     db.get_connection(qb=>{
       qb.select("email").where({id:req.user.user_id}).get('`users',(err,res)=>{
         qb.release();
         if(err) return console.error(err);
         response.locals.useremail = res[0].email;
         console.log(response.locals.useremail);
          nex();
       })
     })
  }else{
    response.locals.isAuthenticated = req.isAuthenticated();
    nex();
  }
});


passport.use('local', new LocalStrategy({
   usernameField: 'email',
   passwordField: 'password',
   session: false
 },
function(username, password, done) {
     db.get_connection(qb=>{
       qb.select("*").where({'email':username}).get('users',(err,res)=>{
         qb.release();
         if(err) {done(err)};
         if(res.length === 0){
            return done(null, false);
         }
           bcrypt.compare(password,res[0].password,(err,response)=>{
              if(response === true){
                return done(null, {user_id:res[0].id});
              }else{
                return done(null,false);
              }
           })
       })
     });
  }
));
//restful api
app.use('/', require('./router/route'));
app.use('/api/reportdata',require('./router/Report'));
app.use('/api/Netdata', require('./router/Netdata'));
app.use('/api/tooldata',require('./router/Tool'));
app.use('/secure', require('./router/secure'));
//Set app listening port
app.set('port', process.env.PORT || 4000);
app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' +
    app.get('port') + '; press Ctrl-C to terminate');
})
