//const passportService = require('../services/passport')
const session = require("koa-session");
const passport = require("koa-passport");

const Router = require("koa-router");
const router = new Router();
const Ctrl = require("../controllers/subjects");
const requireAuth = passport.authenticate("jwt", { session: false });

// router.post("/serviceUpdate", requireAuth, Ctrl.update);
router.post("/getSubjectList", Ctrl.getSubjectList);
router.post("/getSubjectDetail", Ctrl.getSubjectDetail);
router.post("/insertSubject", Ctrl.insertSubject);
router.post("/deleteSubject", Ctrl.deleteSubject);
router.post("/updateSubject", Ctrl.updateSubject);
router.post("/getSubjectClassMappingList", Ctrl.getSubjectClassMappingList);
router.post(
  "/upsertSubjectClassMappingList",
  Ctrl.upsertSubjectClassMappingList
);
router.post("/getSubjectChapterList", Ctrl.getSubjectChapterList);
router.post("/insertChapter", Ctrl.insertChapter);
router.post("/updateChapter", Ctrl.updateChapter);
router.post("/deleteChapter", Ctrl.deleteChapter);

module.exports = router.routes();
