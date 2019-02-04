const mongoose = require('mongoose');

// Define schema
const Schema = mongoose.Schema;

const EventModelSchema = new Schema({
  name: {type: String, required: true},
  date: {type: Date, required: true},
  keyEvent: {type: mongoose.Types.ObjectId},
  type: {type: String, enum: ['KEY_EVENT', 'REGULAR_EVENT'], required: true}
});

// Compile model from schema
module.exports = mongoose.model('Event', EventModelSchema);
