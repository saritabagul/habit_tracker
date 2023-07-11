const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/habit_tracker');

const db = mongoose.connection;
db.on('error',console.error.bind(console,"Error connecting in MongoDB"));

db.once('open',function(){
    console.log('connected to Database :: habit_tracker');
});

