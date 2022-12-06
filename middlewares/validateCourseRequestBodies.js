const constants = require("../utils/constants");

const allowedCourseStatus = [
  constants.courseStatus.approved,
  constants.courseStatus.pending,
  constants.courseStatus.rejected,
];

const newCourseBody = async (req, res, next) => {
  try {
    if (!req.body.title) {
      return res.status(400).send({
        message: "Failed ! Course title is not provided",
      });
    }

    if (!req.body.courseId) {
      return res.status(400).send({
        message: "Failed ! Course Id is not provided",
      });
    }
    const course = await Course.findOne({ courseId: req.body.courseId });

    if (course) {
      return res.status(400).send({
        message: "Failed! courseId is already taken",
      });
    }
    if (!req.body.description) {
      return res.status(400).send({
        message: "Failed ! Course description is not provided",
      });
    }

    if (!req.body.topics) {
      return res.status(400).send({
        message: "Failed ! Course topics  are not provided",
      });
    } else if (!Array.isArray(req.body.topics)) {
      return res.status(400).send({
        message: "Failed ! Course topics are not in correct format (Array)",
      });
    }

    if (!req.body.duration) {
      return res.status(400).send({
        message: "Failed ! Course duration are not provided",
      });
    }

    next();
  } catch {
    console.log(
      "#### Error while velidating new Course request body ##### ",
      err.message
    );
    res.status(500).send({
      message: "Internal server error while new Course body validation",
    });
  }
};

const editCourseBody = (req, res, next) => {
  try {
    if (req.body.topics && !Array.isArray(req.body.topics)) {
      return res.status(400).send({
        message: "Failed ! Course topics are not in correct format (Array)",
      });
    }

    if (
      req.body.courseStatus &&
      !allowedCourseStatus.includes(req.body.courseStatus)
    ) {
      return res.status(400).send({
        message: "Failed ! Invalid course release status provided",
      });
    }

    next();
  } catch {
    console.log(
      "#### Error while velidating edit course request body ##### ",
      err.message
    );
    res.status(500).send({
      message: "Internal server error while edit course body validation",
    });
  }
};

const validateCourseRequestBodies = {
  newCourseBody,
  editCourseBody,
};

module.exports = validateCourseRequestBodies;
