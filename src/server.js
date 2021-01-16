const pid = process.pid;
const PORT = process.env.PORT || 5000;

require('dotenv').config({ path: '.env' });

// require app.js
const app = require('./index');

// start the server on port 3000
const server = app.listen(PORT, () => {
  console.log(`Express running → PORT ${server.address().port} \nWorker Process: ${pid}`);
})