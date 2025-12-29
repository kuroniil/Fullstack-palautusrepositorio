const mongoose = require("mongoose");
const today = new Date();
const thisYear = today.getFullYear();

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 4,
  },
  born: {
    type: Number,
    max: thisYear,
  },
});

module.exports = mongoose.model("Author", schema);
