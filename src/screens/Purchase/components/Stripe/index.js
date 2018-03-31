import React from 'react';
import {
  StripeProvider,
  Elements,
} from 'react-stripe-elements';

import CardForm from './Components/CardForm';

import { API_KEY_STRIPE } from 'app/services/constants';
import './stripe.css';


class StripeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      elementFontSize: window.innerWidth < 450 ? '14px' : '18px',
    };
    window.addEventListener('resize', () => {
      if (window.innerWidth < 450 && this.state.elementFontSize !== '14px') {
        this.setState({elementFontSize: '14px'});
      } else if (
        window.innerWidth >= 450 &&
        this.state.elementFontSize !== '18px'
      ) {
        this.setState({elementFontSize: '18px'});
      }
    });
  }
  
  
  render() {
    const {elementFontSize} = this.state;
    return (
    <StripeProvider apiKey={API_KEY_STRIPE}>
      <div className="Checkout">
        <Elements>
          <CardForm
            fontSize={elementFontSize}
            {...this.props}
          />
        </Elements>
      </div>
    </StripeProvider>
    
    );
  }
}
export default StripeScreen;