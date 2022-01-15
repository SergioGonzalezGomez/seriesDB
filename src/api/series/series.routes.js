const SerieRoutes = require('express').Router()
const { isAuth } = require('../../middlewares/auth')
const upload = require('../../middlewares/file')
const { postNewSerie, getAllSeries, getSerie, patchSerie, deleteSerie } = require('./series.controller')


SerieRoutes.get('/', getAllSeries)
SerieRoutes.get('/:id', getSerie)

//solo los admins pueden hacer esto
/* SerieRoutes.post('/', upload.single('img'), postNewSerie)
SerieRoutes.patch('/:id', upload.single('img'), patchSerie)
SerieRoutes.delete('/:id', [isAuth], upload.single('img'), deleteSerie )*/

module.exports = SerieRoutes