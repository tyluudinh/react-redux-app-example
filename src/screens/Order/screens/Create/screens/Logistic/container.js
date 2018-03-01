import { connect } from 'react-redux';

import Logistic from './Logistic';
import { getInProgress, getErrors, getFields, getLogisticPassed } from '../../data/selectors';
import { cleanOrderCreateForm, validateOrderLogistic } from '../../data/actionCreators';

const mapStateToProps = state => {
  return {
    inProgress: getInProgress(state),
    errors: getErrors(state),
    passed: getLogisticPassed(state),
    fields: getFields(state),
  }
}

const mapDispatchToProps = dispatch => {
  return {
    validate: (data) => validateOrderLogistic(dispatch, data),
    clean: () => cleanOrderCreateForm(dispatch),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Logistic);