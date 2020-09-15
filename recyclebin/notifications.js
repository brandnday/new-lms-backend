//const passportService = require('../services/passport')
const session = require('koa-session');
const passport = require('koa-passport');

const Router = require('koa-router')
const router = new Router()
const Ctrl = require('../controllers/notifications')

const requireAuth = passport.authenticate('jwt',{session:false});


router.post('/notificationList',requireAuth, Ctrl.list)
router.post('/dashboardNotificationList',requireAuth, Ctrl.list2)
router.post('/notificationAdd',requireAuth, Ctrl.add)
router.post('/notificationUpdate',requireAuth, Ctrl.update)
router.post('/notificationDeactivate',requireAuth, Ctrl.deactivate)

module.exports = router.routes()
