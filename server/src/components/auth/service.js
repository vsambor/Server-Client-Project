const UserModel = require('../user/model')
const bcrypt = require('bcryptjs')
const jwt = require('jwt-simple')
const cfg = require('../../../config/auth')

exports.login = (req, res) => {
  // Checks if the body contains an email and a password.
  if (req.body.email && req.body.password) {
    let email = req.body.email
    let password = req.body.password

    // Find user by email.
    UserModel.findOne({ 'email': email })
      .then(result => {
        // If passwords match then responds with the token.
        if (bcrypt.compareSync(password, result.password)) {
          // Removes sensitive data from user object, before sending it to the client.
          result.password = null

          res.status(200)
          res.json({
            token: jwt.encode({ id: result.id }, cfg.jwtSecret),
            user: result
          })
        } else {
          res.status(401).send('Error: please provide a good email and password.')
        }
      })
      .catch((err) => res.status(400).send('Error: ' + err))
  } else {
    res.status(400)
  }
}

exports.logout = (req, res) => {
  console.log('logout!')
  res.status(200).end()
}
