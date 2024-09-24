const jwt = require("jsonwebtoken");
const prisma = require("../prisma/pool");
const db = require("../prisma/queries");
const queries = new db;



function authenticate(req,res,next) {
    const token = req.cookies.token;
    if (token !== undefined) {
    jwt.verify(token,'secret', async function(err,user) {
        if(err) {
            res.json(err);
        }
        else {
           // console.log(user);
            req.user = await queries.getUser(user.sub)
            next();
        }
    });
}
    else {
        res.render("auth", {message: "unauthenticated"});
    }
}

async function isSignedIn(req,res,next) {
    const token = req.cookies.token;
    if (token === undefined) {
        next();
    }
    else {
        jwt.verify(token, 'secret', async function (err,user) {
            if (err) {res.json(err)}
            else{
             
                const person = await queries.getUser(user.sub);
                req.user = person;
                next();
            }
        })
    }
}


module.exports = {authenticate, isSignedIn};