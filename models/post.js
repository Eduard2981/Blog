const mongoose = require("mongoose")

const postSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: {type: String, required: true},
  imgUrl: {type: String, required: true},
  description: {type: String, required: true},
  paragraph: {type: String, required: true},
  blogDate: {type: String, required: true}
});

module.exports= mongoose.model('Post', postSchema)