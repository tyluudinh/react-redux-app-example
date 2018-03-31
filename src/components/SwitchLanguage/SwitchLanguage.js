import React, { Component } from 'react';

import ReactFlagsSelect from 'react-flags-select';
import Language from 'app/languages/index';


//import css module
import 'react-flags-select/css/react-flags-select.css';
import './SwitchLanguage.css'
export default class SwitchLanguage extends Component {
  componentWillMount() {
    const defaultLanguage = localStorage.getItem('language');
    if (defaultLanguage) {
      Language.setLanguage(defaultLanguage);
    }
  }
  render(){
    const defaultLanguage = localStorage.getItem('language');
    return(
      <ReactFlagsSelect
        countries={["GB", "JP", "KR", "CN", "VN", "IN"]}
        defaultCountry={defaultLanguage ? defaultLanguage : 'GB'}
        onSelect={(countryCode) => {
          if (countryCode !== defaultLanguage) {
            localStorage.setItem('language', countryCode);
            Language.setLanguage(countryCode);
            window.location.reload();
          }
        }}
        customLabels={{"GB": "English","JP": "Japan","KR": "Korea","VN": "Việt Nam", "IN": "India"}} />
    )
  }
}