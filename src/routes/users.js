const passportService = require("../services/passport");
const session = require("koa-session");
const passport = require("koa-passport");

const Router = require("koa-router");
const router = new Router();
const Ctrl = require("../controllers/users");

const signIn = passport.authenticate("local", { session: false });
const requireAuth = passport.authenticate("jwt", { session: false });

router.get("/exec", Ctrl.exec);
router.post("/signup", Ctrl.signup);
router.post("/signin3", Ctrl.signin);
router.post("/signin3", Ctrl.signin);

router.post("/signin", signIn, Ctrl.signin);
router.post("/checkAuthorize", requireAuth, Ctrl.checkAuthorize);

module.exports = router.routes();
