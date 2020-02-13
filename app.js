var express =  require("express"),
    app = express(),
    body = require("body-parser"),
    passport = require("passport"),
    local= require("passport-local"),
    mongoose = require("mongoose");
const PORT=process.env.PORT || 3000;

mongoose.connect("mongodb://localhost:27017/blog",{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{

    console.log("Database connected.")
}).catch(err=>{
    throw err;
})


var commentsroutes= require("./routes/comments"),
    authroute = require("./routes/auth"),
    blogroute = require("./routes/blogs");

var blog= require("./models/blog.js");
var user = require("./models/user.js");
var comment = require("./models/comment.js");
var seedDB = require("./seeds");

var methodOverride =  require("method-override");


//app.use(commentsroutes);
//app.use(authroutes);
//app.use(blogroute);


// setup app
app.use(body.urlencoded({extended : true}));

app.use(express.static("public"));

app.use(methodOverride("_method"));

app.set("view engine","ejs");

seedDB();


// Passport Configuration

app.use(require("express-session")({
    secret: "I am Awesome",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new local(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());


app.use(function(req,res,next){
    res.locals.currentuser = req.user;
    next();
});

// setup REST routes
app.get("/",function(req,res){
    res.render("auth");
});

app.get("/blogs",isLoggedIn,function(req,res){
    console.log(req.user);
    blog.find({},function(err,blogs){
        if(err){
            console.log("Error");
        } else {
            res.render("index" , {blogs : blogs,currentuser: req.user})
        }
    });
   
});

// New Route

app.get("/blogs/new",function(req,res){
    res.render("new");
});

// Post route
app.post("/blogs",isLoggedIn,function(req,res){
    var author ={
        id: req.user._id,
        username : req.user.username
    }
    var entry = {title: req.body.blog.title,image: req.body.blog.image,body: req.body.blog.body,author:author};
    blog.create(entry ,function(err,newblog){
        if(err){
            res.render("new");
        } else{
            console.log(newblog);
            res.redirect("/blogs");
        }
    });
});

// Get by ID
app.get("/blogs/:id",function(req,res){
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
app.get("/blogs/:id/edit",function(req,res){
    if (req.isAuthenticated()){
        blog.findById(req.params.id,function(err,found){
            if(err){
                res.redirect("/blogs");
            }
            else{
                //console.log(found.author.id);
                //console.log(req.user._id);
                if(found.author.id.equals(req.user._id)){
                    res.render("edit",{blog:found});

                }else{
                    console.log("You do not have authorization");
                    res.redirect("/blogs");
                }
                
              //  console.log(found.user._id);
               // if(found.author.id.equals(req.user._id)){
                
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

app.put("/blogs/:id",function(req,res){
        blog.findByIdAndUpdate(req.params.id,req.body.blog,function(err,updated){
            if(err){
                res.redirect("/blogs");
            }else {
                res.redirect("/blogs/"+req.params.id);
            }

        });

});

//Delete items
app.delete("/blogs/:id",function(req,res){
    blog.findByIdAndRemove(req.params.id,function(err){
        if(err){
            res.redirect("/blogs");
        }else{
            res.redirect("/blogs");
        }
    });
});





//Comments Route

app.get("/blogs/:id/comments/new",isLoggedIn,function(req,res){
    blog.findById(req.params.id,function(err,data){
        if(err){
            console.log(err);
        } else{
            res.render("comments/new",{blog : data});
      
        }

    });
});

app.post("/blogs/:id/comments",isLoggedIn,function(req,res){

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



// signup user
app.get("/signup",function(req,res){
    res.render("signup");
    console.log("User SignUp Page");
});


app.post("/signup",function(req,res){
    var name = req.body.username;
    var pass =  req.body.password;
    console.log(name,pass);
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
app.get("/signin",function(req,res){
res.render("signin");
});

app.post("/signin",passport.authenticate("local",{
    

successRedirect: "/blogs",
failureRedirect: "/signup"


}),function(req,res){
    
});


//logout user
app.get("/logout",function(req,res){
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

    






app.listen(PORT,function(){
    console.log("Server started in port 3000");
});