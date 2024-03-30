const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  complete: {
    type: Boolean,
    default: false,
  },
  timestamp: {
    type: String,
    default: Date.now(),
  },
  priority: {
    type: String,
    enum: ["Low", "Medium", "High"],
    default: "Low", // Default priority if not specified
  },
  category: {
    type: String,
    enum: ["Household", "Office", "Others"],
    default: "Others",
  },
});

const Todo = mongoose.model("Todo", TodoSchema);

module.exports = Todo;