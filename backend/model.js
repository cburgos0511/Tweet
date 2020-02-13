const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const wissSchema = new Schema(
  {
    name: { type: String, required: true },
    content: { type: String, required: true }
  },
  {
    timestamps: true
  }
);

const Wiss = mongoose.model("Wiss", wissSchema);

module.exports = Wiss;
