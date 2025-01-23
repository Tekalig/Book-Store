const http = require('http');
const app = require('./src/index');
const sequelize = require('./src/config/db');

const server = http.createServer();

server.on(app);

const PORT = process.env.PORT || 3000;
server.listen(PORT, async () => {
    await sequelize.sync()
    .then(() => console.log('Database connected'))
    .catch((err) => console.log(err));
    console.log(`Server is running on port ${PORT}`);
});