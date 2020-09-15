//const passportService = require('../services/passport')
const session = require("koa-session");
const passport = require("koa-passport");

const Router = require("koa-router");
const router = new Router();
const Ctrl = require("../controllers/exams");
const requireAuth = passport.authenticate("jwt", { session: false });

router.post("/getExamDetail", Ctrl.getExamDetail);
router.post("/insertExam", Ctrl.insertExam);
router.post("/updateExam", Ctrl.updateExam);
router.post("/deleteExam", Ctrl.deleteExam);

module.exports = router.routes();
