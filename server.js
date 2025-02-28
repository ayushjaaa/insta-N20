import app from './src/app.js';
import config from './src/config/config.js';
import http from 'http';
import  connetToDB from "./src/db/db.js"

connetToDB()
const server = http.createServer(app);
const PORT = config.PORT

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
