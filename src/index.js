import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Modal from './modal'
import confirm from './confirm'

Modal.info = (options) => {
  confirm({
    type: 'info',
    ...options
  })
}

Modal.warn = Modal.warning = (options) => {
  confirm({
    type: 'warning',
    ...options
  })
}

Modal.success = (options) => {
  confirm({
    type: 'success',
    ...options
  })
}

Modal.error = (options) => {
  confirm({
    type: 'error',
    ...options
  })
}

Modal.confirm = (options) => {
  confirm({
    type: 'confirm',
    ...options
  })
}

export default Modal