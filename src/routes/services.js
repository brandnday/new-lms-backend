//const passportService = require('../services/passport')
const session = require("koa-session");
const passport = require("koa-passport");

const Router = require("koa-router");
const router = new Router();
const Ctrl = require("../controllers/classes");
const requireAuth = passport.authenticate("jwt", { session: false });

router.post("/classesList", requireAuth, Ctrl.list);
router.post("/classesAdd", requireAuth, Ctrl.add);
router.post("/classesUpdate", requireAuth, Ctrl.update);
router.post("/classesDeactivate", requireAuth, Ctrl.deactivate);

module.exports = router.routes();
