//const passport = require("../prisma/passport");
const jwt = require("jsonwebtoken");
const prisma = require("../prisma/pool");
const bcryptjs = require("bcryptjs");

function issueJWT(user) {
    const id = user.id;
    const expiresIn = 60*60*24;
    const payload = {sub: id};
    const token = jwt.sign(payload,'secret', {expiresIn: expiresIn});
    console.log(token);
    return {
        token: token,
        expiresIn:expiresIn
    }

}



function getLogin(req,res) {
  
    res.render("login");
}

async function postLogin(req,res) {
    const user = await prisma.users.findFirst({where: {username:req.body.username}});
    if (!user){
        res.json("username not found");
    }
    else {
    const match = await bcryptjs.compare(req.body.password,user.password);
    if (match)
    {
        const jwt = issueJWT(user);
   //     res.headers['authorization'] = jwt.token;
        console.log(jwt);
     //   res.cookie("token", jwt.token, {maxAge: jwt.expiresIn * 1000});
        res.redirect("/");
    }
    else {
        res.json("passport doesn't match");
    }
}
   
}

function logout (req,res) {
    res.clearCookie("token");
    res.redirect("/user");
}

async function getSignup(req,res) {
    res.render("signup");
}

async function postSignup(req,res) {
    console.log(req.body);
    const pw = await bcryptjs.hash(req.body.password,10);
    console.log(pw);
    await prisma.users.create({data: {
        username: req.body.username,
        password: pw
    }})
    res.redirect("/login");
} 

async function test(req,res) {
    console.log("gimp");
    console.log(req.user);
    res.json("twat authenticated");
}

module.exports = {getLogin, postLogin,logout,test, getSignup, postSignup};