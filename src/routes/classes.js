//const passportService = require('../services/passport')
const session = require("koa-session");
const passport = require("koa-passport");

const Router = require("koa-router");
const router = new Router();
const Ctrl = require("../controllers/classes");
const requireAuth = passport.authenticate("jwt", { session: false });

// router.post("/serviceList", requireAuth, Ctrl.list);
// router.post("/serviceAdd", requireAuth, Ctrl.add);
// router.post("/serviceUpdate", requireAuth, Ctrl.update);
router.post("/getClassList", Ctrl.getClassList);
router.post("/getClassDetail", Ctrl.getClassDetail);
router.post("/getClassStudentList", Ctrl.getClassStudentList);
router.post("/insertClass", Ctrl.insertClass);
router.post("/updateClass", Ctrl.updateClass);
router.post("/deleteClass", Ctrl.deleteClass);
router.post("/getGradeList", Ctrl.getGradeList);
router.post("/getSpecializationList", Ctrl.getSpecializationList);
router.post("/insertSpecialization", Ctrl.insertSpecialization);
router.post("/updateSpecialization", Ctrl.updateSpecialization);
router.post("/deleteSpecialization", Ctrl.deleteSpecialization);
router.post("/insertGrade", Ctrl.insertGrade);
router.post("/updateGrade", Ctrl.updateGrade);
router.post("/deleteGrade", Ctrl.deleteGrade);
router.post("/getPeriodList", Ctrl.getPeriodList);
router.post("/insertPeriod", Ctrl.insertPeriod);
router.post("/deletePeriod", Ctrl.deletePeriod);

module.exports = router.routes();
