//const passportService = require('../services/passport')
const session = require("koa-session");
const passport = require("koa-passport");

const Router = require("koa-router");
const router = new Router();
const Ctrl = require("../controllers/report");
const requireAuth = passport.authenticate("jwt", { session: false });

router.post("/birthday", requireAuth, Ctrl.birthday);
router.post(
  "/attendancePointThisTerm",
  requireAuth,
  Ctrl.attendancePointThisTerm
);
router.post("/perService", requireAuth, Ctrl.perService);
router.post("/childrenAttendancePerService", requireAuth, Ctrl.childrenAttendancePerService);
router.post("/monthlyPerService", requireAuth, Ctrl.monthlyPerService);
router.post("/yearlyPerService", requireAuth, Ctrl.yearlyPerService);
router.post("/followUp", requireAuth, Ctrl.followUp);
router.post("/point", requireAuth, Ctrl.point);

module.exports = router.routes();
