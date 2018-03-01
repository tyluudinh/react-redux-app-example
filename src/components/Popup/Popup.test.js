import React from 'react';

import Popup from './Popup';

describe('Comopnent Popup', () => {
  const BasicPopup = mount(<Popup title="Basic Popup" innerClass="custom-class">Something inside</Popup>);
  const BasicPopupNode = BasicPopup.instance();

  test('Render correctly', () => {
    const BasicPopupJson = toJson(BasicPopup);
    expect(BasicPopupJson).toMatchSnapshot();
  })

  test('Set active class when it\'s showing', () => {
    BasicPopup.setState({ show: true });
    expect(BasicPopup.find('div').at(0).hasClass('active')).toBeTruthy();
  })

  test('Set active class when it\'s showing', () => {
    BasicPopup.setState({ show: false });
    expect(BasicPopup.find('div').at(0).hasClass('active')).toBeFalsy();
  })

  test('show method set the correct state', () => {
    BasicPopupNode.show();
    expect(BasicPopup.state('show')).toBeTruthy();
  })

  test('hide method set the correct state', () => {
    BasicPopupNode.hide();
    expect(BasicPopup.state('show')).toBeFalsy();
  })

  test('Click on inner box does not propagate to outer popup (cause it close)', () => {
    BasicPopupNode.show();
    BasicPopup.find('.popup__inner').simulate('click');
    expect(BasicPopup.state('show')).toBeTruthy();
  });
})