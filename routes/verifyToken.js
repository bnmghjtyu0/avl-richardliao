var jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
    const token = req.header('Authorization')
    if (!token) return (
        res.status(401).json({
            retCode: 0,
            retMsg: 'Access Denied'
        })
    )
    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET)
        req.user = verified;
        next()
    } catch (err) {
        res.status(400).json({
            retCode: 0,
            retMsg: 'Invalid Token'
        })
    }
}