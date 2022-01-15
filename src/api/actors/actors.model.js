const mongoose = require("mongoose");

const actorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    birth_date: { type: String },
    role: { type: String, trim: true },
    img: { type: String, trim: true },
  },
  {
    timestamps: true
  }
);

const Actor = mongoose.model("actors", actorSchema);
module.exports = Actor;
