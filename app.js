require('dotenv').config();
const Server = require('./models/server')

const server = new Server();
server.listen()

// Recomiendo ejecutar npm run dev para ver los datalles de las consultas por terminal