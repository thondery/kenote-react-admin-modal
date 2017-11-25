
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

export default class KenoteLayout extends PureComponent {

  static propTypes = {
    name: PropTypes.string,
    children: PropTypes.node
  }

  static defaultProps = {
    name: 'test',
    children: null
  }

  render () {
    const { name, children } = this.props
    return (
      <div>
        <p>name: {name || 'test'}</p>
        {children}
      </div>
    )
  }
}