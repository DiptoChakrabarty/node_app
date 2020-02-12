var express = require("express");
var router = express.Router();

var blog= require("../models/blog.js");
var user = require("../models/user.js");
var comment = require("../models/comment.js");

//Comments Route

router.get("/blogs/:id/comments/new",isLoggedIn,function(req,res){
    blog.findById(req.params.id,function(err,data){
        if(err){
            console.log(err);
        } else{
            res.render("comments/new",{blog : data});
      
        }

    });
});

router.post("/blogs/:id/comments",isLoggedIn,function(req,res){

    blog.findById(req.params.id,function(err,data){
        if(err){
            console.log(data);
            res.redirect("/blogs");
            
        }
        else{
            comment.create(req.body.comments,function(err,comm){
                if(err){
                    console.log(err);
                    
                }else{
                    
                    console.log(comm);  //the comment u gave
                    console.log(data);   // all data shown
                   // console.log(blog.comment.find({}));
                    data.comments.push(comm);
                   
                    console.log(data);
                    data.save();
                    res.redirect("/blogs/"+blog._id);
                }

            });
        }
    });
});



//middleware code for checking user logged in or not
function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    else{
        res.redirect("/signin");
    }
    
    }

    

module.exports= router;