
const serverConfig = require('./api/config/server')
const app = require('./server');

const { port } = serverConfig

// Server
app.listen(port, () => {
  console.log(`[+] Server running at http://localhost:${port}/`);
});

