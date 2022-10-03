const Student = require('../models/student');

module.exports.create = function(req, res) {
    Student.create({
        content : req.body.content,
        user: req.user._id
    }, function(err, post){
        if(err){console.log("error in creating post"); return}
        return res.redirect('back');
    });
}


module.exports.display = function(req, res) {
    Student.find({user:user_id},function(err,post){
        if(err) {console.log("error in fetching posts"); return}
        return res.redirect('back');
    });
}

