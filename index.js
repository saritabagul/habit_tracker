const express = require('express');
const app = express();
const port = 8000;
const expressLayout = require('express-ejs-layouts');

//setting up ejs view engine 
app.set('view engine','ejs')
app.set('views','./views');

//use
app.use(expressLayout);
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);
app.use('/',require('./routes/index'));

//setup static file path
app.use(express.static('./assets')); 

app.listen(port,function(err){
    if(err){
        console.log(`Error: ${err}`);
    }

    console.log(`Server is running on port : ${port}`);
});



