var express = require("express");
var router = express.Router();


var blog= require("../models/blog.js");
var user = require("../models/user.js");
var comment = require("../models/comment.js");

// setup REST routes
router.get("/",function(req,res){
    res.render("auth");
});

router.get("/blogs",function(req,res){
    blog.find({},function(err,blogs){
        if(err){
            console.log("Error");
        } else {
            res.render("index" , {blogs : blogs,currentuser: req.user})
        }
    });
   
});

// New Route

router.get("/blogs/new",function(req,res){
    res.render("new");
});

// Post route
router.post("/blogs",function(req,res){
    blog.create(req.body.blog,function(err,newblog){
        if(err){
            res.render("new");
        } else{
            res.redirect("/blogs");
        }
    });
});

// Get by ID
router.get("/blogs/:id",function(req,res){
    blog.findById(req.params.id).populate("comments").exec(function(err,found){
        if(err){
            res.redirect("/blogs");
        }
        else{
            res.render("showid",{blog:found});
        }
    });
});

//Edit items
router.get("/blogs/:id/edit",function(req,res){
    if (req.isAuthenticated()){
        blog.findById(req.params.id,function(err,found){
            if(err){
                res.redirect("/blogs");
            }
            else{
                
              //  console.log(found.user._id);
               // if(found.author.id.equals(req.user._id)){
                res.render("edit",{blog:found});

            //    }
            //    else{
              //          res.send("Invalid Permissions");
               // }
                
            }
        });

    }
    else{
        res.redirect("/signin");
    }
    
    
});

//Update items

router.put("/blogs/:id",function(req,res){
        blog.findByIdAndUpdate(req.params.id,req.body.blog,function(err,updated){
            if(err){
                res.redirect("/blogs");
            }else {
                res.redirect("/blogs/"+req.params.id);
            }

        });

});

//Delete items
router.delete("/blogs/:id",function(req,res){
    blog.findByIdAndRemove(req.params.id,function(err){
        if(err){
            res.redirect("/blogs");
        }else{
            res.redirect("/blogs");
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
