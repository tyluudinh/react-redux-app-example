import React from 'react';

import TextBox from './TextBox';

describe('Component TextBox', () => {
  const mockOnChange = jest.fn();
  const getTextBox = (props) => mount(<TextBox {...props} />)
  test('Render correctly', () => {
    // Normal Textbox 
    const normalTextBoxProps = {
      onChange: mockOnChange,
      placeholder: 'My name is',
      value: 'Poe'
    };
    const normalTextBox = getTextBox(normalTextBoxProps);
    const normalTextBoxJson = toJson(normalTextBox);
    expect(normalTextBox.find('input').prop('type')).toBe('text');
    expect(normalTextBox.find('input').prop('placeholder')).toBe('My name is');
    expect(normalTextBoxJson).toMatchSnapshot();

    // Custom type, with icon and reverse theme TextBox
    const customType = 'password';
    const customizedTextBoxProps = {
      withIcon: 'lock',
      className: 'ucustom-class',
      reverseTheme: true,
      type: customType,
      value: 'Poe',
      onChange: mockOnChange,
    };
    const customizedTextBox = getTextBox(customizedTextBoxProps);
    // Get the root component
    const customizedTextBoxRoot = customizedTextBox.find('div').at(0);
    const customizedTextBoxJson = toJson(customizedTextBox);
    expect(customizedTextBox.find('input').prop('type')).toBe(customType)
    expect(customizedTextBoxRoot.hasClass('reverse')).toBeTruthy();
    expect(customizedTextBoxRoot.hasClass('with-icon')).toBeTruthy();
    expect(customizedTextBoxJson).toMatchSnapshot();
  })

  describe('Event handler - onChange', () => {
    test('Called correctly', () => {
      const component = getTextBox({
        value: 'Poe',
        onChange: mockOnChange,
      });
      component.find('input').simulate('change');
      expect(mockOnChange.mock.calls.length).toBe(1);
    })

    test('Called with correct param', () => {
      const props = {
        value: 'Poe',
        onChange: mockOnChange,
        name: 'myname'
      };
      const newValue = 'new Poe';
      const fakeEventTarget = { name: props.name, value: newValue };
      const component = getTextBox(props);
      component.find('input').simulate('change', { target: fakeEventTarget });
      expect(mockOnChange.mock.calls[1][0]).toBe(props.name);
      expect(mockOnChange.mock.calls[1][1]).toBe(newValue);
    })
  })
});