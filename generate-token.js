const jwt = require('jsonwebtoken');

const payload = {
  id: 'test-user-id',
  email: 'test@example.com'
};

const secret = 'hhghfshjfjshjkjhkjkj'; // Use same secret as your backend

const token = jwt.sign(payload, secret, { expiresIn: '1d' });

console.log('\nYour test JWT token:\n');
console.log(token);
