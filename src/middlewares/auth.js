const User = require('../api/user/user.model')
const { setError } = require('../utils/error/error')
const { verifyJwt } = require('../utils/jwt/jwtUtils')

const isAuth = async (req, res, next) => {
    try {
        const token = req.headers.authorization
        if (!token) {
            return next(setError(404, 'Unauthorized'))
        }
        const parsedToken = token.replace('Bearer ', '')
        const validToken = verifyJwt(parsedToken, process.env.JWT_SECRET)
        const userLogged = await User.findById(validToken.id)
        userLogged.password = null
        req.user = userLogged
        next()
    } catch (error) {
        return next(error)
    }
}

module.exports = { isAuth }