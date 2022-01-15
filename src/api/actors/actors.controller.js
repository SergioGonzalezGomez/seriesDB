const Actor = require('./actors.model')
const { setError } = require('../../utils/error/error')
const { deleteFile } = require('../../middlewares/deleteFile')


const postNewActor = async (req, res, next) => {
    try {
        const newActor = new Actor()
        newActor.name = req.body.name
        newActor.birth_date = req.body.birth_date
        newActor.role = req.body.role
        if (req.file) {
            newActor.img = req.file.path
        }
        const actorDB = await newActor.save()
        return res.status(201).json(actorDB)
    } catch (error) {
        return next(setError(500, 'Actor not saved'))
    }
}

const getAllActors = async (req, res, next) => {
    try {
        const actorsDB = await Actor.find()
        res.status(200).json(actorsDB)
    } catch (error) {
        return next(setError(500, 'Actor failed server'))
    }
}

const getActor = async (req, res, next) => {
    try {
        const { id } = req.params
        const actorDB = await Actor.findById(id)
        if (!actorDB) {
            return next(setError(404, 'Actor not found'))
        }
        return res.status(200).json(actorDB)
    } catch (error) {
        return next(setError(500, 'Actor server error'))
    }
}

const patchActor = async (req, res, next) => {
    try {
        const { id } = req.params
        const patchActor = new Actor(req.body)
        patchActor._id = id
        if (req.file) {
            patchActor.img = req.file.path
        }
        const actorDB = await Actor.findByIdAndUpdate(id, patchActor)
        if (!actorDB) {
            return next(setError(404, 'Actor not found'))
        }
        if (actorDB.img) deleteFile(actorDB.img)
        return res.status(200).json({ new: patchActor, old: actorDB })
    } catch (error) {
        return next(setError(500, 'Actor Patch server error'))
    }
}

const deleteActor = async (req, res, next) => {
    try {
        const { id } = req.params
        const actorDB = await Actor.findByIdAndDelete(id)
        if (!actorDB) {
            return next(setError(404, 'Actor not found'))
        }
        if (actorDB.img) deleteFile(actorDB.img)
        return res.status(200).json(actorDB)
    } catch (error) {
        return next(setError(500, 'Actor removed server error'))
    }
}

module.exports = {
    postNewActor,
    getAllActors,
    getActor,
    patchActor,
    deleteActor
}
