import React from 'react';
import {
  CardElement,
  injectStripe,
} from 'react-stripe-elements';

import {
  Alert,
  Timeline,
  Icon
} from 'antd';
import numeral from 'numeral';
import _ from 'lodash';
import i18n from 'app/languages/index';
import LoadingIndicator from 'app/components/LoadingIndicator/LoadingIndicator';


const createOptions = (fontSize) => {
  return {
    style: {
      base: {
        fontSize,
        color: '#424770',
        letterSpacing: '0.025em',
        fontFamily: 'Source Code Pro, Menlo, monospace',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
      invalid: {
        color: '#9e2146',
      },
    },
  };
};

class _CardForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errorCard: null,
      loading: false
    };
    this.props.clean();
  }
  handleSubmit = ev => {
    ev.preventDefault();
    this.setValue('loading', true);
    this.setValue();
    this.props.stripe.createToken().then(payload => {
      const { error, token } = payload;
      if (error) {
        this.setValue('errorCard', error.message);
      }
      if (token) {
        const { amount, ethAddress, user, history } = this.props;
        this.props.clean();
        let data = {
          token: token.id,
          user_id: user.id,
          amount: amount.toString().replace('$', ''),
          currency: 'USD',
          receiver_eth_address: ethAddress
        };
        if (!_.isEmpty(user.email)) {
          data.email = user.email;
        }
        this.props.paymentRequest(data, history);
      }
      this.setValue('loading', false);
    });
  };
  setValue(name = 'errorCard', value = null) {
    this.setState({
      [name] : value
    })
  }
  _renderError() {
    const { errors, fee } = this.props;
    const { errorCard } = this.state;
    let errMessage = errorCard ? errorCard : errors;
    if (errMessage === null && fee.errors) {
      errMessage = fee.errors;
    }
    if (errMessage) {
      return (
        <Alert
          type="error"
          showIcon
          description={errMessage}
          closeText={i18n.purchaseScreen.close}
        />
      )
    }
  }
  _renderButtonPay() {
    const { amount, ethAddress } = this.props;
    if (!isNaN(amount) && !_.isEmpty(ethAddress)) {
      return (
        <button>{i18n.purchaseScreen.btnPay}</button>
      )
    }
  }
  _renderFee() {
    const { fee, amount, ratesBonus } = this.props;
    if (isNaN(amount)) {
      return null;
    }
    const { fetched, value } = fee;
    
    const { bonus, rates } = ratesBonus;
    let rateUsd = 1, spoutTokensReceive = 0, bonusTokens = 0, totalTokensReceive = 0;
    rates.map(r => {
      if (r.currency === 'USD') {
        rateUsd = 1 / r.rate;
        return;
      }
    });
    rateUsd = rateUsd === 0 ? 1: rateUsd;
    spoutTokensReceive = (amount * (1 / rateUsd));
    bonusTokens = bonus.rate ? (spoutTokensReceive * (bonus.rate / 100)) : 0;
    totalTokensReceive = Math.floor(spoutTokensReceive + bonusTokens);
    return (
      <div className="row timeline-form">
        <div className="col-xs-6">
          <Timeline>
            <Timeline.Item>
              <div>
                {i18n.purchaseScreen.amount}:&nbsp;  <strong className="bold-blue">{numeral(amount).format('0,0[.]00 $')}</strong>
              </div>
            </Timeline.Item>
            <Timeline.Item>
              <div className="d-inline-flex">
                {i18n.purchaseScreen.fee}:&nbsp;&nbsp;
                { fetched && value ? <strong className="bold-blue">{` `+ numeral(value).format('0,0[.]00 $')}</strong> :
                  <LoadingIndicator onDuty={!(fetched && value)} veryMini text={i18n.purchaseScreen.calculatingFee}/>
                }
              </div>
            </Timeline.Item>
            <Timeline.Item dot={<Icon type="right-circle-o" />}>
              <div>
                <strong>{i18n.transactionScreen.payableAmount}: </strong>
                { fetched && value ? <strong className="bold-blue">{` ${numeral(parseFloat(amount) + parseFloat(value)).format('0,0[.]00 $').toString()}`}</strong> :
                  <LoadingIndicator onDuty={!(fetched && value)} veryMini text={i18n.purchaseScreen.waitingFee}/>
                }
              </div>
            </Timeline.Item>
          </Timeline>
        </div>
        <div className="col-xs-6">
          <Timeline>
            <Timeline.Item color="green">{i18n.purchaseScreen.spoutTokensReceive}: <strong className="bold-green">{numeral(spoutTokensReceive).format('0,0')}</strong></Timeline.Item>
            <Timeline.Item color="green">{i18n.purchaseScreen.bonusTokens}: <strong className="bold-green">{numeral(totalTokensReceive - spoutTokensReceive).format('0,0')}</strong></Timeline.Item>
            <Timeline.Item dot={<Icon type="right-circle-o" />} color="green"><strong>{i18n.purchaseScreen.totalTokensReceive}:</strong> <strong className="bold-green">{numeral(totalTokensReceive).format('0,0')}</strong></Timeline.Item>
          </Timeline>
        </div>
      </div>
    )
  }
  render() {
    const { user } = this.props;
    const { ether_wallet_address } = user;
    if (_.isEmpty(ether_wallet_address)) {
      return null;
    }
    const { loading } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <label style={{margin: 0}}>
          <CardElement
            {...createOptions(this.props.fontSize)}
          />
        </label>
        {this._renderError()}
        <LoadingIndicator onDuty={loading} mini text={i18n.purchaseScreen.checkingCard} />
        {
          this._renderFee()
        }
        {
          this._renderButtonPay()
        }
      </form>
    );
  }
}
const CardForm = injectStripe(_CardForm);
export default CardForm;