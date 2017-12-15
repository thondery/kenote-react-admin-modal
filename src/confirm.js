import React, { PureComponent } from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import PropTypes from 'prop-types'
import ModalBase from './base'
import { Button, Icon } from 'antd'
import '../styles/modal.css'
import _ from 'lodash'

const confirmStyle = {
  ['info']         : { theme: 'ant-confirm-info', icon: <Icon type="info-circle" /> },
  ['warning']      : { theme: 'ant-confirm-warning', icon: <Icon type="exclamation-circle" /> },
  ['success']      : { theme: 'ant-confirm-success', icon: <Icon type="check-circle" /> },
  ['error']        : { theme: 'ant-confirm-error', icon: <Icon type="cross-circle" /> },
  ['confirm']      : { theme: 'ant-confirm-confirm', icon: <Icon type="question-circle" /> },
}

class Modal extends PureComponent {

  static propTypes = {
    type: PropTypes.oneOf(['confirm', 'info', 'warning', 'success', 'error']),
    title: PropTypes.string,
    content: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    width: PropTypes.number,
    height: PropTypes.number,
    okText: PropTypes.string,
    cancelText: PropTypes.string,
    onOk: PropTypes.func,
    onCancel: PropTypes.func
  }

  static defaultProps = {
    type: 'info',
    title: '',
    content: '',
    width: null,
    height: null,
    okText: 'OK',
    cancelText: 'Cancel',
    onOk: () => null,
    onCancel: () => null
  }
  
  state = {
    visible: false,
    loading: false
  }

  constructor (props) {
    super(props)
    this._Modal = null
    this.handleOnOk = this.handleOnOk.bind(this)
    this.handleOnCancel = this.handleOnCancel.bind(this)
  }

  componentDidMount () {
    this.setState({ visible: true })
  }

  render () {
    const { width, height, type, title, content, okText, cancelText } = this.props
    const options = {
      ref: view => this._Modal = view,
      visible: this.state.visible,
      maskClosable: false,
      onAfterOpen: () => null,
      onRequestClose: () => {
        this.setState({ visible: false }, () => this.props.onRequestClose())
      },
      width: width || 416,
      minHeight: height || 169,
      maxHeight: height || 231
    }
    const setting = confirmStyle[type]
    return (
      <ModalBase {...options}>
        <div className={`ant-modal-body ${setting.theme}`}>
          <div className="ant-confirm-body-wrapper">
            <div className="ant-confirm-body">
              {setting.icon}
              <span className="ant-confirm-title">{title}</span>
              <div className="ant-confirm-content" style={{ 
                maxHeight: options.maxHeight - 147,
                minHeight: options.minHeight - 147
              }}>
                {content}
              </div>
            </div>
            <div className="ant-confirm-btns">
              {type === 'confirm' && (
                <Button
                  //size="large"
                  //type="primary"
                  onClick={this.handleOnCancel}  
                  >
                  {cancelText}
                </Button>
              )}
              <Button
                //size="large"
                type="primary"
                loading={this.state.loading}
                onClick={this.handleOnOk}  
                >
                {okText}
              </Button>
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
        return this._Modal && this._Modal.handleRequestClose()
      }
      this.setState({ loading: true })
      result.then( ret => {
        this.setState({ loading: false }, () => {
          this._Modal && this._Modal.handleRequestClose()
        })
      })
    }
  }
  
  handleOnCancel (e) {
    let onCancel = this.props.onCancel
    if (onCancel) {
      onCancel(e)
      this._Modal && this._Modal.handleRequestClose()
    }
  }
}

export default (config) => {
  var divRoot = document.createElement('div')
  document.body.appendChild(divRoot)
  function close() {
    var unmountResult = unmountComponentAtNode(divRoot)
    if (unmountResult && divRoot.parentNode) {
      divRoot.parentNode.removeChild(divRoot)
    }
  }

  render(
    <Modal {...config}
      onRequestClose={ () => {
        close()
      }} 
      />,
    divRoot
  )
}