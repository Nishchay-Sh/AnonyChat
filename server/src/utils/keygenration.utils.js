const crypto = require('crypto');

module.exports.genrateKey = () => {
    const secretKey = crypto.randomBytes(32).toString('hex');
    return secretKey;
}