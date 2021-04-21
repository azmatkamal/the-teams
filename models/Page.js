const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const timestamp = require("mongoose-timestamp");

// Create Schema
const CitySchema = new Schema({
  terms: {
    type: String,
  },
  privacy: {
    type: String,
  },
});
CitySchema.plugin(timestamp);

module.exports = User = mongoose.model("page", CitySchema);
