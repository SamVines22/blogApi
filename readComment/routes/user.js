const {Router} = require("express");
const controllers = require("../controllers/login");
const router = Router();
//const passport = require("../prisma/passport")
const jwt = require("jsonwebtoken");

function authenticate(req,res,next) {
    const token = req.cookies.token;
   // const header = req.headers['authorization'];
   // console.log(header);
   // const token = header;
   // const token = header && header.split[1];
    if (token !== undefined) {
    console.log(token);
    jwt.verify(token,'secret', function(err,user) {
        if(err) {
            res.json(err);
        }
        else {
            console.log(user);
            req.user =user;
            next();
        }
    });
}
    else {
        res.render("auth", {message: "unauthenticated"});
    }
}

    




router.get("/", controllers.getLogin);
router.post("/", controllers.postLogin);
router.get("/signup",controllers.getSignup);
router.post("/signup", controllers.postSignup)
router.get("/test", authenticate, controllers.test);
router.get("/logout", authenticate, controllers.logout)


module.exports = router;