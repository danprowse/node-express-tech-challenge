const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');

const PORT = process.env.PORT || 5000;
const app = express();

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());
app.use(morgan('combined'));

// api routes 
app.use('/api/orders', require('./routes/api/orders'))
app.use('/api/login', require('./routes/api/login'))

//endpoint
app.get('/', (req, res) => {
  res.status(200);
  res.json({msg: 'Vehicle Order API'})
})

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));


