var mongoose = require("mongoose");
var comment = require("./comment");
var user = require("./user");

var blogschema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date,default: Date.now },
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user"
        },
        username: String

    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "comment"
        }
    ]
});

module.exports = mongoose.model("blog",blogschema);
