const passport = require('passport')
const passportJWT = require('passport-jwt')
const User = require('../src/components/user/model')
const config = require('../config/auth')

const ExtractJwt = passportJWT.ExtractJwt
const Strategy = passportJWT.Strategy
const params = {
  secretOrKey: config.jwtSecret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}

module.exports = function() {
  passport.use(new Strategy(params, (jwtPayload, done) => {
    User.findOne({ id: jwtPayload.id })
      .then((user) => done(null, user || false))
      .catch(err => done(err, false))
  }))

  return {
    initialize: () => passport.initialize(),
    authenticate: () => passport.authenticate('jwt', config.jwtSession)
  }
}
