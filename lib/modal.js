'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _button = require('antd/lib/button');

var _button2 = _interopRequireDefault(_button);

var _isObject2 = require('lodash/isObject');

var _isObject3 = _interopRequireDefault(_isObject2);

var _has2 = require('lodash/has');

var _has3 = _interopRequireDefault(_has2);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

require('antd/lib/button/style/css');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _base = require('./base');

var _base2 = _interopRequireDefault(_base);

require('../styles/modal.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Modal = (_temp = _class = function (_PureComponent) {
  _inherits(Modal, _PureComponent);

  function Modal(props) {
    _classCallCheck(this, Modal);

    var _this = _possibleConstructorReturn(this, (Modal.__proto__ || Object.getPrototypeOf(Modal)).call(this, props));

    _this.state = {
      loading: false
    };

    _this._Modal = null;
    _this.handleOnOk = _this.handleOnOk.bind(_this);
    _this.handleOnCancel = _this.handleOnCancel.bind(_this);
    return _this;
  }

  _createClass(Modal, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          width = _props.width,
          height = _props.height,
          children = _props.children,
          visible = _props.visible,
          title = _props.title,
          maskClosable = _props.maskClosable,
          okText = _props.okText,
          cancelText = _props.cancelText,
          onCancel = _props.onCancel,
          tips = _props.tips,
          footer = _props.footer;

      var options = {
        ref: function ref(view) {
          return _this2._Modal = view;
        },
        visible: visible,
        maskClosable: maskClosable,
        onAfterOpen: function onAfterOpen() {
          return null;
        },
        onRequestClose: onCancel,
        width: width || 520,
        minHeight: height,
        maxHeight: height,
        padding: 0
      };
      var footerElements = footer && footer.map(function (item, i) {
        var itemElement = item;
        if (!(0, _has3.default)(itemElement, 'key') || !itemElement['key']) {
          itemElement = _extends({}, item, {
            key: i
          });
        }
        return itemElement;
      });
      return _react2.default.createElement(
        _base2.default,
        options,
        _react2.default.createElement(
          'div',
          { className: 'ant-modal-content' },
          _react2.default.createElement(
            'button',
            { className: 'ant-modal-close', 'aria-label': 'Close', onClick: this.handleOnCancel },
            _react2.default.createElement('span', { className: 'ant-modal-close-x' })
          ),
          _react2.default.createElement(
            'div',
            { className: 'ant-modal-header' },
            _react2.default.createElement(
              'div',
              { className: 'ant-modal-title' },
              title
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'ant-modal-body', style: { height: height ? options.minHeight - 107 : 'auto', overflowY: 'auto' } },
            children
          ),
          _react2.default.createElement(
            'div',
            { className: 'ant-modal-footer' },
            _react2.default.createElement(
              'div',
              { className: 'ant-modal-tips' },
              tips
            ),
            _react2.default.createElement(
              'div',
              { className: 'ant-modal-btns' },
              footerElements || [_react2.default.createElement(
                _button2.default,
                {
                  key: 'cancel',
                  onClick: this.handleOnCancel
                },
                cancelText
              ), _react2.default.createElement(
                _button2.default,
                {
                  key: 'ok',
                  type: 'primary',
                  loading: this.state.loading,
                  onClick: this.handleOnOk
                },
                okText
              )]
            )
          )
        )
      );
    }
  }, {
    key: 'handleOnOk',
    value: function handleOnOk(e) {
      var _this3 = this;

      var onOk = this.props.onOk;
      if (onOk) {
        var result = onOk(e);
        var isPromise = (0, _isObject3.default)(result) && (0, _has3.default)(result.__proto__, 'then');
        if (!isPromise) {
          return; //this._Modal && this._Modal.handleRequestClose()
        }
        this.setState({ loading: true });
        result.then(function (ret) {
          _this3.setState({ loading: false }, function () {
            if ((0, _has3.default)(ret, 'close') && ret.close) {
              _this3._Modal && _this3._Modal.handleRequestClose();
            }
          });
        }).catch(function (err) {
          _this3.setState({ loading: false });
        });
      }
    }
  }, {
    key: 'handleOnCancel',
    value: function handleOnCancel(e) {
      this._Modal && this._Modal.handleRequestClose();
    }
  }]);

  return Modal;
}(_react.PureComponent), _class.propTypes = {
  children: _propTypes2.default.any,
  visible: _propTypes2.default.bool,
  title: _propTypes2.default.string,
  width: _propTypes2.default.number,
  height: _propTypes2.default.number,
  maskClosable: _propTypes2.default.bool,
  okText: _propTypes2.default.string,
  cancelText: _propTypes2.default.string,
  onOk: _propTypes2.default.func,
  onCancel: _propTypes2.default.func,
  tips: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.element]),
  footer: _propTypes2.default.arrayOf(_propTypes2.default.element)
}, _class.defaultProps = {
  children: null,
  visible: false,
  title: '',
  width: null,
  height: null,
  maskClosable: true,
  okText: 'OK',
  cancelText: 'Cancel',
  onOk: function onOk() {
    return null;
  },
  onCancel: function onCancel() {
    return null;
  },
  tips: null,
  footer: null
}, _temp);
exports.default = Modal;