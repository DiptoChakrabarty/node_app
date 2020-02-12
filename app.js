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


app.use(commentsroutes);
app.use(authroute);
app.use(blogroute);


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

app.get("/blogs",function(req,res){
    blog.find({},function(err,blogs){
        if(err){
            console.log("Error");
        } else {
            res.render("index" , {blogs : blogs,currentuser: req.user})
        }
    });
   
});





app.listen(PORT,function(){
    console.log("Server started in port 3000");
});