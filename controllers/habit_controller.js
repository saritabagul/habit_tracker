const Habit = require('../models/habit'); 

module.exports.home = async function(req,res){
    try{
        const habit = await Habit.find({}).sort('-createdAt');
        return res.render('habit',{
            title:"Habit",
            habit:habit
        });
        
    }catch(err){
        console.log('No record found',err);
        return;
    }
}

module.exports.create = async function(req, res){
    try{
        let habit = await Habit.create({
            habit: req.body.habit,
            description: req.body.description        
        });

        
        
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