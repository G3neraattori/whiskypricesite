const jwt = require('passport-jwt')
const User = require('../models/schemas')
const config = require('../configs/dbconfig')

module.exports = function (passport){
    let opts = {}
    opts.jwtFromRequest = jwt.ExtractJwt.fromAuthHeaderWithScheme("jwt");
    opts.secretOrKey = config.secret
    passport.use(new jwt.Strategy(opts, (jwt_payload, done) => {
        User.func.getUserById(jwt_payload._id, (err, user) => {
            if(err){
                return done(err, false);
            }
            if(user){
                return done(null, user);
            }else{
                return done(null, false);
            }


        })
    }));

}