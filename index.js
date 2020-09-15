require('dotenv').config();
const server = require('./src/server')

const port = process.env.PORT || 3001
server.listen(port, () => console.log(`API server started on ${port}`))
