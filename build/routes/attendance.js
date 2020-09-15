"use strict";

//const passportService = require('../services/passport')
var session = require("koa-session");
var passport = require("koa-passport");

var Router = require("koa-router");
var router = new Router();
var Ctrl = require("../controllers/attendance");
var requireAuth = passport.authenticate('jwt', { session: false });

router.post("/childrenList", requireAuth, Ctrl.list);
router.post("/attendedChildrenList", requireAuth, Ctrl.attendedList);
router.post("/childrenAdd", requireAuth, Ctrl.add);
router.post("/childrenDeactivate", requireAuth, Ctrl.deactivate);

module.exports = router.routes();
//# sourceMappingURL=attendance.js.map