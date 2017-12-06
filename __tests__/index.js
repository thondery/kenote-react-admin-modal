
import React from 'react'
import renderer from 'react-test-renderer'
import { Button } from 'antd'
import Modal from '../src'

test('component => Modal.Info', () => {
  const component = renderer.create(
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
  )
  expect(component).toMatchSnapshot()
})

test('component => Modal.Confirm', () => {
  const component = renderer.create(
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
  )
  expect(component).toMatchSnapshot()
})

test('component => Modal', () => {
  const component = renderer.create(
    <Modal
      title="Basic Modal"
      onCancel={ () => null}
      footer={[
        <Button />,
        <Button />
      ]}
      >
      <p>some messages...some messages...</p>
      <p>some messages...some messages...</p>
    </Modal>
  )
  expect(component).toMatchSnapshot()
})