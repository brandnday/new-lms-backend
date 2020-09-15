"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addMapping = exports.deleteMapping = exports.adminChurchMap = exports.all = exports.availableList = exports.deactivate = exports.update = exports.add = exports.list = undefined;

var _database = require("../services/database");

var _token = require("../services/token");

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var isActive = "status = 'A'";
var list = exports.list = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(ctx) {
    var _ctx$request$body, churchname, pagination, queryParam, mainQuery, res, resCount;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _ctx$request$body = ctx.request.body, churchname = _ctx$request$body.churchname, pagination = _ctx$request$body.pagination;
            queryParam = ["%" + churchname + "%"];
            mainQuery = "from mschurch \n  where churchname like $1 \n  and " + isActive;
            _context.next = 5;
            return _database.pgPool.query("select id,churchname,description, status " + mainQuery + "\n    ORDER BY id\n    OFFSET " + (pagination.page - 1) * pagination.size + " LIMIT " + pagination.size, queryParam);

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
    var _ctx$request$body$req, churchname, description, res;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _ctx$request$body$req = ctx.request.body.requestData, churchname = _ctx$request$body$req.churchname, description = _ctx$request$body$req.description;
            _context2.next = 3;
            return _database.pgPool.query("insert into \n  mschurch(churchname,description,status) \n  values($1,$2,'A')", [churchname, description]);

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

var update = exports.update = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(ctx) {
    var _ctx$request$body$req2, churchname, description, editingId, res;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _ctx$request$body$req2 = ctx.request.body.requestData, churchname = _ctx$request$body$req2.churchname, description = _ctx$request$body$req2.description, editingId = _ctx$request$body$req2.editingId;
            _context3.next = 3;
            return _database.pgPool.query("update mschurch set churchname=$1, description=$2, status='A'\n  where id=$3", [churchname, description, editingId]);

          case 3:
            res = _context3.sent;

            ctx.ok({ response: res.rows });

          case 5:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function update(_x3) {
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
            return _database.pgPool.query("update mschurch set status='D'\n  where id=$1", [editingId]);

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

// view
var availableList = exports.availableList = function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(ctx) {
    var token, _decodeToken, payload, res;

    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            token = ctx.request.body.token;
            _decodeToken = (0, _token.decodeToken)(token), payload = _decodeToken.payload;
            _context5.next = 4;
            return _database.pgPool.query("select id,churchname from mschurch where id in(\n    (select churchid from trmappinguserwithchurch\n    where userid = $1\n    and status = 'A')) AND status = 'A'", [payload.user.id]);

          case 4:
            res = _context5.sent;

            ctx.ok({ response: res.rows });

          case 6:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, undefined);
  }));

  return function availableList(_x5) {
    return _ref5.apply(this, arguments);
  };
}();

var all = exports.all = function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(ctx) {
    var res;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return _database.pgPool.query("select * from\n  mschurch");

          case 2:
            res = _context6.sent;

            ctx.ok({ response: res.rows });

          case 4:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, undefined);
  }));

  return function all(_x6) {
    return _ref6.apply(this, arguments);
  };
}();

var adminChurchMap = exports.adminChurchMap = function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(ctx) {
    var userid, res;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            userid = ctx.request.body.userid;
            _context7.next = 3;
            return _database.pgPool.query("select a.id,c.churchname,a.role from trmappinguserwithchurch a\n    join mschurch c on a.churchid=c.id\n    where a.userid = $1 \n    and a.status ='A'\n    and c.status ='A'", [userid]);

          case 3:
            res = _context7.sent;

            ctx.ok({ response: res.rows });

          case 5:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, undefined);
  }));

  return function adminChurchMap(_x7) {
    return _ref7.apply(this, arguments);
  };
}();

var deleteMapping = exports.deleteMapping = function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(ctx) {
    var mapId, res;
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            mapId = ctx.request.body.requestData.mapId;
            _context8.next = 3;
            return _database.pgPool.query("update trmappinguserwithchurch set status='D'\n  where id=$1", [mapId]);

          case 3:
            res = _context8.sent;

            ctx.ok({ response: res.rows });

          case 5:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, undefined);
  }));

  return function deleteMapping(_x8) {
    return _ref8.apply(this, arguments);
  };
}();

var addMapping = exports.addMapping = function () {
  var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(ctx) {
    var _ctx$request$body$req3, userid, churchid, role, res, isNotExist;

    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _ctx$request$body$req3 = ctx.request.body.requestData, userid = _ctx$request$body$req3.userid, churchid = _ctx$request$body$req3.churchid, role = _ctx$request$body$req3.role;
            _context9.next = 3;
            return _database.pgPool.query("select * from trmappinguserwithchurch\n    where userid = $1 and churchid=$2\n    and status ='A'", [userid, churchid]);

          case 3:
            res = _context9.sent;
            isNotExist = res.rows.length < 1;
            _context9.t0 = isNotExist;

            if (!_context9.t0) {
              _context9.next = 9;
              break;
            }

            _context9.next = 9;
            return _database.pgPool.query("insert into trmappinguserwithchurch(userid, churchid,role, status)\n  VALUES($1,$2,$3,'A')", [userid, churchid, role]);

          case 9:
            ctx.ok({ response: true });

          case 10:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9, undefined);
  }));

  return function addMapping(_x9) {
    return _ref9.apply(this, arguments);
  };
}();
//# sourceMappingURL=churches.js.map