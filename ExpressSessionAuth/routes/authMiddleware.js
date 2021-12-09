module.exports.isAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(401).json({
            msg: 'You are not authorized to view this resource'
        });
    }
}

/* This middleware checks if the user is logged IN and also a ADMIN */
/* For this we have create admin property in database boolean YES or NO */
/* DIY if you want to do
    Hint : if (req.isAuthenticated() && req.user.admin) {
        next();
    }else{ .... }
*/
module.exports.isAdmin = (req, res, next) => {

}