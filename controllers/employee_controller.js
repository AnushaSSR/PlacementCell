const passport = require('passport');
const Employee = require('../models/employee');

//controller to render sign up form
module.exports.signUp = function(req,res){
    if(req.isAuthenticated()){
        //if user is not authenticated
        return res.redirect('/');
    }
    return res.render('employee_sign_up',{
        title:"Placement Cell | Employee Sign-up Page"
    });
}

//controller to render sign ip form
module.exports.signIn = function(req,res){
    if(req.isAuthenticated()){
    //if user is not authenticated
        return res.redirect('/');
    }
   return res.render('employee_sign_in',{
        title:"Placement Cell | Employee Sign-in Page"
    });
}

//controller to get the signup data and create the user
module.exports.create= function(req,res){
    if(req.body.password != req.body.confirm_password){
        //if the password and confrim passwords didn't match
        return res.redirect('back');
    }
    //fetch the user with the email
    Employee.findOne({email: req.body.email}, function(err,user){
        if(err){console.log('error in finding user in signing up'); return}

        if(!user) {
            // if user doesn't exist create a new record
            Employee.create(req.body, function(err,user){
                if(err){console.log('error in creating user while signing up'); return}
                //flash message indicating success
                req.flash('success', 'Signed up successfully, login to continue!');
            return res.redirect('/employee/sign-in');
            });
        } else {
            //if user already exists
            req.flash('error','User already exists');
            return res.redirect('back');
        }
    });
}

//controller to create a session for the signing in user
module.exports.createSession = function(req,res){
    req.flash('success','Logged in succesfully');
    return res.redirect('/');
}

//controller to destroy session upon clicking on sign out
module.exports.destroySession = function(req,res){   
    req.logout(function(err) {
        if (err) { return next(err); }
        //flash message upon succesfully logging out
        req.flash('success','You have Logged Out');
        res.redirect('/');
     });
}