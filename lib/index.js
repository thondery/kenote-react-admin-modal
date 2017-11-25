'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var KenoteLayout = (_temp = _class = function (_PureComponent) {
  _inherits(KenoteLayout, _PureComponent);

  function KenoteLayout() {
    _classCallCheck(this, KenoteLayout);

    return _possibleConstructorReturn(this, (KenoteLayout.__proto__ || Object.getPrototypeOf(KenoteLayout)).apply(this, arguments));
  }

  _createClass(KenoteLayout, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          name = _props.name,
          children = _props.children;

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'p',
          null,
          'name: ',
          name || 'test'
        ),
        children
      );
    }
  }]);

  return KenoteLayout;
}(_react.PureComponent), _class.propTypes = {
  name: _propTypes2.default.string,
  children: _propTypes2.default.node
}, _class.defaultProps = {
  name: 'test',
  children: null
}, _temp);
exports.default = KenoteLayout;