//const passportService = require('../services/passport')
const session = require('koa-session');
const passport = require('koa-passport');

const Router = require('koa-router')
const router = new Router()
const Ctrl = require('../controllers/terms')

const requireAuth = passport.authenticate('jwt',{session:false});


router.post('/termList',requireAuth, Ctrl.list)
router.post('/termAdd',requireAuth, Ctrl.add)
router.post('/termUpdate',requireAuth, Ctrl.update)
router.post('/termDeactivate',requireAuth, Ctrl.deactivate)

module.exports = router.routes()
