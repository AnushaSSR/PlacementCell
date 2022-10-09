//controller to render the home page
module.exports.home = function(req,res){
    return res.render('home_page',{
        title:"Placement cell | Home Page"
    });
}