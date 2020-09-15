//const passportService = require('../services/passport')
const session = require('koa-session');
const passport = require('koa-passport');

const Router = require('koa-router');
const router = new Router();
const Ctrl = require('../controllers/admins');
const requireAuth = passport.authenticate('jwt', { session: false });

router.post('/adminList', requireAuth, Ctrl.list);
router.post('/adminAdd', requireAuth, Ctrl.add);
router.post('/adminUpdate', requireAuth, Ctrl.update);
router.post('/adminDeactivate', requireAuth, Ctrl.deactivate);

module.exports = router.routes();
//# sourceMappingURL=admins.js.map