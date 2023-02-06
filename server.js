// npm install express nodemon body-parser cors dotenv convict http joi lodash morgan mongoose
const http = require('http');
const app = require('./src/app');
const Constants = require('../constants');

const PORT = process.env.port || 3001;

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
  console.log(`http://localhost:${PORT}`, Constants);
});
