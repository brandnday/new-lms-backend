"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deactivate = exports.update = exports.add = exports.list = undefined;

var _database = require("../services/database");

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var isActive = "status = 'A'";
var list = exports.list = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(ctx) {
    var _ctx$request$body, _ctx$request$body$nic, nickname, registeredAt, pagination, queryParam, mainQuery, res, resCount;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _ctx$request$body = ctx.request.body, _ctx$request$body$nic = _ctx$request$body.nickname, nickname = _ctx$request$body$nic === undefined ? "" : _ctx$request$body$nic, registeredAt = _ctx$request$body.registeredAt, pagination = _ctx$request$body.pagination;
            queryParam = ["%" + nickname + "%"];
            mainQuery = "from mschildren \n  where nickname like $1\n  and registered_at = " + registeredAt + "\n  and " + isActive;
            _context.next = 5;
            return _database.pgPool.query("select nickname,gender,address, birthdate " + mainQuery + "\n    ORDER BY id\n    OFFSET " + (pagination.page - 1) * pagination.size + " LIMIT " + pagination.size, queryParam);

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
    var _ctx$request$body$req, name, nickname, gender, address, father, mother, school, parentphone, _ctx$request$body$req2, imgloc, birthdate, attendanceid, registered_at, res;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _ctx$request$body$req = ctx.request.body.requestData, name = _ctx$request$body$req.name, nickname = _ctx$request$body$req.nickname, gender = _ctx$request$body$req.gender, address = _ctx$request$body$req.address, father = _ctx$request$body$req.father, mother = _ctx$request$body$req.mother, school = _ctx$request$body$req.school, parentphone = _ctx$request$body$req.phone, _ctx$request$body$req2 = _ctx$request$body$req.photo, imgloc = _ctx$request$body$req2 === undefined ? "NONE" : _ctx$request$body$req2, birthdate = _ctx$request$body$req.birthdate, attendanceid = _ctx$request$body$req.attendanceid, registered_at = _ctx$request$body$req.registered_at;
            _context2.next = 3;
            return _database.pgPool.query("INSERT INTO mschildren(\n      name,nickname,gender,address,\n      father,mother,school,parentphone,\n      imgloc,graduated,birthdate,status,attendanceid,\n      registered_at)\n  values($1,$2,$3,$4,\n    $5,$6,$7, $8,\n    $9,$10,$11,'A',$12,$13)", [name, nickname, gender, address, father, mother, school, parentphone, imgloc, "N", birthdate, attendanceid, registered_at]);

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
    var _ctx$request$body$req3, nickname, gender, address, father, mother, school, parentphone, _ctx$request$body$req4, imgloc, graduated, birthdate, registered_at, editingId, res;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _ctx$request$body$req3 = ctx.request.body.requestData, nickname = _ctx$request$body$req3.nickname, gender = _ctx$request$body$req3.gender, address = _ctx$request$body$req3.address, father = _ctx$request$body$req3.father, mother = _ctx$request$body$req3.mother, school = _ctx$request$body$req3.school, parentphone = _ctx$request$body$req3.parentphone, _ctx$request$body$req4 = _ctx$request$body$req3.imgloc, imgloc = _ctx$request$body$req4 === undefined ? "NONE" : _ctx$request$body$req4, graduated = _ctx$request$body$req3.graduated, birthdate = _ctx$request$body$req3.birthdate, registered_at = _ctx$request$body$req3.registered_at, editingId = _ctx$request$body$req3.editingId;
            _context3.next = 3;
            return _database.pgPool.query("UPDATE mschildren SET\n  nickname = $1,\n  gender = $2,\n  address = $3,father = $4,mother = $5,\n  school = $6,\n  parentphone = $7,\n  imgloc = $8,\n  graduated = $9,\n  birthdate = $10',\n  status = 'A',\n  registered_at = $11\n  where id = $12", [nickname, gender, address, father, mother, school, parentphone, imgloc, graduated, birthdate, registered_at, editingId]);

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
            return _database.pgPool.query("update mschildren set status='D'\n  where id=$1", [editingId]);

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
//# sourceMappingURL=children.js.map