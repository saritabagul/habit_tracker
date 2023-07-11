module.exports.home = function(req,res){
    return res.render('habit',{
        title:"Home"
    });
}