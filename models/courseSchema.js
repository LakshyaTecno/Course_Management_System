const mongoose = require("mongoose");
const constants = require("../utils/constants");
const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  courseId: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  vedioUrls: {
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
  courseStatus: {
    type: String,
    required: true,
    default: constants.userStatus.approved,
    enum: [
      constants.courseStatus.approved,
      constants.courseStatus.pending,
      constants.courseStatus.rejected,
    ],
  },
});

module.exports = mongoose.model("course", courseSchema);
