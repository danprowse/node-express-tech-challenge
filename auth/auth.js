// FORMAT OF TOKEN
// Authorization: Bearer <access_token>

// verify token 
function verifyToken(req, res, next) {
  //Get auth header value
  //when sending token, send it in header label authorisation value
  const bearerHeader = req.headers['authorization'];
  // Check if bearer is undefinded
  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    //Get token from array
    const bearerToken = bearer[1];
    //set the token
    req.token = bearerToken;
    // Next middleware
    next();
  } else {
    //Forbidden
    res.sendStatus(403);
  }
}

module.exports = verifyToken;
