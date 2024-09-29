const {Router} = require("express");
const controllers = require("../controllers/home");
const middleware = require("../middleware/middleware");

const router = Router();


router.get("/", middleware.isSignedIn,controllers.home);
router.get("/posts/:postid", middleware.verifyToken, controllers.seeOnePost)
router.post("/posts/:postid", middleware.verifyToken, controllers.commentPost);



module.exports = router;