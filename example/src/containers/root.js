
import React, { PureComponent } from 'react'
import { Button, Form, Input, Icon } from 'antd'
import Modal from '../../../lib'
import '../styles/root.scss'

const FormItem = Form.Item

export default class Root extends PureComponent {

  state = {
    visible: false,
    loading: false
  }

  constructor (props) {
    super(props)
    this._Modal = null
  }

  render () {
    return (
      <div className={'rootWrapper'}>
        <Button
          onClick={ () => {
            Modal.info({
              title: 'ddd',
              content: (
                <div>
                  <p>some messages...some messages...</p>
                  <p>some messages...some messages...</p>
                  <p>some messages...some messages...</p>
                  <p>some messages...some messages...</p>
                  <p>some messages...some messages...</p>
                  <p>some messages...some messages...</p>
                  <p>some messages...some messages...</p>
                  <p>some messages...some messages...</p>
                </div>
              )
            })
          }}>
          Info
        </Button>
        <Button 
          onClick={() => Modal.warn({
            title: 'This is a notification message',
            content: (
              <div>
                <p>some messages...some messages...</p>
                <p>some messages...some messages...</p>
              </div>
            )
          })}
          >
          Warning
        </Button>
        <Button 
          onClick={() => Modal.success({
            title: 'This is a notification message',
            content: (
              <div>
                <p>some messages...some messages...</p>
                <p>some messages...some messages...</p>
              </div>
            )
          })}
          >
          Success
        </Button>
        <Button 
          onClick={() => Modal.error({
            title: 'This is a notification message',
            content: (
              <div>
                <p>some messages...some messages...</p>
                <p>some messages...some messages...</p>
              </div>
            )
          })}
          >
          Error
        </Button>
        <Button 
          onClick={() => Modal.confirm({
            title: 'This is a notification message',
            content: (
              <div>
                <p>some messages...some messages...</p>
                <p>some messages...some messages...</p>
              </div>
            ),
            onOk() {
              console.log('ok')
            },
            onCancel() {
              console.log('cancel')
            }
          })}
          >
          Confirm
        </Button>
        <Button 
          onClick={() => Modal.confirm({
            title: 'This is a notification message',
            content: (
              <div>
                <p>some messages...some messages...</p>
                <p>some messages...some messages...</p>
              </div>
            ),
            onOk() {
              //console.log('ok', e)
              return new Promise((resolve, reject) => {
                setTimeout(() => resolve('ok'), 1000)
              })
            },
            onCancel() {
              console.log('cancel')
            }
          })}
          >
          Async Confirm
        </Button>
        <Button 
          onClick={() => this.setState({ visible: true })}
          >
          Open Modal
        </Button>

        <Modal
          ref={view => this._Modal = view}
          visible={this.state.visible}
          title="Basic Modal"
          maskClosable={false}
          height={300}
          onCancel={ () => this.setState({ visible: false })}
          onOk={ () => {
            return new Promise((resolve, reject) => {
              setTimeout(() => resolve('ok'), 1000)
            })
            .then( ret => {
              this._Modal.handleOnCancel()
            })
          }}
          //tips={'福建警方空空泛泛。。。'}
          tips={(
            <div>tips 提示语句。。。</div>
          )}
          footer={[
            <Button
              onClick={() => this._Modal.handleOnCancel()}
              >
              取消
            </Button>,
            <Button
              type="primary"
              loading={this.state.loading}
              onClick={() => {
                this.setState({ loading: true })
                return new Promise((resolve, reject) => {
                  setTimeout(() => resolve('ok'), 1000)
                })
                .then( ret => {
                  this.setState({ loading: false })
                  this._Modal.handleOnCancel()
                })
              }}
              >
              确定
            </Button>
          ]}
          >
          <p>some messages...some messages...</p>
          <p>some messages...some messages...</p>
        </Modal>
      </div>
    )
  }
}