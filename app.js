const express = require('express');
const app = express();
var session = require('express-session');
app.use(session({ secret: 'secret-key', resave: true, saveUninitialized: true }));

module.exports = function(dbs, hb){

    app.engine("hbs", hb);
    app.set("view engine","hbs");

    const bodyparser = require('body-parser');

    const loginRoutes = require('./api/routes/login')(dbs,app);
    const homeRoutes = require('./api/routes/home')(dbs);

    app.use(express.static(__dirname + '/views/public'));
    
    
    // get input from body
    app.use(bodyparser.urlencoded({extended:false}));
    app.use(bodyparser.json());
    
    // Routes which should handel request
    app.use('/login', loginRoutes);
    app.use('/home', homeRoutes);
    //Home route
    app.get('/', (req, res) => {
        res.render('index');
    });
    app.get('/log_view', (req, res) => {
        res.render('login');
    });

    app.get('/fblogin', (req, res, next) => {
        res.render('fb-login');
    });

    app.get('/err', (req, res) => {
        res.render('error', {message:"invalid Auth"});
    });

    app.get('/*', (req, res) => {
        res.render('error');
    });

    return app;
}