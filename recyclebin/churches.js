  

//const passportService = require('../services/passport')
const session = require('koa-session');
const passport = require('koa-passport');

const Router = require('koa-router')
const router = new Router()
const Ctrl = require('../controllers/churches')
const requireAuth = passport.authenticate('jwt',{session:false});

router.post('/churchList',requireAuth, Ctrl.list)
router.post('/churchAll',requireAuth, Ctrl.all)
router.post('/churchAdminMap',requireAuth, Ctrl.adminChurchMap)
router.post('/churchAdd',requireAuth, Ctrl.add)
router.post('/churchUpdate',requireAuth, Ctrl.update)
router.post('/churchDeactivate',requireAuth, Ctrl.deactivate)
router.post('/adminAddMapping',requireAuth, Ctrl.addMapping)
router.post('/addminDeleteMapping',requireAuth, Ctrl.deleteMapping)
router.post('/availableChurchList',requireAuth, Ctrl.availableList)

module.exports = router.routes()
