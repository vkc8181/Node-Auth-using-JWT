const jwt = require('jsonwebtoken');

function reqAuth(req, res, next) {
    const token = req.cookies.jwt;

    if(token) {
        jwt.verify(token, process.env.JWT_SIGN_KEY, (err, decodedToken)=> {
            if(err) {
                res.redirect('/login');
            }
            else{
                console.log(decodedToken);
                next();
            }
        });
    }else{
        res.redirect('/login');
    }
}

module.exports = {
    reqAuth
}
