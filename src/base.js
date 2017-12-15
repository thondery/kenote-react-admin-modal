import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import ReactModal from 'react-modal'

const customStyles = {
  overlay : {
    position          : 'fixed',
    top               : 0,
    left              : 0,
    right             : 0,
    bottom            : 0,
    backgroundColor   : 'rgba(55, 55, 55, 0.6)',
    opacity           : 0,
    transition        : 'all .5s',
    zIndex            : 2
  },
  content : {
    top                   : '20%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%) scale(.1)',
    //transform: 'scale(1.2)',
    borderRadius          : 4,
    border                : 0,
    boxShadow             : '0 2px 8px rgba(0,0,0,.2)',
    transition            : 'all .5s',
    opacity               : 0,
    overflow              : 'hidden'

  }
}

export default class ModalBase extends PureComponent {
  
  static propTypes = {
    children: PropTypes.any,
    className: PropTypes.string,
    maskClosable: PropTypes.bool,   // 点击蒙层是否允许关闭
    visible: PropTypes.bool,        // 对话框是否可见
    getContainer: PropTypes.func,   // 指定 Modal 挂载的 HTML 节点
    onRequestClose: PropTypes.func, // 关闭 Modal 事件
    onAfterOpen: PropTypes.func,    // 打开 Modal 后执行事件
    width: PropTypes.number,
    minHeight: PropTypes.number,
    maxHeight: PropTypes.number,
    padding: PropTypes.number
  }
  
  static defaultProps = {
    children: null,
    className: undefined,
    maskClosable: false,
    visible: false,
    getContainer: () => document.body,
    onRequestClose: () => null,
    onAfterOpen: () => null,
    width: 'auto',
    minHeight: 'auto',
    maxHeight: 'auto',
    padding: 20
  }

  state = {
    overlayStyle: null,
    contentStyle: null
  }

  constructor (props) {
    super(props)
    this.handleAfterOpen = this.handleAfterOpen.bind(this)
    this.handleRequestClose = this.handleRequestClose.bind(this)
  }

  render () {
    const { 
      children, 
      className, 
      maskClosable, 
      visible, 
      getContainer, 
      onRequestClose, 
      onAfterOpen, 
      width, 
      minHeight, 
      maxHeight,
      padding
    } = this.props
    let styles = {
      overlay: {
        ...customStyles.overlay,
        ...this.state.overlayStyle,
      },
      content: {
        ...customStyles.content,
        ...this.state.contentStyle,
        width,
        minHeight, 
        maxHeight,
        padding
      }
    }
    return (
      <ReactModal
        contentLabel="Example Modal"
        role="dialog"
        className={className}
        style={styles}
        shouldCloseOnOverlayClick={maskClosable}
        isOpen={visible}
        parentSelector={getContainer}
        onRequestClose={this.handleRequestClose}
        onAfterOpen={this.handleAfterOpen}
        ariaHideApp={false}
        >
        {children}
      </ReactModal>
    )
  }

  handleAfterOpen () {
    this.setState({
      overlayStyle: {
        opacity: 1,
      },
      contentStyle: {
        top: '50%',
        transform: 'translate(-50%, -50%) scale(1)',
        opacity: 1
      }
    }, () => this.props.onAfterOpen())
  }

  handleRequestClose () {
    this.setState({ contentStyle: null }, () => {
      setTimeout( () => this.props.onRequestClose(), 500)
    })
  }
}