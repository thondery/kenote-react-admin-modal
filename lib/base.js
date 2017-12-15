'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactModal = require('react-modal');

var _reactModal2 = _interopRequireDefault(_reactModal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var customStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(55, 55, 55, 0.6)',
    opacity: 0,
    transition: 'all .5s',
    zIndex: 2
  },
  content: {
    top: '20%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%) scale(.1)',
    //transform: 'scale(1.2)',
    borderRadius: 4,
    border: 0,
    boxShadow: '0 2px 8px rgba(0,0,0,.2)',
    transition: 'all .5s',
    opacity: 0,
    overflow: 'hidden'

  }
};

var ModalBase = (_temp = _class = function (_PureComponent) {
  _inherits(ModalBase, _PureComponent);

  function ModalBase(props) {
    _classCallCheck(this, ModalBase);

    var _this = _possibleConstructorReturn(this, (ModalBase.__proto__ || Object.getPrototypeOf(ModalBase)).call(this, props));

    _this.state = {
      overlayStyle: null,
      contentStyle: null
    };

    _this.handleAfterOpen = _this.handleAfterOpen.bind(_this);
    _this.handleRequestClose = _this.handleRequestClose.bind(_this);
    return _this;
  }

  _createClass(ModalBase, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          children = _props.children,
          className = _props.className,
          maskClosable = _props.maskClosable,
          visible = _props.visible,
          getContainer = _props.getContainer,
          onRequestClose = _props.onRequestClose,
          onAfterOpen = _props.onAfterOpen,
          width = _props.width,
          minHeight = _props.minHeight,
          maxHeight = _props.maxHeight,
          padding = _props.padding;

      var styles = {
        overlay: _extends({}, customStyles.overlay, this.state.overlayStyle),
        content: _extends({}, customStyles.content, this.state.contentStyle, {
          width: width,
          minHeight: minHeight,
          maxHeight: maxHeight,
          padding: padding
        })
      };
      return _react2.default.createElement(
        _reactModal2.default,
        {
          contentLabel: 'Example Modal',
          role: 'dialog',
          className: className,
          style: styles,
          shouldCloseOnOverlayClick: maskClosable,
          isOpen: visible,
          parentSelector: getContainer,
          onRequestClose: this.handleRequestClose,
          onAfterOpen: this.handleAfterOpen,
          ariaHideApp: false
        },
        children
      );
    }
  }, {
    key: 'handleAfterOpen',
    value: function handleAfterOpen() {
      var _this2 = this;

      this.setState({
        overlayStyle: {
          opacity: 1
        },
        contentStyle: {
          top: '50%',
          transform: 'translate(-50%, -50%) scale(1)',
          opacity: 1
        }
      }, function () {
        return _this2.props.onAfterOpen();
      });
    }
  }, {
    key: 'handleRequestClose',
    value: function handleRequestClose() {
      var _this3 = this;

      this.setState({ contentStyle: null }, function () {
        setTimeout(function () {
          return _this3.props.onRequestClose();
        }, 500);
      });
    }
  }]);

  return ModalBase;
}(_react.PureComponent), _class.propTypes = {
  children: _propTypes2.default.any,
  className: _propTypes2.default.string,
  maskClosable: _propTypes2.default.bool, // 点击蒙层是否允许关闭
  visible: _propTypes2.default.bool, // 对话框是否可见
  getContainer: _propTypes2.default.func, // 指定 Modal 挂载的 HTML 节点
  onRequestClose: _propTypes2.default.func, // 关闭 Modal 事件
  onAfterOpen: _propTypes2.default.func, // 打开 Modal 后执行事件
  width: _propTypes2.default.number,
  minHeight: _propTypes2.default.number,
  maxHeight: _propTypes2.default.number,
  padding: _propTypes2.default.number
}, _class.defaultProps = {
  children: null,
  className: undefined,
  maskClosable: false,
  visible: false,
  getContainer: function getContainer() {
    return document.body;
  },
  onRequestClose: function onRequestClose() {
    return null;
  },
  onAfterOpen: function onAfterOpen() {
    return null;
  },
  width: 'auto',
  minHeight: 'auto',
  maxHeight: 'auto',
  padding: 20
}, _temp);
exports.default = ModalBase;