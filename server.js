var express  = require('express');
var app      = express();
var port     = process.env.PORT || 8078;
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');

var configDB = require('./config/database.js');

// Connect to the database
mongoose.connect(configDB.url); 

require('./config/passport')(passport);

// Set up the Express application
app.use(morgan('dev')); 		// log every request to the console
app.use(cookieParser()); 		// read cookies (needed for auth)
app.use(bodyParser()); 			// get information from html forms
// Set up ejs for templating
app.set('view engine', 'ejs'); 	

// Set up passport
app.use(session({ secret: 'jitsejanisthebestcoder' }));
app.use(passport.initialize());
app.use(passport.session());
// Use connect-flash for flash messages stored in session
app.use(flash()); 

// Static files folder
app.use(express.static(__dirname));

// Set up the routes
require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport
// Start the app
app.listen(port);
console.log('The magic happens on port ' + port);