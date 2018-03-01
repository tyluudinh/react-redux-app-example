import React from 'react';
import Select from 'react-select';
import SelectBox from './SelectBox';

describe('Component SelectBox', () => {
  const normalOptions = [
    { value: 'one', label: 'option one' },
    { value: 'two', label: 'option two' },
    { value: 'three', label: 'option three' },
    { value: 'four', label: 'option four' },
    { value: 'all', label: 'all options' },
  ]

  test('To be rendered correctly', () => {
    // Normal selectBox
    const component = mount(<SelectBox value="one" options={normalOptions} />);
    const componentJson = toJson(component);
    expect(componentJson).toMatchSnapshot();
  })

  describe('Event Handler', () => {
    const onChangeMock = jest.fn();
    const component = shallow(<SelectBox options={normalOptions} onChange={onChangeMock} />);
    component.find(Select).simulate('change', 'selected option');
  
    test('Is called once', () => {
      expect(onChangeMock.mock.calls.length).toBe(1);
    })
    
    test('Correct value passed', () => {
      expect(onChangeMock.mock.calls[0][0]).toBe('selected option');
    })
  })
})