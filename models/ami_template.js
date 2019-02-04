const mongoose = require('mongoose');

// Define schema
const Schema = mongoose.Schema;

const TemplateModelSchema = new Schema({
  name: {type: String, required: true},
  followupEvents: {
    type: [{
      name: String,
      interval: Number
    }],
    required: false
  }
});

// Compile model from schema
module.exports = mongoose.model('EventTemplate', TemplateModelSchema);
