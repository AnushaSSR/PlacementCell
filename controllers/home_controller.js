module.exports.home = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('students/student-details');
    }
  
    return res.render('home_page',{
        title:"Home Page"
//     });<h1> In the home of Placement cell </h1>');
// }
    });
}