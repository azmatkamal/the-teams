const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateCreateInput(data) {
  let errors = {};

  data.ar_name = !isEmpty(data.ar_name) ? data.ar_name : "";
  data.link = !isEmpty(data.link) ? data.link : "";
  data.country = !isEmpty(data.country) ? data.country : "";

  if (!Validator.isLength(data.link, { min: 2, max: 30 })) {
    errors.link = "Link must be between 2 and 30 characters";
  }

  if (Validator.isEmpty(data.link)) {
    errors.link = "Link field is required";
  }

  if (Validator.isEmpty(data.country)) {
    errors.country = "Country field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
