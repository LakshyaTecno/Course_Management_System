const Course = require("../models/courseSchema");
const constants = require("../utils/constants");

exports.createNewCourse = async (req, res) => {
  try {
    const data = {
      title: req.body.title,
      courseId: req.body.courseId,
      description: req.body.description,
      vedioUrls: req.body.vedioUrls,
      topics: req.body.topics,
      duration: req.body.duration,
      category: req.body.category,
    };
    data.courseStatus = constants.courseStatus.pending;
    const course = await Course.create(data);

    console.log(`#### New Course '${course.title}' created ####`);
    res.status(201).send(course);
  } catch (err) {
    console.log("#### Error while creating new course #### ", err);
    res.status(500).send({
      message: "Internal server error while creating new course",
    });
  }
};

exports.updateCourse = async (req, res) => {
  try {
    const course = req.courseInParams;

    (course.title = req.body.title ? req.body.title : course.name),
      (course.description = req.body.description
        ? req.body.description
        : course.description),
      (course.vedioUrls = req.body.vedioUrls
        ? req.body.vedioUrls
        : course.vedioUrls),
      (course.trailerUrls = req.body.trailerUrls
        ? req.body.trailerUrls
        : course.trailerUrls),
      (course.topics = req.body.topics ? req.body.topics : course.topics),
      (course.duration = req.body.duration
        ? req.body.duration
        : course.duration),
      (course.category = req.body.category
        ? req.body.category
        : course.category);

    if (req.user.role == constants.roles.superAdmin) {
      course.courseStatus =
        req.body.courseStatus != undefined
          ? req.body.courseStatus
          : course.courseStatus;
    }

    const updatedCourse = await course.save();

    console.log(`#### Course '${updatedCourse.title}' data updated ####`);
    res.status(200).send(updatedCourse);
  } catch (err) {
    console.log("#### Error while updating course data #### ", err.message);
    res.status(500).send({
      message: "Internal server error while updating course data",
    });
  }
};

exports.deleteCourse = async (req, res) => {
  try {
    const course = req.courseInParams;
    await course.remove();

    console.log(`#### Course deleted ####`);
    res.status(200).send({ message: "Course deleted" });
  } catch (err) {
    console.log("#### Error while deleting Course #### ", err.message);
    res.status(500).send({
      message: "Internal server error while deleting Course",
    });
  }
};

exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    console.log(courses);

    const approvedCourses = courses.filter((course) => {
      return course.courseStatus == constants.courseStatus.approved;
    });
    if (user.role == constants.roles.employee) {
      res.status(200).send(approvedCourses);
    } else if (user.role != constants.roles.employee) {
      res.status(200).send(courses);
    }
  } catch (err) {
    console.log("#### Error while getting all courses ####", err.message);
    res.status(500).send({
      message: "Internal server error while getting all courses",
    });
  }
};

exports.getSingleCourse = async (req, res) => {
  try {
    const course = req.courseInParams;
    const user = req.userInParams;

    if (
      user.role == constants.roles.employee &&
      course.courseStatus == constants.courseStatus.approved
    ) {
      res.status(200).send(course);
    } else if (user.role != constants.roles.employee) {
      res.status(200).send(course);
    } else {
      res.status(200).send({});
    }
  } catch (err) {
    console.log("#### Error while getting the course ####", err.message);
    res.status(500).send({
      message: "Internal server error while getting the course",
    });
  }
};
