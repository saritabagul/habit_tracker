const Habit = require('../models/habit'); 

//get all the habits
module.exports.home = async function(req,res){
    try{
        const habit = await Habit.find({}).sort('-createdAt');              
        return res.render('habit',{
            title:"Habit",
            habit:habit,
        });
        
    }catch(err){
        console.log('No record found',err);
        return;
    }
}


//create and save the habits in db
module.exports.create = async function(req, res){
    try{
        let habit = await Habit.create(req.body);
         
        if (req.xhr){            
            return res.status(200).json({
                data: {
                    habit: habit
                },
                message: "Habit created!"
            });
        }        
        return res.redirect('back');

    }catch(err){       
        return res.redirect('back');
    }
  
}


//delete or destroy habits from db
module.exports.destroy = async function(req,res){
    try{
        const habit = await Habit.findById(req.params.id);      
        
        await habit.deleteOne({habit:req.params.id});  
            if(req.xhr){
                return res.status(200).json({
                    data:{
                        habit_id:req.params.id
                    },
                    message:"Habit deleted!"
                });
            }
            return res.redirect('back');
       
    }catch(err){       
        return res.redirect('back');
       
    }
}



// Get Habits From Database for details
module.exports.details = async function(req,res){
    try{

        await Habit.find().select('-updatedAt -__v').sort({ _id: -1 })
        .then(habits => {
            var days = [];
            days.push(getD(0));
            days.push(getD(1));
            days.push(getD(2));
            days.push(getD(3));
            days.push(getD(4));
            days.push(getD(5));
            days.push(getD(6));
            res.render('details', { habit: habits, days });
        });
    }catch(err){
        console.log('Error to get habit details', err);
        return redirect('back');
    }
      
}


    // Find the Date and Return the string Date
    function getD(n) {
        let d = new Date();
        d.setDate(d.getDate() - n);
        var newDate = d.toLocaleDateString('pt-br').split('/').reverse().join('-');
        var day;
        switch (d.getDay()) {
            case 0: day = 'Sun';
                break;
            case 1: day = 'Mon';
                break;
            case 2: day = 'Tue';
                break;
            case 3: day = 'Wed';
                break;
            case 4: day = 'Thu';
                break;
            case 5: day = 'Fri';
                break;
            case 6: day = 'Sat';
                break;
        }
        return { date: newDate, day };
    }
   
    // Habit Status Update per Days
    module.exports.habitStatus = async function(req,res){ 
        try{
            var d = req.query.date;
            var id = req.query.id;
            const habit =  await Habit.findById(id);
            if(habit){
                let dates = habit.dates;
                let found = false;
                let streak = habit.streak;
                
                dates.find(function (item, index) {
                    if (item.date === d) {
                        if (item.complete === 'yes') {
                            item.complete = 'no';  
                            streak--;                                                   
                        }
                        else if (item.complete === 'no') {
                            item.complete = 'none';                           
                                                    
                        }
                        else if (item.complete === 'none') {
                            item.complete = 'yes'; 
                            streak++;                           
                        }
                        found = true;
                    }
                })
                if (!found) {
                    dates.push({ date: d, complete: 'yes' });
                    streak++;
                }
               
                if(streak < 0){
                    streak=0;
                }             
                habit.streak = streak;
                habit.dates = dates;
                habit.save();
                req.flash('success','Status updated successfully!');
                return res.redirect('back');
            }else{
                return res.redirect('back');
            }
        }catch(err){
            console.log("Habit status not updated", err);
            res.status(500).send("Error updating habit status");
        }   
        // var d = req.query.date;
        // var id = req.query.id;
        // Habit.findById(id)
        //     .then(habit => {
        //         let dates = habit.dates;
        //         let found = false;
        //         let streak = habit.streak;
        //         dates.find(function (item, index) {
        //             if (item.date === d) {
        //                 if (item.complete === 'yes') {
        //                     item.complete = 'no';
        //                     streak--;
        //                 }
        //                 else if (item.complete === 'no') {
        //                     item.complete = 'none';
        //                     streak--;
        //                 }
        //                 else if (item.complete === 'none') {
        //                     item.complete = 'yes';
        //                     streak++;
        //                 }
        //                 found = true;
        //             }
        //         })
        //         if (!found) {
        //             dates.push({ date: d, complete: 'yes' })
        //         }
        //         habit.dates = dates;
        //         return habit.save();
        //     })
        //     .then(updatedHabit => {
        //         // console.log(updatedHabit);
        //         res.redirect('back');
        //     })
        //     .catch(err => {
        //         console.log("Habit status not updated", err);
        //         res.status(500).send("Error updating habit status");
        //     });
    }
    
    
    