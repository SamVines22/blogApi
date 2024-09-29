const jwt = require("jsonwebtoken");
const prisma = require("../prisma/pool");
const db = require("../prisma/queries");
const queries = new db;

function verifyToken (req,res,next) {
    const bearerHeader = req.headers['authorization'];
    
    if (bearerHeader !== undefined) {
        const split = bearerHeader.split(' ');
        const token = split[1];
        jwt.verify(token, 'secret', async (err, auth)=> {
            if(err) {
                res.json(err);
            }
            else {
                req.user = await queries.getUser(auth.sub);
                next();
            }
        })
       
    }
    else {
        res.sendStatus(403);
    }
   
}

// function authenticate(req,res,next) {
//     //console.log(req.headers);
//    // console.log(req.headers['authorization']);
//     const token = req.cookies.token;
//     console.log(token);
//     if (token !== undefined) {
//     jwt.verify(token,'secret', async function(err,user) {
//         if(err) {
//             res.json(err);
//         }
//         else {
//            // console.log(user);
//             req.user = await queries.getUser(user.sub)
//             next();
//         }
//     });
// }
//     else {
//         res.render("auth", {message: "unauthenticated"});
//     }
// }

async function isSignedIn(req,res,next) {
    const token = req.cookies.token;
    console.log("issignded")
    console.log(token);
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


module.exports = { isSignedIn, verifyToken};