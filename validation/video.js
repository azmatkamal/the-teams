const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateCreateInput(data) {
  let errors = {};

  data.ar_name = !isEmpty(data.ar_name) ? data.ar_name : "";
  data.en_name = !isEmpty(data.en_name) ? data.en_name : "";
  data.en_sologan = !isEmpty(data.en_sologan) ? data.en_sologan : "";
  data.ar_sologan = !isEmpty(data.ar_sologan) ? data.ar_sologan : "";

  if (!Validator.isLength(data.ar_name, { min: 2, max: 30 })) {
    errors.ar_name = "Arabic Name must be between 2 and 30 characters";
  }

  if (!Validator.isLength(data.en_name, { min: 2, max: 30 })) {
    errors.en_name = "English Name must be between 2 and 30 characters";
  }

  if (Validator.isEmpty(data.ar_name)) {
    errors.ar_name = "Arabic Name field is required";
  }

  if (Validator.isEmpty(data.en_name)) {
    errors.en_name = "English Name field is required";
  }

  if (Validator.isEmpty(data.ar_sologan)) {
    errors.ar_sologan = "Arabic Sologan field is required";
  }

  if (Validator.isEmpty(data.en_sologan)) {
    errors.en_sologan = "English Sologan field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};