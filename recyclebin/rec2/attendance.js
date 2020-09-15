//const passportService = require('../services/passport')
const session = require("koa-session");
const passport = require("koa-passport");

const Router = require("koa-router");
const router = new Router();
const Ctrl = require("../controllers/attendance");
const requireAuth = passport.authenticate('jwt',{session:false});

router.post("/childrenList",requireAuth, Ctrl.list);
router.post("/attendedChildrenList",requireAuth, Ctrl.attendedList);
router.post("/childrenAdd",requireAuth, Ctrl.add);
router.post("/childrenDeactivate",requireAuth, Ctrl.deactivate);
router.post("/childrenAttendanceId",requireAuth, Ctrl.childrenAttendanceId);

module.exports = router.routes();
