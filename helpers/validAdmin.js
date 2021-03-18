module.exports = {
    validAdmin: function(objUser) {
        if (objUser) {
            if (objUser.admin === 1) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }
}
