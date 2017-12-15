import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import ModalBase from './base'
import { Button, Icon } from 'antd'
import '../styles/modal.css'
import _ from 'lodash'

export default class Modal extends PureComponent {
  
  static propTypes = {
    children: PropTypes.any,
    visible: PropTypes.bool,
    title: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
    maskClosable: PropTypes.bool,
    okText: PropTypes.string,
    cancelText: PropTypes.string,
    onOk: PropTypes.func,
    onCancel: PropTypes.func,
    tips: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    footer: PropTypes.arrayOf(PropTypes.element)
  }

  static defaultProps = {
    children: null,
    visible: false,
    title: '',
    width: null,
    height: null,
    maskClosable: true,
    okText: 'OK',
    cancelText: 'Cancel',
    onOk: () => null,
    onCancel: () => null,
    tips: null,
    footer: null
  }

  state = {
    loading: false
  }
  
  constructor (props) {
    super(props)
    this._Modal = null
    this.handleOnOk = this.handleOnOk.bind(this)
    this.handleOnCancel = this.handleOnCancel.bind(this)
  }

  render () {
    const { width, height, children, visible, title, maskClosable, okText, cancelText, onCancel, tips, footer } = this.props
    const options = {
      ref: view => this._Modal = view,
      visible: visible,
      maskClosable: maskClosable,
      onAfterOpen: () => null,
      onRequestClose: onCancel,
      width: width || 520,
      minHeight: height,
      maxHeight: height,
      padding: 0
    }
    const footerElements = footer && footer.map((item, i) => {
      let itemElement = item
      if (!_.has(itemElement, 'key') || !itemElement['key']) {
        itemElement = {
          ...item,
          key: i
        }
      }
      return itemElement
    })
    return (
      <ModalBase {...options}>
        <div className="ant-modal-content">
          <button className="ant-modal-close" aria-label="Close" onClick={this.handleOnCancel}>
            <span className="ant-modal-close-x" />
          </button>
          <div className="ant-modal-header">
            <div className="ant-modal-title">{title}</div>
          </div>
          <div className="ant-modal-body" style={{ height: height ? options.minHeight - 107 : 'auto', overflowY: 'auto' }}>
            {children}
          </div>
          <div className="ant-modal-footer">
            <div className="ant-modal-tips">{tips}</div>
            <div className="ant-modal-btns">
              {footerElements || [
                <Button
                  key="cancel"
                  onClick={this.handleOnCancel}  
                  >
                  {cancelText}
                </Button>,
                <Button
                  key="ok"
                  type="primary"
                  loading={this.state.loading}
                  onClick={this.handleOnOk}  
                  >
                  {okText}
                </Button>
              ]}
            </div>
          </div>
        </div>
      </ModalBase>
    )
  }
  
  handleOnOk (e) {
    let onOk = this.props.onOk
    if (onOk) {
      let result = onOk(e)
      let isPromise = _.isObject(result) && _.has(result.__proto__, 'then')
      if (!isPromise) {
        return //this._Modal && this._Modal.handleRequestClose()
      }
      this.setState({ loading: true })
      result.then( ret => {
        this.setState({ loading: false }, () => {
          if (_.has(ret, 'close') && ret.close) {
            this._Modal && this._Modal.handleRequestClose()
          }
        })
      })
      .catch( err => {
        this.setState({ loading: false })
      })
    }
  }
  
  handleOnCancel (e) {
    this._Modal && this._Modal.handleRequestClose()
  }
}