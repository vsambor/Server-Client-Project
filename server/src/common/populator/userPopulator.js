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
    isActive: true,
    profile: {
      firstName: 'Albert',
      lastName: 'Einstein',
      age: 50,
      nationality: 'German',
      picture: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Albert_Einstein_Head.jpg/220px-Albert_Einstein_Head.jpg'
    }
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
    profile: {
      firstName: 'Holmes',
      lastName: 'Sherlock',
      age: 33,
      nationality: 'British',
      picture: 'https://img00.deviantart.net/edf2/i/2012/061/0/6/sherlock_holmes_by_roza777-d4rgdrc.jpg'
    },
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
