var mongoose = require("mongoose");

var blog= require("./models/blog");
var comment= require("./models/comment");

data=[{title: "solid snake",
        image: "https://static.tvtropes.org/pmwiki/pub/images/Solid_2_295.jpg",
    body: "metal gear solid snake phantom pain"},
{
    title: "Sam Fisher",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHys3zUHtG3crOhn9e93gdB1g1K6fS-628jLZ9os6btto4gfRZ&s",
    body: "Awesome Stealth Game best one yet"}
    
]

function seedDB(){
   blog.remove({},function(err){
        if(err){
            console.log(err);
        }
        console.log("removed blogs");
        data.forEach(function(seed){
            blog.create(seed,function(err,blog){
                if(err){
                    console.log(err);
                } else {
                    console.log("added new");

                    comment.create({
                        content: "This is Awesome",
                        author: "Retro"},function(err,com){
                        if(err){
                            console.log(err);
                        } else {
                            console.log(com);
                            console.log("Add this");
                            blog.comments.push(com);
                            blog.save();
                            console.log("New Comment");
                        }
                    });
                }
            });
        });
    });

    
}


module.exports = seedDB;

