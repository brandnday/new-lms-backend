'use strict';

//const passportService = require('../services/passport')
var session = require('koa-session');
var passport = require('koa-passport');

var Router = require('koa-router');
var router = new Router();
var Ctrl = require('../controllers/terms');

var requireAuth = passport.authenticate('jwt', { session: false });

router.post('/termList', requireAuth, Ctrl.list);
router.post('/termAdd', requireAuth, Ctrl.add);
router.post('/termUpdate', requireAuth, Ctrl.update);
router.post('/termDeactivate', requireAuth, Ctrl.deactivate);

module.exports = router.routes();
//# sourceMappingURL=terms.js.map