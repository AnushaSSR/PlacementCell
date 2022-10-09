const passport = require('passport');
const Employee = require('../models/employee');

//controller to render sign up form
module.exports.signUp = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/');
    }
    return res.render('employee_sign_up',{
        title:"Placement Cell | Employee Sign-up Page"
    });
}

//controller to render sign ip form
module.exports.signIn = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/');
    }
   return res.render('employee_sign_in',{
        title:"Placement Cell | Employee Sign-in Page"
    });
}

//controller to get the signup data and create the user
module.exports.create= function(req,res){
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }
    Employee.findOne({email: req.body.email}, function(err,user){
        if(err){console.log('error in finding user in signing up'); return}

        if(!user) {
            Employee.create(req.body, function(err,user){
                if(err){console.log('error in creating user while signing up'); return}
            return res.redirect('/employee/sign-in');
            });
        } else {
            // req.flash('success', 'You have signed up, login to continue!');
            return res.redirect('back');
        }
    });
}

//controller to create a session for the signing in user
module.exports.createSession = function(req,res){
    return res.redirect('/');
}

//controller to destroy session upon clicking on sign out
module.exports.destroySession = function(req,res){   
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
     });
}

