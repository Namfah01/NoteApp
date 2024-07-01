const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
    const authHeader = req.header["authorization"];
    const token = authHeader && authHeader.spilt("")[1];
    console.log(`access token: ${token}`);
    if (!token) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(401);
        console.log(user);
        req.user = user;
        next();
    });
}

module.exports = {
    authenticateToken,
};