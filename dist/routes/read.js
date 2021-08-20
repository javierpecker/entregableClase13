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

var miProducto2 = new _productos["default"]();
router.get('/productos/listar', function (req, res) {
  var data = miProducto2.readlist();

  if (data.length == 0) {
    res.json({
      msg: 'no hay productos cargados'
    });
  }

  res.json({
    data: data
  });
});
router.get('/productos/listar/:id', function (req, res) {
  var id = req.params.id;
  var data = miProducto2.readbyid(id);

  if (!data) {
    res.json({
      msg: 'Error producto no encontrado'
    });
  }

  res.json({
    data: data
  });
});
router.post('/productos/guardar', function (req, res) {
  var body = req.body;
  var producto = miProducto2.savedata(body);

  if (producto == 'error') {
    return res.status(400).json({
      msg: 'Necesito en el body title, price and thumbnail'
    });
  }

  res.json({
    producto: producto
  });
});
router.put('/productos/actualizar/:id', function (req, res) {
  var id = parseInt(req.params.id);
  var dato = req.body;
  var producto = miProducto2.update(dato, id);

  if (producto == 'error') {
    return res.status(400).json({
      msg: 'Necesito en el body title, price and thumbnail'
    });
  }

  if (producto == 'outOfRange') {
    return res.status(400).json({
      msg: 'indice fuera de rango'
    });
  }

  res.json({
    producto: producto
  });
});
router["delete"]('/productos/borrar/:id', function (req, res) {
  var id = parseInt(req.params.id);
  var producto = miProducto2.borrar(id);

  if (producto == 'outOfRange') {
    return res.status(400).json({
      msg: 'indice fuera de rango'
    });
  }

  res.json({
    producto: producto
  });
});
var _default = router;
exports["default"] = _default;