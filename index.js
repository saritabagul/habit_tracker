const express = require('express');
const app = express();
const port = 8000;
const db = require('./config/mongoose');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const expressLayout = require('express-ejs-layouts');

//flash messages
const flash = require('connect-flash');
const customMware = require('./config/middleware');



//use
app.use(express.urlencoded());
app.use(cookieParser());
app.use(expressLayout);
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

//setup static file path
app.use(express.static('./assets')); 

//setting up ejs view engine 
app.set('view engine','ejs')
app.set('views','./views');


app.use(session({
    name:'habit_tracker',
    secret:'mysecret',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    },
   
}));


app.use(flash());
app.use(customMware.setFlash);


app.use('/',require('./routes/index'));

app.listen(port,function(err){
    if(err){
        console.log(`Error: ${err}`);
    }

    console.log(`Server is running on port : ${port}`);
});



