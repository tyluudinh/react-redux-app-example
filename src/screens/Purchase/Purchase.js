import React, {Component} from 'react';
import {
  Radio,
  Button,
  Tooltip,
  Alert
} from 'antd';
import InputMask from 'react-text-mask';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import _ from 'lodash';

import i18n from 'app/languages/index'
import LoadingIndicator from 'app/components/LoadingIndicator/LoadingIndicator';
import StripeScreen from "./components/Stripe/index";
import {
  URL_CHECK_MY_WALLET
} from 'app/services/constants';
import './Purchase.css';

const RadioGroup = Radio.Group;

export default class PurchaseScreen extends Component {
  constructor(props){
    super(props);
    this.state = {
      paymentMethod: {
        ethSmartContract: 'ETH (Smart Contract)',
        visaCard: 'Visa/Master Card'
      },
      methodChoose: null,
      amount: '',
      ethAddress: ''
    };
    this.onChangeElement = this.onChangeElement.bind(this);
    this.onBlurAmount = this.onBlurAmount.bind(this);
  }
  componentDidMount() {
    this.setValue('methodChoose', this.state.paymentMethod.visaCard);
    const { user } = this.props;
    const { ether_wallet_address } = user;
    if (!_.isEmpty(ether_wallet_address)) {
      this.setValue('ethAddress', ether_wallet_address)
    }
    this.props.cleanFetchFee();
  }
  componentWillMount(){
    this.props.cleanRateBonus();
    this.props.getRatesBonus();
  }
  setValue(name, value) {
    this.setState({
      [name] : value
    })
  }
  getType(name) {
    const { methodChoose } = this.state;
    return methodChoose === name ? 'primary' : 'default'
  }
  onChangeElement(e) {
    let { name, value} = e.target;
    if (name === 'amount') {
      this.props.cleanFetchFee();
      if (!_.isEmpty(value)) {
      }
    }
    this.setValue(name, value);
  }
  getAmount(value) {
    return parseFloat(value.replace(',', '').replace('$', ''));
  }
  onBlurAmount(e) {
    let value  = this.getAmount(e.target.value);
    if (_.isNumber(value) && !isNaN(value)) {
      this.props.cleanFetchFee();
      this.props.getFee({
        amount: value
      })
    } else {
      this.props.cleanFetchFee();
    }
  }
  _renderPaymentElement() {
    const { paymentMethod, methodChoose, ethAddress, amount } = this.state;
    const { errors, config, history } = this.props;
    if (methodChoose === paymentMethod.visaCard) {
      return (
        <div className="payment-element">
          <div className="d-inline-flex">
            <label htmlFor="amount">{i18n.purchaseScreen.amount}: </label>
            <InputMask
              autoFocus={true}
              mask={createNumberMask({
                prefix: '',
                suffix: '$',
                allowDecimal: true
              })}
              disabled={_.isEmpty(ethAddress)}
              min={0}
              value={amount}
              name="amount"
              placeholder={`${i18n.purchaseScreen.amount} (USD)`}
              onBlur={this.onBlurAmount}
              onChange={this.onChangeElement}
            />
          </div>
          <div className="d-inline-flex">
            <label htmlFor="ethAddress">{i18n.purchaseScreen.ethAddress}: </label>
            <input disabled={true} type="text" value={ethAddress} name="ethAddress" placeholder={i18n.purchaseScreen.ethAddress} onChange={this.onChangeElement} />
          </div>
          {
            !_.isEmpty(ethAddress) ?
              <Tooltip placement="bottom" title={`${i18n.formatString(i18n.purchaseScreen.checkYourWallet, URL_CHECK_MY_WALLET)}`}>
                <a className="check-my-wallet" href={`${URL_CHECK_MY_WALLET}${ethAddress}`} target="_blank">{i18n.purchaseScreen.checkMyWallet}</a>
              </Tooltip>
              : <Alert showIcon message={i18n.purchaseScreen.pleaseUpdateYourETH} type="warning" closeText={<div onClick={() => history.push('/profile')}>{i18n.purchaseScreen.updateNow}</div>} />
          }
          <StripeScreen
            amount={this.getAmount(amount)}
            ethAddress={ethAddress}
            errors={errors}
            {...this.props}
          />
        </div>
      )
    }
    if (methodChoose === paymentMethod.ethSmartContract) {
      return (
        <div className="eth-sc-note-row">
          <div className="eth-sc-note">
            <p className="text-center">{i18n.purchaseScreen.ethSmartContractTitle}</p>
            <div className="qr__code">
              <img src="data:image/png;base64,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" width="274" height="274" style={{width: 137, height: 137}} />

            </div>
            <div className="eth-address-container text-center">
              <input id="value" className="eth-address" type="text" readOnly={true} value={config.ethAddressSpout} />
              <button className="btn-green-flat">{i18n.purchaseScreen.btnCopy}</button>
            </div>
            <p className="important">
              <strong>
                {i18n.purchaseScreen.importantText}
              </strong>
            </p>
            <p>
              {i18n.purchaseScreen.makeSureText}
            </p>
            <p><strong>{i18n.purchaseScreen.limitText}</strong></p>
            <p>
              {i18n.purchaseScreen.note}
              <a href={`https://etherscan.io/address/${config.ethAddressSpout}`} formTarget="_blank"> Etherscan.io</a>
            </p>
          </div>
        </div>
      )
    }
  }
  _renderBoxCoinConvert() {
    const { ratesBonus } = this.props;
    const { rates, inProgress } = ratesBonus;
    return (
      <div className="box-coin-convert">
        <span className="black">1 Spout Coin =</span>
        {
          rates.map((rate, index) => {
            return (
              <span key={index}>{1 / rate.rate } {rate.currency}</span>
            )
          })
        }
        <div className="child-center">
          <LoadingIndicator onDuty={inProgress} veryMini/>
        </div>
      </div>
    )
    
  }
  render(){
    const { paymentMethod, methodChoose } = this.state;
    const { inProgress } = this.props;
    return(
      <div className="content payment-steps">
        <div className="row">
          <div className="col-xs-12">
            <div className="currency-rates">
              {this._renderBoxCoinConvert()}
              <div className="subtitle">{i18n.purchaseScreen.subTitle}</div>
            </div>
            <div className="payment-form">
              <h2>{i18n.purchaseScreen.paymentTitle}</h2>
              <div className="payment-select">
                <p className="lead text-uppercase">{i18n.purchaseScreen.selectPaymentTitle}</p>
              </div>
              <div className="payment-method">
                <RadioGroup name="methodChoose" value={methodChoose} onChange={this.onChangeElement}>
                  <Button onClick={() => this.setValue('methodChoose', paymentMethod.ethSmartContract)} className={'button-radio-payment-method'} type={this.getType(paymentMethod.ethSmartContract)}>
                    <Radio value={paymentMethod.ethSmartContract}>ETH (Smart Contract)</Radio>
                  </Button>
                  <Button onClick={() => this.setValue('methodChoose', paymentMethod.visaCard)} className={'button-radio-payment-method'} type={this.getType(paymentMethod.visaCard)}>
                    <Radio value={paymentMethod.visaCard}>Visa/Master Card</Radio>
                  </Button>
                </RadioGroup>
              </div>
              {
                this._renderPaymentElement()
              }
              <LoadingIndicator onDuty={inProgress} text={i18n.purchaseScreen.processing}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
