"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Producto = /*#__PURE__*/function () {
  function Producto() {
    _classCallCheck(this, Producto);

    this.productos = [];
  }

  _createClass(Producto, [{
    key: "readbyid",
    value: function readbyid(id) {
      return this.productos.find(function (producto) {
        return producto.id == id;
      });
    }
  }, {
    key: "update",
    value: function update(dato, id) {
      if (!dato.title || !dato.price || !dato.thumbnail || typeof dato.title != 'string' || //utilizar raw desde postman para insertar datos con price 'numbre'. Sino arroja error.
      //typeof dato.price != 'number' ||
      typeof dato.thumbnail != 'string') {
        return 'error';
      }

      ;

      if (id < 1 || id > this.productos.length) {
        return 'outOfRange';
      }

      var indice = this.productos.findIndex(function (data) {
        return data.id == id;
      });
      dato['id'] = id;
      var dato2 = {
        id: id,
        title: dato.title,
        price: parseInt(dato.price),
        thumbnail: dato.thumbnail
      }; //console.log(this.productos[indice])

      this.productos[indice] = dato2;
      return this.productos;
    }
  }, {
    key: "savedata",
    value: function savedata(dato) {
      if (!dato.title || !dato.price || !dato.thumbnail || typeof dato.title != 'string' || //utilizar raw desde postman para insertar datos con price 'numbre'. Sino arroja error.
      //typeof dato.price != 'number' ||
      typeof dato.thumbnail != 'string') {
        return 'error';
      }

      ;
      var producto = {
        id: this.productos.length + 1,
        title: dato.title,
        price: parseInt(dato.price),
        thumbnail: dato.thumbnail
      };
      this.productos.push(producto);
      return producto;
    }
  }, {
    key: "readlist",
    value: function readlist() {
      return this.productos;
    }
  }, {
    key: "borrar",
    value: function borrar(id) {
      var indice = this.productos.findIndex(function (data) {
        return data.id == id;
      });

      if (id < 1 || id > this.productos.length) {
        return 'outOfRange';
      }

      console.log(indice);
      this.productos.splice(indice, 1);
      return this.productos;
    }
  }]);

  return Producto;
}();

var _default = Producto;
exports["default"] = _default;