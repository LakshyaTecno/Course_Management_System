const validateUserRequestBodies  = require("./validateUserRequestBodies");
const authJwt = require("./authJwt");
const validateIdInParams = require("./paramsVerifier");
const validateCourseRequestBodies = require("./validateCourseRequestBodies");

module.exports = {
    validateUserRequestBodies,
    authJwt,
    validateIdInParams,
    validateCourseRequestBodies
  };