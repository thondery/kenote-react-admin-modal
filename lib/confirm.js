'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _button = require('antd/lib/button');

var _button2 = _interopRequireDefault(_button);

var _icon = require('antd/lib/icon');

var _icon2 = _interopRequireDefault(_icon);

var _has2 = require('lodash/has');

var _has3 = _interopRequireDefault(_has2);

var _isObject2 = require('lodash/isObject');

var _isObject3 = _interopRequireDefault(_isObject2);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _confirmStyle, _class, _temp;

require('antd/lib/button/style/css');

require('antd/lib/icon/style/css');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _base = require('./base');

var _base2 = _interopRequireDefault(_base);

require('../styles/modal.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var confirmStyle = (_confirmStyle = {}, _defineProperty(_confirmStyle, 'info', { theme: 'ant-confirm-info', icon: _react2.default.createElement(_icon2.default, { type: 'info-circle' }) }), _defineProperty(_confirmStyle, 'warning', { theme: 'ant-confirm-warning', icon: _react2.default.createElement(_icon2.default, { type: 'exclamation-circle' }) }), _defineProperty(_confirmStyle, 'success', { theme: 'ant-confirm-success', icon: _react2.default.createElement(_icon2.default, { type: 'check-circle' }) }), _defineProperty(_confirmStyle, 'error', { theme: 'ant-confirm-error', icon: _react2.default.createElement(_icon2.default, { type: 'cross-circle' }) }), _defineProperty(_confirmStyle, 'confirm', { theme: 'ant-confirm-confirm', icon: _react2.default.createElement(_icon2.default, { type: 'question-circle' }) }), _confirmStyle);

var Modal = (_temp = _class = function (_PureComponent) {
  _inherits(Modal, _PureComponent);

  function Modal(props) {
    _classCallCheck(this, Modal);

    var _this = _possibleConstructorReturn(this, (Modal.__proto__ || Object.getPrototypeOf(Modal)).call(this, props));

    _this.state = {
      visible: false,
      loading: false
    };

    _this._Modal = null;
    _this.handleOnOk = _this.handleOnOk.bind(_this);
    _this.handleOnCancel = _this.handleOnCancel.bind(_this);
    return _this;
  }

  _createClass(Modal, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.setState({ visible: true });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          width = _props.width,
          height = _props.height,
          type = _props.type,
          title = _props.title,
          content = _props.content,
          okText = _props.okText,
          cancelText = _props.cancelText;

      var options = {
        ref: function ref(view) {
          return _this2._Modal = view;
        },
        visible: this.state.visible,
        maskClosable: false,
        onAfterOpen: function onAfterOpen() {
          return null;
        },
        onRequestClose: function onRequestClose() {
          _this2.setState({ visible: false }, function () {
            return _this2.props.onRequestClose();
          });
        },
        width: width || 416,
        minHeight: height || 169,
        maxHeight: height || 231
      };
      var setting = confirmStyle[type];
      return _react2.default.createElement(
        _base2.default,
        options,
        _react2.default.createElement(
          'div',
          { className: 'ant-modal-body ' + setting.theme },
          _react2.default.createElement(
            'div',
            { className: 'ant-confirm-body-wrapper' },
            _react2.default.createElement(
              'div',
              { className: 'ant-confirm-body' },
              setting.icon,
              _react2.default.createElement(
                'span',
                { className: 'ant-confirm-title' },
                title
              ),
              _react2.default.createElement(
                'div',
                { className: 'ant-confirm-content', style: {
                    maxHeight: options.maxHeight - 147,
                    minHeight: options.minHeight - 147
                  } },
                content
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'ant-confirm-btns' },
              type === 'confirm' && _react2.default.createElement(
                _button2.default,
                {
                  //size="large"
                  //type="primary"
                  onClick: this.handleOnCancel
                },
                cancelText
              ),
              _react2.default.createElement(
                _button2.default,
                {
                  //size="large"
                  type: 'primary',
                  loading: this.state.loading,
                  onClick: this.handleOnOk
                },
                okText
              )
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
          return this._Modal && this._Modal.handleRequestClose();
        }
        this.setState({ loading: true });
        result.then(function (ret) {
          _this3.setState({ loading: false }, function () {
            _this3._Modal && _this3._Modal.handleRequestClose();
          });
        });
      }
    }
  }, {
    key: 'handleOnCancel',
    value: function handleOnCancel(e) {
      var onCancel = this.props.onCancel;
      if (onCancel) {
        onCancel(e);
        this._Modal && this._Modal.handleRequestClose();
      }
    }
  }]);

  return Modal;
}(_react.PureComponent), _class.propTypes = {
  type: _propTypes2.default.oneOf(['confirm', 'info', 'warning', 'success', 'error']),
  title: _propTypes2.default.string,
  content: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.element]),
  width: _propTypes2.default.number,
  height: _propTypes2.default.number,
  okText: _propTypes2.default.string,
  cancelText: _propTypes2.default.string,
  onOk: _propTypes2.default.func,
  onCancel: _propTypes2.default.func
}, _class.defaultProps = {
  type: 'info',
  title: '',
  content: '',
  width: null,
  height: null,
  okText: 'OK',
  cancelText: 'Cancel',
  onOk: function onOk() {
    return null;
  },
  onCancel: function onCancel() {
    return null;
  }
}, _temp);

exports.default = function (config) {
  var divRoot = document.createElement('div');
  document.body.appendChild(divRoot);
  function close() {
    var unmountResult = (0, _reactDom.unmountComponentAtNode)(divRoot);
    if (unmountResult && divRoot.parentNode) {
      divRoot.parentNode.removeChild(divRoot);
    }
  }

  (0, _reactDom.render)(_react2.default.createElement(Modal, _extends({}, config, {
    onRequestClose: function onRequestClose() {
      close();
    }
  })), divRoot);
};