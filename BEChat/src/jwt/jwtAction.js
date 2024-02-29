import jwt from 'jsonwebtoken';
require('dotenv').config()


const signToken = (data) => {
    let token = null;
    try {
        token = jwt.sign({
            data: data
        }, process.env.PRIVATE_KEY, { expiresIn: 60 * 60 });
    } catch (error) {
        console.log(error)
    }
    return token
}

const generateToken = (token) => {
    let decoded = null;
    try {
        decoded = jwt.verify(token, process.env.PRIVATE_KEY);
    } catch (error) {
        console.log(error)
    }
    return decoded;
}

// const extractToken = (req) => {
//     if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
//         return req.headers.authorization.split(' ')[1];
//     }
//     return null;
// }

module.exports = {
    signToken, generateToken,
}
