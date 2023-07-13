const mongoose = require('mongoose');

const habitSchema = new mongoose.Schema({
    habit:{
        type:String,
        required: true
    },
    description:{
        type:String,
        // required:true
    },
    streak:{
        type:Number,
        default:0
    },
    favourite:{
        type:Number,
        default:0
    },
    dates:[{
        date: String,
        complete: String
    }],
    

},
{ timestamps: true });

const Habit = mongoose.model('Habit',habitSchema);
module.exports = Habit;