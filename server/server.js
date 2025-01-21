const http = require('http');
const path = require('path');
const app = require('./src/index');

const server = http.createServer();

server.on(app);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});