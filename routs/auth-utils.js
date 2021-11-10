const jwt = require("jsonwebtoken");
const {access_token} = require("../config");
const {users} = require("../data/imitationDatabase")
const {randomBytes, createHmac} = require("crypto");
const RegisterUser = require("../models/RegisterUser");
const {v4: uuidv4} = require('uuid');


function setHashId(idUser, login) {
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
    // @TODO Dodać sprawdzanie, czy istnieje taki user, przed dodaniem :), a wcześniej czy password 1 odfpowiada password 2

    const id = uuidv4();
    const {login, password, password2, email} = req.body;

    const RegisterData = new RegisterUser({
            id,
            login,
            password,
            email,
            idHash: setHashId(id, login)
        }
    )
    RegisterData.save()
        .then(() => {
            res.render('sites/user-account/register-confirmation', {
                data: req.body
            })
        })
        .catch(error => console.log(error))


}

const checkUserInDB = (req, res, url) => {

    const {login, password} = req.body;

    RegisterUser.find({
        name: login,
        password: password
    })
        .lean()
        .then((data) => {

                if (data.length < 1 ) {
                    res.render('sites/user-account/login-fail')
                    return
                }
            const returnUser = {login: data.login, idHash: data.idHash}
            const token = jwt.sign(returnUser, access_token);
            res.cookie("yourPartyToken", token);
            res.redirect(url)
            }
        )
        .catch(error => console.error(error))
}

const verifyAccount = (token) => {
    return jwt.verify(token, access_token, (err) => {
        if(err) return false;
        return true;
    })
}

const logoutUser = (req, res) =>{
    res.clearCookie("yourPartyToken");
    res.render('sites/user-account/register-login-form', {})
}

module.exports = {
    getToken,
    verifyAccount,
    createAccount,
    checkUserInDB,
    logoutUser,
}