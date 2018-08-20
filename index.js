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
  saveUninitialized: false,
  // cookie: { secure: true }
}));

app.use(passport.initialize());
app.use(passport.session());
//get post body
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
//page redirection
app.use(function(req,res,nex){
   res.locals.isAuthenticated = req.isAuthenticated();
   nex();
})

//restful api
app.use('/', require('./router/route'));
app.use('/api/Netdata', require('./router/Netdata'));
app.use('/api/reportdata',require('./router/Report'));
app.use('/api/tooldata',require('./router/Tool'));
app.use('/secure', require('./router/secure'));

passport.use('local', new LocalStrategy({
   usernameField: 'email',
   passwordField: 'password',
   session: false
 },
function(username, password, done) {
     const db = require('./model/db');
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

//Set app listening port
app.set('port', process.env.PORT || 4000);
app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' +
    app.get('port') + '; press Ctrl-C to terminate');
})
