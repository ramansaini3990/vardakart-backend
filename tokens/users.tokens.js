const jwt = require('jsonwebtoken');

const createToken = (userData) => {
    const token = jwt.sign({
        userData
    },
    process.env.SECRET_KEY,
    );
    return token;
}

const verifyToken = (token) => {
    const decoded = jwt.verify(
        token,
        process.env.SECRET_KEY,
    );
    return decoded;
}

module.exports = {
    createToken,
    verifyToken
}