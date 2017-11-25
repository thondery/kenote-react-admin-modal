
import React from 'react'
import renderer from 'react-test-renderer'
import KenoteLayout from '../src'

test('component => KenoteLayout', () => {
  const component = renderer.create(
    <KenoteLayout name="test" >
     React test
    </KenoteLayout>
  )
  expect(component).toMatchSnapshot()
  expect(component.toJSON().type).toEqual('div')
  expect(component.toJSON().children[0].type).toEqual('p')
  expect(component.toJSON().children[0].children).toEqual(['name: ', 'test'])
  expect(component.toJSON().children[1]).toEqual('React test')
})