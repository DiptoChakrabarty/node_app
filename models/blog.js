var mongoose = require("mongoose");
var comment = require("./comment");

var blogschema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date,default: Date.now },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "comment"
        }
    ]
});

module.exports = mongoose.model("blog",blogschema);
