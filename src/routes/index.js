module.exports = (router) => {
  router.prefix("/v1");
  router.use("/users", require("./users"));
  router.use("/admins", require("./admins"));
  router.use("/classes", require("./classes"));
  router.use("/exams", require("./exams"));
  router.use("/materials", require("./materials"));
  router.use("/subjects", require("./subjects"));
  router.use("/forums", require("./forums"));
};
