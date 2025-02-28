import dotEnv from 'dotenv'
dotEnv.config();
const _config = {
    PORT:process.env.PORT,
    MONGO_URI :process.env.MONGO_URI,
    JWT_SECRET:process.env.JWT_SECRET,
    JWT_EXPIRES_IN:process.env.JWT_EXPIRES_IN,
    REDIS_HOST:process.env.REDIS_HOST,
    REDIS_PORT:process.env.REDIS_PORT,
    REDIS_PASSWORD:process.env.REDIS_PASSWORD
}
const config = Object.freeze(_config)
// we will acces the all cogig throw with  _config so we make it 
// constatnt so uit wount change ... means in future if any devlorer  will try to change the port and all it wount change 
export default config