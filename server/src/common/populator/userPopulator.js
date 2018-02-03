const UserModel = require('../../components/user/model')
const bcrypt = require('bcryptjs')

/**
 * Populates the database user document with an admin.
 */
exports.populateAdmin = () => {
  console.log(`### START: Admin population`)

  let adminUser = new UserModel({
    email: 'admin@scp.com',
    password: bcrypt.hashSync('12345'),
    role: 'ADMIN',
    isActive: true
  })

  adminUser.save(adminUser)
    .then(() => console.log(`### END: Admin population`))
    .catch(err => console.error(err))
}

/**
 * Populates the database user document with a test user.
 */
exports.populateUser = () => {
  console.log(`### START: User population`)

  let user = new UserModel({
    email: 'user@scp.com',
    password: bcrypt.hashSync('12345'),
    role: 'USER',
    isActive: true,
    vehicles: [
      {
        type: 'CAR',
        model: 'Mercedes',
        registrationNumber: '333',
        color: 'black'
      },
      {
        type: 'MOTO',
        model: 'suzuki',
        registrationNumber: '777',
        color: 'red'
      }
    ]
  })

  user.save(user)
    .then(() => console.log(`### END: User population`))
    .catch(err => console.error(err))
}
