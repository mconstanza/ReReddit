
var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var CommentSchema = new Schema({

  author: {
    type: Schema.Types.ObjectId,
    required: false,
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
    
// Export the model
module.exports = mongoose.model("Comment", CommentSchema);
