const ActorRoutes = require('express').Router()
const { isAuth } = require('../../middlewares/auth')
const upload = require('../../middlewares/file')
const { postNewActor, getAllActors, getActor, patchActor, deleteActor } = require('./actors.controller')


ActorRoutes.get('/', getAllActors)
ActorRoutes.get('/:id', getActor)

//solo los admins pueden hacer esto
/* ActorRoutes.post('/', upload.single('img'), postNewActor) */
/* ActorRoutes.patch('/:id', [isAuth], upload.single('img'), patchActor) */
/* ActorRoutes.delete('/:id', [isAuth], upload.single('img'), deleteActor) */

module.exports = ActorRoutes