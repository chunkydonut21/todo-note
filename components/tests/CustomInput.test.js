import { render } from '@testing-library/react-native'
import { useField } from 'formik'
import React from 'react'
import { CustomInput } from '../CustomInput'

jest.mock('formik')

describe('Testing custom input field that we use in Authentication flow', () => {
  it('renders the custom input field', () => {
    useField.mockReturnValue([
      { value: '' },
      { error: '', touched: false },
      { setValue: jest.fn(), setTouched: jest.fn() }
    ])
    const tree = render(<CustomInput name="sampleField" />).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it('shows validation error when touched', () => {
    useField.mockReturnValue([
      { value: 'Test value' },
      { error: 'This field is required', touched: true },
      { setValue: jest.fn(), setTouched: jest.fn() }
    ])
    const { getByText } = render(<CustomInput name="test" />)
    expect(getByText('This field is required')).toBeTruthy()
  })

  it('shows text label field correctly', () => {
    useField.mockReturnValue([
      { value: 'Test value' },
      { error: '', touched: false },
      { setValue: jest.fn(), setTouched: jest.fn() }
    ])
    const tree = render(<CustomInput name="sampleField" label="Test label" />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
