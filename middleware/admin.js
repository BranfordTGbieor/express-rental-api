

module.exports = function (req, res, next) {
    
    if (!req.user.isAdmin) res.status(403).send('Access Denied! You have been forbidden to perform the requested operation.');

    next();
}