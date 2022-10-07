const passport = require('passport');
const Employee = require('../models/employee');


module.exports.signUp = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/');
    }
    return res.render('employee_sign_up',{
        title:"Sign Up Page"
//     });<h1> In the home of Placement cell </h1>');
// }
    });
}

module.exports.signIn = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/');
    }

    return res.render('employee_sign_in',{
        title:"Sign in Page"
//     });<h1> In the home of Placement cell </h1>');
// }
    });
}

// get the signup data

module.exports.create= function(req,res){
    
    // console.log(req);
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    Employee.findOne({email: req.body.email}, function(err,user){
        if(err){console.log('error in finding user in signing up'); return}

        if(!user){
            Employee.create(req.body, function(err,user){
                if(err){console.log('error in creating user while signing up'); return}

                // console.log("user created");
                return res.redirect('/employee/sign-in');

            })
        }else {
            // console.log("User already exists");
            return res.redirect('back');
        }
    });

}

module.exports.createSession = function(req,res){
    // console.log("hello");
    return res.redirect('/');
}

module.exports.destroySession = function(req,res){
    
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
    
  
     })
}


// module.exports.students = function(req,res){
//     if(req.isAuthenticated()){
//     return res.render('student_details',{
//         title:"Student list Page"
//     });
//     }


// }
