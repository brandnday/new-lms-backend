'use strict';

//const passportService = require('../services/passport')
var session = require('koa-session');
var passport = require('koa-passport');

var Router = require('koa-router');
var router = new Router();
var Ctrl = require('../controllers/churches');
var requireAuth = passport.authenticate('jwt', { session: false });

router.post('/churchList', requireAuth, Ctrl.list);
router.post('/churchAll', requireAuth, Ctrl.all);
router.post('/churchAdminMap', requireAuth, Ctrl.adminChurchMap);
router.post('/churchAdd', requireAuth, Ctrl.add);
router.post('/churchUpdate', requireAuth, Ctrl.update);
router.post('/churchDeactivate', requireAuth, Ctrl.deactivate);
router.post('/adminAddMapping', requireAuth, Ctrl.addMapping);
router.post('/addminDeleteMapping', requireAuth, Ctrl.deleteMapping);
router.post('/availableChurchList', requireAuth, Ctrl.availableList);

module.exports = router.routes();
//# sourceMappingURL=churches.js.map