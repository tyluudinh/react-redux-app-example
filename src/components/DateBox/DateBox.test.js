import React from 'react';
import moment from 'moment';
import DatePicker from 'react-datepicker';

import DateBox from './DateBox';
import CustomInput from './CustomInput';

describe('Component - DateBox', () => {
  const mockOnChange = jest.fn();
  const getDateBox = (props) => mount(<DateBox {...props} />);
  test('Render correctly', () => {
    // A normal DateBox component with passed value
    // => avoid falling back to current time if value empty
    const normalDateBox = getDateBox({
      onChange: mockOnChange,
      value: '1 Nov 2017' 
    });
    const normalDateBoxJson = toJson(normalDateBox);
    expect(normalDateBoxJson).toMatchSnapshot();

    // A DateBox with empty value so it fallbacks to fallbackValue prop
    const fallbackValue = moment();
    const emptyValueDateBox = getDateBox({
      onChange: mockOnChange,
      value: '',
      fallbackValue
    });
    expect(emptyValueDateBox.find(DatePicker).prop('selected')).toBe(fallbackValue);
  })

  test('Datepicker opens correctly', () => {
    const AnotherDateBox = getDateBox({
      value: '1 Nov 2017',
      onChange: mockOnChange
    });
    // SImulate a click on the visible input field for DateBox
    AnotherDateBox.find(CustomInput).simulate('click');
    expect(AnotherDateBox.find('.react-datepicker')).toHaveLength(1);
  })

  test('Event handler - onChange called and with the right value', () => {
    const AnotherDateBox = getDateBox({
      value: '1 Nov 2017',
      onChange: mockOnChange
    });
    const CustomInputToCheck = AnotherDateBox.find(CustomInput);
    // Open the date picker
    CustomInputToCheck.simulate('click');
    // Click on a date
    const dayToSelect = AnotherDateBox.find('.react-datepicker__day').at(0);
    dayToSelect.simulate('click');
    // Get selected value
    const selectedValue = CustomInputToCheck.prop('value');
    expect(mockOnChange.mock.calls.length).toBe(1);
    // Do I need to test whether it's called with the right value? 
    // It seem is covered by unit tests of the package itself
  })
});