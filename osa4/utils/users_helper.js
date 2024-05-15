const User = require('../models/user')

const users = [{username: "ariP", name: "ari", password: "1234"}]

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(user => user.toJSON())
    }


module.exports = {users, usersInDb}