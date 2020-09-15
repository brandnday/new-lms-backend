"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.yearlyPerService = exports.monthlyPerService = exports.monthlyPerChild = exports.perService = exports.attendancePointThisTerm = exports.lateThisTerm = exports.birthday = undefined;

var _database = require("../services/database");

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var isActive = "status = 'A'";
var birthday = exports.birthday = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(ctx) {
    var _ctx$request$body, churchId, monthId, queryParam, mainQuery, res;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _ctx$request$body = ctx.request.body, churchId = _ctx$request$body.churchId, monthId = _ctx$request$body.monthId;
            queryParam = [churchId, monthId + 1];
            mainQuery = monthId === 12 ? "from mschildren \n  where registered_at = $1\n  and EXTRACT(MONTH FROM birthdate)<=$2\n  and status='A'" : "from mschildren \n  where registered_at = $1\n  and EXTRACT(MONTH FROM birthdate)=$2\n  and status='A'";
            _context.next = 5;
            return _database.pgPool.query("select id, name,birthdate  " + mainQuery + "\n   ", queryParam);

          case 5:
            res = _context.sent;


            ctx.ok({ response: { rows: res.rows } });

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function birthday(_x) {
    return _ref.apply(this, arguments);
  };
}();

var lateThisTerm = exports.lateThisTerm = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(ctx) {
    var _ctx$request$body2, churchId, termId, name, queryParam, mainQuery, res;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _ctx$request$body2 = ctx.request.body, churchId = _ctx$request$body2.churchId, termId = _ctx$request$body2.termId, name = _ctx$request$body2.name;
            queryParam = [termId, churchId, "%" + name + "%"];
            mainQuery = " from trattendance a\n  join mschildren c on a.childrenid = c.id\n    where attendancestatus = 'L'\n  and termid = $1\n  and churchid= $2\n  and a.status='A'\n  and name like $3\n  group by c.id,name";
            _context2.next = 5;
            return _database.pgPool.query("select c.id, name, count(date)*2 as points  " + mainQuery + "\n   ", queryParam);

          case 5:
            res = _context2.sent;


            ctx.ok({ response: { rows: res.rows } });

          case 7:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function lateThisTerm(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

var attendancePointThisTerm = exports.attendancePointThisTerm = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(ctx) {
    var _ctx$request$body3, churchId, termId, queryParam, mainQuery, res;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _ctx$request$body3 = ctx.request.body, churchId = _ctx$request$body3.churchId, termId = _ctx$request$body3.termId;
            queryParam = [termId, churchId, "%" + name + "%"];
            mainQuery = " from trattendance a\n  join mschildren c on a.childrenid = c.id\n    where attendancestatus = 'G'\n  and termid = $1\n  and churchid= $2\n  and name like $3\n  and a.status='A'\n  group by c.id,name";
            _context3.next = 5;
            return _database.pgPool.query("select c.id, name, count(date)*4 as points  " + mainQuery + "\n   ", queryParam);

          case 5:
            res = _context3.sent;


            ctx.ok({ response: { rows: res.rows } });

          case 7:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function attendancePointThisTerm(_x3) {
    return _ref3.apply(this, arguments);
  };
}();

var perService = exports.perService = function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(ctx) {
    var _ctx$request$body4, churchId, serviceId, date, queryParam, mainQuery, res;

    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _ctx$request$body4 = ctx.request.body, churchId = _ctx$request$body4.churchId, serviceId = _ctx$request$body4.serviceId, date = _ctx$request$body4.date;
            queryParam = [churchId, serviceId, date];
            mainQuery = "from trattendance a\n  join mschildren c on a.childrenid = c.id\n    where a.status='A'\n    and churchid= #1\n  and serviceid =$2\n  and date like $3";
            _context4.next = 5;
            return _database.pgPool.query("select c.id, name,date, attendancestatus  " + mainQuery + "\n   ", queryParam);

          case 5:
            res = _context4.sent;

            ctx.ok({ response: { rows: res.rows } });

          case 7:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  }));

  return function perService(_x4) {
    return _ref4.apply(this, arguments);
  };
}();

var monthlyPerChild = exports.monthlyPerChild = function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(ctx) {
    var _ctx$request$body5, churchId, date, queryParam, mainQuery, res;

    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _ctx$request$body5 = ctx.request.body, churchId = _ctx$request$body5.churchId, date = _ctx$request$body5.date;
            queryParam = [churchId, "'" + date + "-%"];
            mainQuery = "from trattendance a\n  join mschildren c on a.childrenid = c.id\n    where a.status='A'\n  and churchid= $1\n  and date like $2\n  group by c.id,name";
            _context5.next = 5;
            return _database.pgPool.query("select c.id, name, count(date) as totalAttendance   " + mainQuery + "\n   ", queryParam);

          case 5:
            res = _context5.sent;

            ctx.ok({ response: { rows: res.rows } });

          case 7:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, undefined);
  }));

  return function monthlyPerChild(_x5) {
    return _ref5.apply(this, arguments);
  };
}();

var monthlyPerService = exports.monthlyPerService = function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(ctx) {
    var _ctx$request$body6, churchId, date, queryParam, mainQuery, res;

    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _ctx$request$body6 = ctx.request.body, churchId = _ctx$request$body6.churchId, date = _ctx$request$body6.date;
            queryParam = [churchId, "'" + date + "-%"];
            mainQuery = "from trattendance a\n  join trservices s on a.serviceid=s.id\n    where a.status='A'\n  and a.churchid= $1\n  and s.churchid= $1\n  and date like $2\n  group by date, serviceid,servicename\n  order by date, servicename";
            _context6.next = 5;
            return _database.pgPool.query("select date, serviceid,servicename, count(a.id) as totalAttendance  " + mainQuery + "\n   ", queryParam);

          case 5:
            res = _context6.sent;

            ctx.ok({ response: { rows: res.rows } });

          case 7:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, undefined);
  }));

  return function monthlyPerService(_x6) {
    return _ref6.apply(this, arguments);
  };
}();

var yearlyPerService = exports.yearlyPerService = function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(ctx) {
    var _ctx$request$body7, churchId, year, queryParam, mainQuery, res;

    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _ctx$request$body7 = ctx.request.body, churchId = _ctx$request$body7.churchId, year = _ctx$request$body7.year;
            queryParam = [churchId, "'" + year + "-%"];
            mainQuery = "\nfrom trattendance a\n  join trservices s on a.serviceid=s.id\n    where a.status='A'\n  and a.churchid= $1\n  and s.churchid= $1\n  and date like $2\n  group by date, serviceid,servicename\n  order by date, servicename";
            _context7.next = 5;
            return _database.pgPool.query("select date, serviceid,servicename, count(a.id) as totalAttendance  " + mainQuery + "\n   ", queryParam);

          case 5:
            res = _context7.sent;

            ctx.ok({ response: { rows: res.rows } });

          case 7:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, undefined);
  }));

  return function yearlyPerService(_x7) {
    return _ref7.apply(this, arguments);
  };
}();
//# sourceMappingURL=report.js.map