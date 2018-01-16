const UserModel = require('../user/model')
const bcrypt = require('bcryptjs')
const jwt = require('jwt-simple')
const cfg = require('../../config/auth')

exports.login = (req, res) => {
  // Checks if the body contains an email and a password.
  if (req.body.email && req.body.password) {
    let email = req.body.email
    let password = req.body.password

    // Find user by email.
    UserModel.findOne({ 'email': email })
      .then(result => {
        // Compares hashes.
        bcrypt.compare(result.password, bcrypt.hashSync(password))
          .then(() => {
            res.status(200)
            res.json({
              token: jwt.encode({ id: result.id }, cfg.jwtSecret)
            })
          })
          .catch((err) => res.status(401).send('Error: ' + err))
      })
      .catch((err) => res.status(400).send('Error: ' + err))
  } else {
    res.status(400)
  }
}
