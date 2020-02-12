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