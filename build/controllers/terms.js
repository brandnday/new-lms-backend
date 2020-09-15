'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deactivate = exports.update = exports.add = exports.list = undefined;

var _database = require('../services/database');

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var isActive = 'status = \'A\'';
var list = exports.list = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(ctx) {
    var churchid, mainQuery, res;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            churchid = ctx.request.body.requestData.churchid;
            mainQuery = 'from trterms \n  where churchid = $1\n  AND ' + isActive;
            _context.next = 4;
            return _database.pgPool.query('select id,termname,startdate,enddate ' + mainQuery + '\n    ORDER BY id', [churchid]);

          case 4:
            res = _context.sent;

            ctx.ok({ response: { rows: res.rows } });

          case 6:
          case 'end':
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
    var _ctx$request$body$req, startdate, enddate, churchid, termname, res;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _ctx$request$body$req = ctx.request.body.requestData, startdate = _ctx$request$body$req.startdate, enddate = _ctx$request$body$req.enddate, churchid = _ctx$request$body$req.churchid;
            termname = (0, _moment2.default)(startdate).format('YYYY') + '/' + (0, _moment2.default)(enddate).format('YYYY');
            _context2.next = 4;
            return _database.pgPool.query('INSERT INTO trterms(termname,startdate,enddate,churchid,status)\n  values($1,$2,$3,$4,\'A\')', [termname, startdate, enddate, churchid]);

          case 4:
            res = _context2.sent;

            ctx.ok({ response: res.rows });

          case 6:
          case 'end':
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
    var _ctx$request$body$req2, startdate, enddate, editingId, termname, res;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _ctx$request$body$req2 = ctx.request.body.requestData, startdate = _ctx$request$body$req2.startdate, enddate = _ctx$request$body$req2.enddate, editingId = _ctx$request$body$req2.editingId;
            termname = (0, _moment2.default)(startdate).format('YYYY') + '/' + (0, _moment2.default)(enddate).format('YYYY');
            _context3.next = 4;
            return _database.pgPool.query('UPDATE trterms SET\n  termname = $1,\n  startdate = $2,\n  enddate = $3\n  where id = $4', [termname, startdate, enddate, editingId]);

          case 4:
            res = _context3.sent;

            ctx.ok({ response: res.rows });

          case 6:
          case 'end':
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
            return _database.pgPool.query('update trterms set status=\'D\'\n  where id=$1', [editingId]);

          case 3:
            res = _context4.sent;

            ctx.ok({ response: res.rows });

          case 5:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  }));

  return function deactivate(_x4) {
    return _ref4.apply(this, arguments);
  };
}();
//# sourceMappingURL=terms.js.map