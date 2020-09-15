"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deactivate = exports.attendedList = exports.add = exports.list = undefined;

var _database = require("../services/database");

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var isActive = "status = 'A'";
var list = exports.list = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(ctx) {
    var _ctx$request$body, churchId, date, serviceId, termId, pagination, name, attendanceType, queryParam, mainQuery, res, resCount;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _ctx$request$body = ctx.request.body, churchId = _ctx$request$body.churchId, date = _ctx$request$body.date, serviceId = _ctx$request$body.serviceId, termId = _ctx$request$body.termId, pagination = _ctx$request$body.pagination, name = _ctx$request$body.name, attendanceType = _ctx$request$body.attendanceType;
            queryParam = [churchId, date, serviceId, termId, "%" + name + "%"];
            mainQuery = "from mschildren \n  where id not in\n  (select childrenid from trattendance\n  where churchId = $1\n  and date=$2\n  and serviceId = $3\n  and termId = $4\n  and status='A') \n  and name like $5";
            _context.next = 5;
            return _database.pgPool.query("select id, name,birthdate  " + mainQuery + "\n    ORDER BY id\n    OFFSET " + (pagination.page - 1) * pagination.size + " LIMIT " + pagination.size, queryParam);

          case 5:
            res = _context.sent;
            _context.next = 8;
            return _database.pgPool.query("select count(*) " + mainQuery, queryParam);

          case 8:
            resCount = _context.sent;

            ctx.ok({ response: { rows: res.rows, totalData: resCount.rows[0].count } });

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function list(_x) {
    return _ref.apply(this, arguments);
  };
}();

var add = exports.add = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(ctx) {
    var _ctx$request$body$req, churchId, childrenId, date, serviceId, termId, res;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _ctx$request$body$req = ctx.request.body.requestData, churchId = _ctx$request$body$req.churchId, childrenId = _ctx$request$body$req.childrenId, date = _ctx$request$body$req.date, serviceId = _ctx$request$body$req.serviceId, termId = _ctx$request$body$req.termId;
            _context2.next = 3;
            return _database.pgPool.query("insert into \n    trattendance(churchid,childrenid,date,serviceid,termid,time,status,attendancestatus) \n  values($1,$2,$3,$4,$5,'11:00','A','G')", [churchId, childrenId, date, serviceId, termId]);

          case 3:
            res = _context2.sent;

            ctx.ok({ response: res.rows });

          case 5:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function add(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

var attendedList = exports.attendedList = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(ctx) {
    var _ctx$request$body2, churchId, date, serviceId, termId, pagination, queryParam, mainQuery, res, resCount;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _ctx$request$body2 = ctx.request.body, churchId = _ctx$request$body2.churchId, date = _ctx$request$body2.date, serviceId = _ctx$request$body2.serviceId, termId = _ctx$request$body2.termId, pagination = _ctx$request$body2.pagination;
            queryParam = [churchId, date, serviceId, termId];
            mainQuery = "from trattendance a\n  join mschildren c on a.childrenid = c.id\n  where churchId = $1\n  and date=$2\n  and serviceId = $3\n  and termId = $4\n  and a.status='A'\n  ";
            _context3.next = 5;
            return _database.pgPool.query("select a.id,name, birthdate, time,attendancestatus " + mainQuery + "\n    ORDER BY a.id\n    OFFSET " + (pagination.page - 1) * pagination.size + " LIMIT " + pagination.size, queryParam);

          case 5:
            res = _context3.sent;
            _context3.next = 8;
            return _database.pgPool.query("select count(*) " + mainQuery, queryParam);

          case 8:
            resCount = _context3.sent;

            ctx.ok({ response: { rows: res.rows, totalData: resCount.rows[0].count } });

          case 10:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function attendedList(_x3) {
    return _ref3.apply(this, arguments);
  };
}();

var deactivate = exports.deactivate = function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(ctx) {
    var editingId, res;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            editingId = ctx.request.body.requestData.editingId;
            _context4.next = 3;
            return _database.pgPool.query("update trattendance set status='D'\n  where id=$1", [editingId]);

          case 3:
            res = _context4.sent;

            ctx.ok({ response: res.rows });

          case 5:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  }));

  return function deactivate(_x4) {
    return _ref4.apply(this, arguments);
  };
}();
//# sourceMappingURL=attendance.js.map