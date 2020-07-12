
module.exports = function (req, res, next) {
    // 401 Unauthorized when user provides an invalid token
    // 403 Forbidden When user provides a valid token but is not able to access to the resource

    if(req.user.role != 'admin') return res.status(403).send('Access denied!');

    next();
}