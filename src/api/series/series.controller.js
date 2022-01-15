const Serie = require("./series.model");
const { setError } = require("../../utils/error/error");
const { deleteFile } = require("../../middlewares/deleteFile");

const postNewSerie = async (req, res, next) => {
  try {
    const newSerie = new Serie();
    newSerie.name = req.body.name;
    newSerie.yearsonstream = req.body.yearsonstream;
    newSerie.on_air = req.body.on_air;
    newSerie.cast = req.body.cast;
    if (req.file) {
      newSerie.img = req.file.path;
    }
    const serieDB = await newSerie.save();
    return res.status(201).json(serieDB);
  } catch (error) {
    return next(setError(500, "Serie not saved"));
  }
};

const getAllSeries = async (req, res, next) => {
  try {
    const seriesDB = await Serie.find().populate('cast')
    res.status(200).json(seriesDB);
  } catch (error) {
    return next(setError(500, "Serie failed server"));
  }
};

const getSerie = async (req, res, next) => {
  try {
    const { id } = req.params;
    const serieDB = await Serie.findById(id).populate('cast')
    if (!serieDB) {
      return next(setError(404, "Serie not found"));
    }
    return res.status(200).json(serieDB);
  } catch (error) {
    return next(setError(500, "Serie server error"));
  }
};

const patchSerie = async (req, res, next) => {
  try {
    const { id } = req.params;
    const patchSerie = new Serie(req.body);
    patchSerie._id = id;
    if (req.file) {
      patchSerie.img = req.file.path;
    }
    const serieDB = await Serie.findByIdAndUpdate(id, patchSerie);
    if (!serieDB) {
      return next(setError(404, "Serie not found"));
    }
    if (serieDB.img) deleteFile(serieDB.img);
    return res.status(200).json({ new: patchSerie, old: serieDB });
  } catch (error) {
    return next(setError(500, "Serie Patch server error"));
  }
};

const deleteSerie = async (req, res, next) => {
  try {
    const { id } = req.params;
    const serieDB = await Serie.findByIdAndDelete(id);
    if (!serieDB) {
      return next(setError(404, "Serie not found"));
    }
    if (serieDB.img) deleteFile(serieDB.img);
    return res.status(200).json(serieDB);
  } catch (error) {
    return next(setError(500, "Serie removed server error"));
  }
};

module.exports = {
  postNewSerie,
  getAllSeries,
  getSerie,
  patchSerie,
  deleteSerie,
};
