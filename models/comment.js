var mongoose = require("mongoose");

var commentschema = new mongoose.Schema({
    content:String,
    author: String
});

module.exports = mongoose.model("comment",commentschema);
