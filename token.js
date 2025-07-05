const jwt = require('jsonwebtoken');

const payload = {
  id: 'test-user-id',
  email: 'test@example.com'
};

const secret = process.env.JWT_SECRET; // Use the same one from your backend (.env or hardcoded)

const token = jwt.sign(payload, secret, { expiresIn: '1d' });

console.log('Generated JWT Token:'  );
console.log(token);
console.log('\nUse this token in your requests to test the API.');


// Export the token for use in other files
module.exports = {
  generateToken: () => {
    return token;
  }     
};

