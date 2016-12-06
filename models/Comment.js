
var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var CommentSchema = new Schema({

  author: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },

  text: {
    type: String,
    required: true
  },

  article: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Article"
  }
});

var Comment = mongoose.model("Comment", CommentSchema);

// Export the model
module.exports = Comment;
