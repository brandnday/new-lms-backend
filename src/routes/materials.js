//const passportService = require('../services/passport')
const session = require("koa-session");
const passport = require("koa-passport");

const Router = require("koa-router");
const router = new Router();
const Ctrl = require("../controllers/materials");
const requireAuth = passport.authenticate("jwt", { session: false });

// router.post("/serviceList", requireAuth, Ctrl.list);
// router.post("/serviceAdd", requireAuth, Ctrl.add);
// router.post("/serviceUpdate", requireAuth, Ctrl.update);
router.post("/getMaterialDetail", Ctrl.getMaterialDetail);
router.post("/insertMaterial", Ctrl.insertMaterial);
router.post("/updateMaterial", Ctrl.updateMaterial);
router.post("/deleteMaterial", Ctrl.deleteMaterial);

module.exports = router.routes();
