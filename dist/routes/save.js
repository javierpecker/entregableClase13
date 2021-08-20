"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _productos = _interopRequireDefault(require("../productos"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * DATOS A MANIPULAR
 */
var router = _express["default"].Router();

var miProducto = new _productos["default"]();
router.post('/productos/guardar', function (req, res) {
  var body = req.body;
  var producto = miProducto.savedata(body);

  if (producto == 'error') {
    return res.status(400).json({
      msg: 'Necesito en el body title, price and thumbnail'
    });
  }

  res.json({
    producto: producto
  });
});
var _default = router;
exports["default"] = _default;