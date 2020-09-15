  

//const passportService = require('../services/passport')
const session = require('koa-session');
const passport = require('koa-passport');

const Router = require('koa-router')
const router = new Router()
const Ctrl = require('../controllers/children')

const requireAuth = passport.authenticate('jwt',{session:false});
router.post('/childrenList',requireAuth, Ctrl.list)
router.post('/childrenAdd',requireAuth, Ctrl.add)
router.post('/childrenUpdate',requireAuth, Ctrl.update)
router.post('/childrenDeactivate',requireAuth, Ctrl.deactivate)

module.exports = router.routes()
