const jwt = require("jsonwebtoken");
const {access_token} = require("../config");
const { users } = require("../data/imitationDatabase")
const {randomBytes, createHmac} = require("crypto");

function setHashId(idUser, login){
    const salt = randomBytes(64).toString("hex")
    return createHmac('sha512', salt)
        .update(idUser.toString().concat(login))
        .digest('hex')
}

const getToken = (req, res) => {
    const user = users.find(user => user.login === req.body.login && user.password === req.body.password);
    if (!user) {
        return res.sendStatus(401);
    }
    const returnUser = {login: user.login, idHash: user.idHash}
    const token = jwt.sign(returnUser, access_token);
    res.cookie("yourPartyToken", token);
    res.sendStatus(200);
}

const createAccount = (req, res) => {
    try {
        const { id, login, password, email} = req.body;
        users.push(
            {
                id,
                login,
                password,
                email,
                idHash: setHashId(id, login),
            }
        )
        res.sendStatus(200)
    } catch (err) {
        res.sendStatus(401)
    }
}

const verifyAccount = (token) => {
    const valueToken = jwt.decode(token);
    try {
        const user = users.find(user => user.idHash === valueToken.idHash);
        if (!user) {
            return false
        }
        return true
    } catch (err) {
        return false
    }
}

module.exports = {
    getToken,
    verifyAccount,
    createAccount,
}