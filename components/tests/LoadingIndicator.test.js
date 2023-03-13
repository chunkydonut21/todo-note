import { render } from '@testing-library/react-native'
import React from 'react'
import { LoadingIndicator } from '../LoadingIndicator'

describe('LoadingIndicator', () => {
  it('renders correctly', () => {
    const tree = render(<LoadingIndicator />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
