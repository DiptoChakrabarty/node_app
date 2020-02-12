var express = require("express");
var router = express.Router();

// Registrations Routes *********************//



// signup user
router.get("/signup",function(req,res){
    res.render("signup");
});


app.post("/signup",function(req,res){
var name = req.body.username;
var pass =  req.body.password;
user.register(new user({username: name}),pass,function(err,user){
    if(err){
        console.log(err);
        res.render("signup");
    }
   passport.authenticate("local")(req,res,function(){                               //local is local strategy
            res.redirect("/blogs")
   });
});
});


// signin user
router.get("/signin",function(req,res){
res.render("signin");
});

router.post("/signin",passport.authenticate("local",{
successRedirect: "/blogs",
failureRedirect: "/signin"

}),function(req,res){
});


//logout user
router.get("/logout",function(req,res){
req.logout();
res.redirect("/");
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

module.exports(router)