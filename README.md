# kenote-react-admin-modal

Admin Modal for React

[![NPM Version][npm-image]][npm-url]
[![NPM Downloads][downloads-image]][downloads-url]
[![Build Status][travis-image]][travis-url]
[![Codecov Status][codecov-image]][codecov-url]
[![Gratipay][licensed-image]][licensed-url]

[npm-image]: https://img.shields.io/npm/v/kenote-react-admin-modal.svg
[npm-url]: https://www.npmjs.org/package/kenote-react-admin-modal
[downloads-image]: https://img.shields.io/npm/dm/kenote-react-admin-modal.svg
[downloads-url]: https://npmjs.org/package/kenote-react-admin-modal
[travis-image]: https://travis-ci.org/thondery/kenote-react-admin-modal.svg?branch=master
[travis-url]: https://travis-ci.org/thondery/kenote-react-admin-modal
[codecov-image]: https://img.shields.io/codecov/c/github/thondery/kenote-react-admin-modal/master.svg
[codecov-url]:   https://codecov.io/github/thondery/kenote-react-admin-modal?branch=master
[licensed-image]: https://img.shields.io/badge/license-MIT-blue.svg
[licensed-url]: https://github.com/thondery/kenote-react-admin-modal/blob/master/LICENSE

## Install

```
yarn add kenote-react-admin-modal
```

## Usages

Confirm

```js
import { Button } from 'antd'
import Modal from 'kenote-react-admin-modal'

export default () => (
  <div>
    {/* Info */}
    <Button
      onClick={() => Modal.info({
        title: '标题',
        content: (
          <div>
            <p>some messages...some messages...</p>
            <p>some messages...some messages...</p>
          </div>
        )
      })}
      >
      Info
    </Button>
    {/* Confirm */}
    <Button
      onClick={() => Modal.confirm({
        title: '标题',
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
  </div>
)
```

Modal

```js
import React, { PureComponent } from 'react'
import { Button } from 'antd'
import Modal from 'kenote-react-admin-modal'

export default class ModalDemo extends PureComponent {

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
      <div>
        <Button 
          onClick={() => this.setState({ visible: true })}
          >
          Modal
        </Button>
        <Modal
          ref={view => this._Modal = view}
          visible={this.state.visible}
          title="Basic Modal"
          onCancel={ () => this.setState({ visible: false })}
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
```

## API

\<Modal\>

| 参数 | 说明 | 类型 | 默认值 |
|-----|-----|-----|-----|
| visible | 对话框是否可见 | boolean | false |
| title | 标题名称 | string | -- |
| maskClosable | 点击蒙层是否允许关闭 | boolean | true |
| width | 宽度 | number | 520 |
| height | 高度 | number | null |
| okText | 确认按钮文字 | string | Ok |
| cancelText | 取消按钮文字 | string | Cancel |
| onOk | 点击确定回调 | function(e) | -- |
| onCancel | 点击遮罩层或右上角叉或取消按钮的回调 | function(e) | -- |
| footer | 底部内容，当需要自定义底部按钮时 ... | ReactNode[] | null |
| tips | 底部提示文字 | string\|ReactNode | null |

### Modal.method()

- Modal.info
- Modal.success
- Modal.error
- Modal.warning
- Modal.confirm

| 参数 | 说明 | 类型 | 默认值 |
|-----|-----|-----|-----|
| title | 标题名称 | string | -- |
| content | 内容 | string\|ReactNode | -- |
| width | 宽度 | number | 520 |
| height | 高度 | number | null |
| okText | 确认按钮文字 | string | Ok |
| cancelText | 取消按钮文字 | string | Cancel |
| onOk | 点击确定回调 | function(e) | -- |
| onCancel | 点击取消按钮的回调 | function(e) | -- |

## License

this repo is released under the [MIT License](https://github.com/thondery/kenote-react-admin-modal/blob/master/LICENSE).