
var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var CommentSchema = new Schema({

  author: {
    type: String,
    required: true
  },

  text: {
    type: String,
    required: true
  },

  article: {
    type: Schema.Types.ObjectId,
    ref: "Article"
  }

});

var Comment = mongoose.model("Comment", CommentSchema);

// Export the model
module.exports = Comment;
