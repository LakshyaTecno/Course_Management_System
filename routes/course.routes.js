const courseController = require("../controllers/course.controller");
const {
  authJwt,
  validateIdInParams,
  validateCourseRequestBodies,
} = require("../middlewares");

module.exports = (app) => {
  app.post(
    "/cms/api/v1/courses",
    [
      authJwt.verifyToken,
      authJwt.isAdminApprovedOrSuperAdmin,
      validateCourseRequestBodies.newCourseBody,
    ],
    courseController.createNewCourse
  );
  app.put(
    "/cms/api/v1/courses/:id",
    [
      authJwt.verifyToken,
      authJwt.isAdminApprovedOrSuperAdmin,
      validateIdInParams.courseInParams,
      validateCourseRequestBodies.editCourseBody,
    ],
    courseController.updateCourse
  );
  app.delete(
    "/cms/api/v1/courses/:id",
    [
      authJwt.verifyToken,
      authJwt.isAdminApprovedOrSuperAdmin,
      validateIdInParams.courseInParams,
    ],
    courseController.deleteCourse
  );
  app.get(
    "/cms/api/v1/courses",
    [authJwt.verifyToken],
    courseController.getAllCourses
  );
  app.get(
    "/cms/api/v1/courses/:id",
    [authJwt.verifyToken, validateIdInParams.courseInParams],
    courseController.getSingleCourse
  );
};
