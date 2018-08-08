//import infrastructure package
const express = require('express');
const bodyParser = require('body-parser');
const handlebars = require('express-handlebars').create({ defaultLayout: 'main' });

const app = express();

//handlebars front end framework
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

//frontend middleware
app.use(express.static(__dirname + '/public'));
//get post body
app.use(bodyParser.json());
//page redirection
app.use('/', require('./router/route'));

//Set app listening port
app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), function () {
  console.log('Express started on http://localhost:' +
    app.get('port') + '; press Ctrl-C to terminate');
})
