require('dotenv').config()


let PORT = process.env.PORT
let MONGODB_URI = process.env.MONGODB_URI
let TEST_MONGODB_URI = process.env.TEST_MONGODB_URI

module.exports = {
    MONGODB_URI,
    TEST_MONGODB_URI,
    PORT
}