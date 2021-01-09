const orders = require("./db/test-data");

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser'); 
const morgan = require('morgan');
const helmet = require('helmet')

const PORT = process.env.PORT || 5000;
const app = express();

app.use(helmet());
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('combined'));

//endpoint
app.get('/', (req, res) => {
  res.status(200);
  res.json(orders)
})

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));


