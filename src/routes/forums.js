//const passportService = require('../services/passport')
const session = require("koa-session");
const passport = require("koa-passport");

const Router = require("koa-router");
const router = new Router();
const Ctrl = require("../controllers/forums");
const requireAuth = passport.authenticate("jwt", { session: false });

router.post("/getForumThreadList", Ctrl.getForumThreadList);
router.post("/getForumThreadAnswerList", Ctrl.getForumThreadAnswerList);
router.post("/insertForumThread", Ctrl.insertForumThread);
router.post("/updateForumThread", Ctrl.updateForumThread);
router.post("/deleteForumThread", Ctrl.deleteForumThread);
router.post("/insertAnswer", Ctrl.insertAnswer);
router.post("/deleteAnswer", Ctrl.deleteAnswer);

module.exports = router.routes();
