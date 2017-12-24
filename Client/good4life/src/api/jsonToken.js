const jwtDecode = require('jwt-decode');

const jsonToken = (token) => (
    jwtDecode(token)
)

module.exports = jsonToken