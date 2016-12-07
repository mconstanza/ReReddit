
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
    required: true,
    trim: true
  },

  article: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Article"
  },

},
{
  timestamps: true
});

// Export the model
module.exports = mongoose.model("Comment", CommentSchema);
