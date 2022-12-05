const mongoose = require("mongoose");
const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  vedio : {
    type: String,
    required: true,
  },
  topics: {
    type: [String],
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
})


module.exports = mongoose.model("course", courseSchema);