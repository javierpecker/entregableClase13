"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Product = /*#__PURE__*/function () {
  function Product() {
    _classCallCheck(this, Product);

    _defineProperty(this, "productos", void 0);

    this.productos = [];
  }

  _createClass(Product, [{
    key: "readlist",
    value: function readlist() {
      return this.productos;
    }
  }, {
    key: "readbyid",
    value: function readbyid(id) {
      return this.productos.find(function (producto) {
        return producto.id == id;
      });
    }
  }, {
    key: "savedata",
    value: function savedata(dato) {
      console.log(dato); //valido que los datos ingresados sean coherentes

      if (!dato.title || !dato.price || !dato.thumbnail || typeof dato.title != 'string' || //utilizar raw desde postman para insertar datos con price 'numbre'. Sino arroja error.
      typeof dato.price != 'number' || typeof dato.thumbnail != 'string') {
        return 'error';
      }

      ;
      var producto = {
        id: this.productos.length + 1,
        tittle: dato.title,
        price: dato.price,
        thumbnail: dato.thumbnail
      };
      this.productos.push(producto);
      return producto;
    }
  }]);

  return Product;
}();

var _default = Product;
exports["default"] = _default;