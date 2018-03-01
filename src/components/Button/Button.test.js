import React from 'react';

import Button from './Button';

describe('Component Button', () => {
  test('To be rendered correctly!', () => {
    const emptyFn = () => {};

    // Normal button cases
    const normalButton = shallow(<Button onClick={emptyFn}>Confirm</Button>)
    const normalButtonJson = toJson(normalButton);
    expect(normalButtonJson).toMatchSnapshot();

    // Fullwidth button
    const fullwidthButton = shallow(<Button onClick={emptyFn} fullWidth>Confirm</Button>)
    const fullwidthButtonJson = toJson(fullwidthButton);
    expect(fullwidthButtonJson).toMatchSnapshot();

    // specific-type button
    const specificTypeButton = shallow(<Button onClick={emptyFn} type="blue-reverse">Create</Button>)
    const specificTypeButtonJson = toJson(specificTypeButton);
    expect(specificTypeButtonJson).toMatchSnapshot();

    // No border radius button
    const squareBorderButton = shallow(<Button onClick={emptyFn} noBorderRadius>Add more icon</Button>)
    const squareBorderButtonJson = toJson(squareBorderButton);
    expect(squareBorderButtonJson).toMatchSnapshot();

    // button with icon
    const buttonWithIcon = shallow(<Button onClick={emptyFn} withIcon="plus">Add more icon</Button>)
    const buttonWithIconJson = toJson(buttonWithIcon);
    expect(buttonWithIconJson).toMatchSnapshot();

    // button with custom Classname
    const customButton = shallow(<Button onClick={emptyFn} className="custom-button">Custom Button</Button>)
    const customButtonJson = toJson(customButton);
    expect(customButtonJson).toMatchSnapshot();
  })

  test('Click event handler to be called correctly', () => {
    const mockClickfn = jest.fn();
    const button = shallow(<Button onClick={mockClickfn}></Button>);
    button.simulate('click');
    expect(mockClickfn.mock.calls.length).toBe(1);
  })
})
