const http = require("http");

const app = require("./src/index");
const sequelize = require("./src/config/db");

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

server.listen(PORT, async () => {
  await sequelize
    .sync()
    .then(() => console.log("Database connected"))
    .catch((err) => console.log(err));
  console.log(`Server is running on port ${PORT}`);
});