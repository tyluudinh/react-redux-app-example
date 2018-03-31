import { connect } from 'react-redux';

import Purchase from './Purchase';
import {  getErrors, getInProgress } from './data/selectors';
import {  getFee, getFeeInProgress, getFeeErrors, getFeeFetched } from './data/Fee/selectors';
import {  getRates, getBonus, getRatesBonusErrors, getRatesBonusFetched, getRatesBonusInProgress } from './data/RateBonus/selectors';

import {  getInfo } from 'app/data/me/selectors';
import { submitPayment, clean } from './data/actionCreators';
import { getFeePayment, cleanGetFee } from './data/Fee/actionCreators';
import { getRatesBonusPayment, cleanGetRateBonus } from './data/RateBonus/actionCreators';
import { ETH_WALLET_ADDRESS_COMPANY } from 'app/services/constants';

const mapStateToProps = state => {
  return {
    inProgress: getInProgress(state),
    errors: getErrors(state),
    user: getInfo(state),
    config: {
      ethAddressSpout: ETH_WALLET_ADDRESS_COMPANY,
      rateToken: 200,
    },
    fee: {
      inProgress: getFeeInProgress(state),
      value: getFee(state),
      errors: getFeeErrors(state),
      fetched: getFeeFetched(state)
    },
    ratesBonus: {
      inProgress: getRatesBonusInProgress(state),
      rates: getRates(state),
      bonus: getBonus(state),
      errors: getRatesBonusErrors(state),
      fetched: getRatesBonusFetched(state)
    }
  }
};

const mapDispatchToProps = dispatch => {
  return {
    paymentRequest: (data, history) => submitPayment(dispatch, data, history),
    clean: () => clean(dispatch),
    cleanFetchFee: () => cleanGetFee(dispatch),
    getFee: (params) => getFeePayment(dispatch, params),
    getRatesBonus: (params) => getRatesBonusPayment(dispatch, params),
    cleanRateBonus: () => cleanGetRateBonus(dispatch)
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Purchase);