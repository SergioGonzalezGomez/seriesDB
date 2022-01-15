const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SerieSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    yearsonstream: { type: String, trim: true },
    on_air: { type: Boolean, trim: true },
    cast: [{ type: Schema.Types.ObjectId, ref: "actors", required: true }],
    img: { type: String, trim: true },
  },
  { timestamp: true, collection: "series" }
);

const Serie = mongoose.model("series", SerieSchema);
module.exports = Serie;
