

module.exports = router => {

  router.prefix('/v1');
  router.use('/users', require('./users'));
  router.use('/admins', require('./admins'));
  router.use('/classes', require('./classes'));
};
//# sourceMappingURL=index.js.map