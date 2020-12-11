const USER = 'gavin'
const PW = 'Passw0rd'
const DB = 'db_demo'
const MONGO_URI = `mongodb+srv://${USER}:${PW}@gavin-test1.iwsf0.mongodb.net/${DB}?retryWrites=true&w=majority`
const USERS_COLLECTION = 'users_col'
module.exports = {
    MONGO_URI,
    USERS_COLLECTION,
}