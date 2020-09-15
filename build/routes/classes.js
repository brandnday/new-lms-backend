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
router.post("/getClassDetail", requireAuth, Ctrl.getClassDetail);
router.post("/getClassStudentList", requireAuth, Ctrl.getClassStudentList);
router.post("/insertClass", requireAuth, Ctrl.insertClass);
router.post("/updateClass", requireAuth, Ctrl.updateClass);
router.post("/deleteClass", requireAuth, Ctrl.deleteClass);
router.post("/getGradeList", requireAuth, Ctrl.getGradeList);
router.post("/insertGrade", requireAuth, Ctrl.insertGrade);
router.post("/updateGrade", requireAuth, Ctrl.updateGrade);
router.post("/deleteGrade", requireAuth, Ctrl.deleteGrade);
router.post("/getSpecializationList", requireAuth, Ctrl.getSpecializationList);
router.post("/insertSpecialization", requireAuth, Ctrl.insertSpecialization);
router.post("/updateSpecialization", requireAuth, Ctrl.updateSpecialization);
router.post("/deleteSpecialization", requireAuth, Ctrl.deleteSpecialization);
router.post("/getGradeList", requireAuth, Ctrl.getGradeList);
router.post("/insertGrade", requireAuth, Ctrl.insertGrade);
router.post("/updateGrade", requireAuth, Ctrl.updateGrade);
router.post("/deleteGrade", requireAuth, Ctrl.deleteGrade);
router.post("/getPeriodList", requireAuth, Ctrl.getPeriodList);
router.post("/insertPeriod", requireAuth, Ctrl.insertPeriod);
router.post("/deletePeriod", requireAuth, Ctrl.deletePeriod);

module.exports = router.routes();
//# sourceMappingURL=classes.js.map