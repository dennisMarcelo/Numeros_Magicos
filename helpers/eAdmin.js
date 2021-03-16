module.exports = {
    eAdmin: function(req, res, next) {
        if(req.isAuthenticated() && req.user.admin === 1) {
            return next();
        }
        req.flash('error_msg', 'Você precisa ser Administrador para acessar essa página!')
        res.redirect('/');
    }
}