'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _modal = require('./modal');

var _modal2 = _interopRequireDefault(_modal);

var _confirm = require('./confirm');

var _confirm2 = _interopRequireDefault(_confirm);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_modal2.default.info = function (options) {
  (0, _confirm2.default)(_extends({
    type: 'info'
  }, options));
};

_modal2.default.warn = _modal2.default.warning = function (options) {
  (0, _confirm2.default)(_extends({
    type: 'warning'
  }, options));
};

_modal2.default.success = function (options) {
  (0, _confirm2.default)(_extends({
    type: 'success'
  }, options));
};

_modal2.default.error = function (options) {
  (0, _confirm2.default)(_extends({
    type: 'error'
  }, options));
};

_modal2.default.confirm = function (options) {
  (0, _confirm2.default)(_extends({
    type: 'confirm'
  }, options));
};

exports.default = _modal2.default;