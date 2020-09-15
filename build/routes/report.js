"use strict";

//const passportService = require('../services/passport')
var session = require("koa-session");
var passport = require("koa-passport");

var Router = require("koa-router");
var router = new Router();
var Ctrl = require("../controllers/report");
var requireAuth = passport.authenticate('jwt', { session: false });

router.post("/birthday", requireAuth, Ctrl.birthday);

module.exports = router.routes();
//# sourceMappingURL=report.js.map