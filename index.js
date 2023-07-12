const express = require('express');
const app = express();
const port = 8000;
const expressLayout = require('express-ejs-layouts');
const db = require('./config/mongoose');

const session = require('express-session');
const cookieParser = require('cookie-parser');

//flash messages
const flash = require('connect-flash');
const customMware = require('./config/middleware');


//setting up ejs view engine 
app.set('view engine','ejs')
app.set('views','./views');

//use
app.use(express.urlencoded());
app.use(cookieParser());
app.use(expressLayout);
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);
app.use('/',require('./routes/index'));


//setup static file path
app.use(express.static('./assets')); 


app.use(flash());
app.use(customMware.setFlash);


app.listen(port,function(err){
    if(err){
        console.log(`Error: ${err}`);
    }

    console.log(`Server is running on port : ${port}`);
});



