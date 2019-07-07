const config = require('config');

module.exports = function() {
    if (!config.get('jwtPrivateKey')) {
        throw new Error('jwtPrivate key is not define!');
      }
}