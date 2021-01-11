const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  //send username password to this url

  //do authentication here
  
  //get user from db.
  
  //skipped above for this example and created a mock user 

  // on client side save the sent jwt token in local storage as reference for logged in user for requesting protected routes

  //mock user
  const user = {
    id: 1,
    username:'dan',
    email: 'dan@gmail.com'
  }

  jwt.sign({user: user}, 'secretkey', {expiresIn: '30m'}, (err, token) => {
    res.json({
      token: token
    })
  })
})

module.exports = router;