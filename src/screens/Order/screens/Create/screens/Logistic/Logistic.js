import React, { Component } from 'react';
import classNames from 'classnames';
import BackIcon from 'react-icons/lib/md/arrow-back';

import RadioGroup from 'app/components/RadioGroup/RadioGroup';
import Button from 'app/components/Button/Button';
import TextBox from 'app/components/TextBox/TextBox';
import LoadingIndicator from 'app/components/LoadingIndicator/LoadingIndicator';
import ErrorsDisplay from 'app/components/ErrorsDisplay/ErrorsDisplay';

import { getFieldError } from 'app/services/error';

import './Logistic.css';

const routingList = {
  '1': { value: '1', cost: 15, logo: 'alpha.jpg', name: 'Alpha Logistics 1', days: '5', cat: 'Cheapest' },
  '2': { value: '2', cost: 12, logo: 'alpha.jpg', name: 'Alpha Logistics 2', days: '7', cat: 'Cheapest' },
  '3': { value: '3', cost: 14, logo: 'alpha.jpg', name: 'Alpha Logistics 3', days: '5', cat: 'Cheapest' },
  '4': { value: '4', cost: 13, logo: 'alpha.jpg', name: 'Alpha Logistics 4', days: '5', cat: 'Cheapest' },
  '5': { value: '5', cost: 30, logo: 'alpha.jpg', name: 'Alpha Logistics 5', days: '1', cat: 'Fastest' },
  '6': { value: '6', cost: 33, logo: 'alpha.jpg', name: 'Alpha Logistics 6', days: '2', cat: 'Fastest' },
  '7': { value: '7', cost: 35, logo: 'alpha.jpg', name: 'Alpha Logistics 7', days: '3', cat: 'Fastest' },
  '8': { value: '8', cost: 34, logo: 'alpha.jpg', name: 'Alpha Logistics 8', days: '2', cat: 'Fastest' },
}

export default class OrderCreateLogistic extends Component {
  constructor(props) {
    super(props);
    const { fields } = props;
    this.state = {
      termOfOrder: fields['termOfOrder'] ? fields['termOfOrder'].value : '',
      routing: fields['routing'] ? fields['routing'].value : '',
      selectedRoute: fields['selectedRoute'] ? fields['selectedRoute'].value : '',
      overridePercentage: fields['overridePercentage'] ? fields['overridePercentage'].value : '10',
      override: fields['override'] ? fields['override'].value : false,
      finalCost: fields['finalCost'] ? fields['finalCost'].value : 0,
      
      documents: [],
      routingCostGroup: fields['selectedRoute'] ? fields['selectedRoute'].value.cat : 'Cheapest',
    }
    
    this.goBack = this.goBack.bind(this);
    this.setValue = this.setValue.bind(this);
    this.submit = this.submit.bind(this);
    this.showDocuments = this.showDocuments.bind(this);
    this.setRoutingCostGroup = this.setRoutingCostGroup.bind(this);
    this._renderRoutingOption = this._renderRoutingOption.bind(this);
    this.overrideCost = this.overrideCost.bind(this);
  }

  componentDidMount() {
    const { clean } = this.props;
    clean();
  }

  goBack(e) {
    e && e.preventDefault();
    this.props.history.goBack();
  }

  setValue(name, value, opts) {
    const others = (opts) ? opts.others : null;
    const valueToSet = { [name]: (others) ? others : value };
    // There are some special fields that need custom check and set value
    switch(name) {
      case 'routing': {
        const selectedRoute = routingList[value];
        const { overridePercentage, override } = this.state;
        this.setState ({
          selectedRoute,
          finalCost: this.getFinalCost(selectedRoute.cost, overridePercentage, override),
          ...valueToSet,
        });
        break;
      }
      case 'overridePercentage': {
        const { selectedRoute, override } = this.state;
        this.setState({
          finalCost: this.getFinalCost(selectedRoute.cost, value, override),
          ...valueToSet,          
        });
        break;
      }
      default: {
        this.setState({ ...valueToSet })
      }
    }
  }

  setRoutingCostGroup(group) {
    const logistic = this;
    return () => {
      logistic.setState({ routingCostGroup: group })
    }
  }

  submit(e) {
    e.preventDefault();
    this.props.validate(this.state);
  }

  showDocuments(e) {
    e && e.preventDefault();
    console.log('show documents');
  }

  getFinalCost(cost, overridePercentage, override) {
    if (cost) {
      const percentage = parseInt(overridePercentage, 10);
      return (override) ? `$${cost + (cost*percentage/100)} ($${cost} + $${cost}x${percentage}%)` : `$${cost}`;
    }
    return 10;
  }

  overrideCost(e) {
    e.preventDefault();
    const { override, selectedRoute, overridePercentage } = this.state;
    const { cost } = selectedRoute;
    this.setState({
      override: !override,
      finalCost: this.getFinalCost(cost, overridePercentage, !override)
    });
  }

  _renderRoutingOption(option) {
    return (
      <div className="inline-field">
        <div className="logistic-routing__wrapper">
          <img src={require('app/assets/images/logistics/alpha.jpg')} alt={option.name} />
          <span className="logistic-routing__name">{option.name}</span>
          <span className="logistic-routing__days-cost">
            <span className="logistic-routing__days">{option.days} days</span>
            <span className="logistic-routing__cost">${option.cost}</span>
          </span>
        </div>
      </div>
    )
  }

  componentDidUpdate() {
    const { passed, history } = this.props;
    passed && history.push(`${this.props.basePath}/confirm`);
  }
  
  render() {
    const {
      termOfOrder,
      routing,
      documents,
      routingCostGroup,
      overridePercentage,
      override,
      finalCost,
    } = this.state;

    const { fields, inProgress, errors } = this.props;

    return (
      <div className="create-order-logistic container">
        <h1 className="main-title">Create order</h1>
        <a className="back-link" onClick={this.goBack}>
          <BackIcon size={16} />
          <span>Back</span>
        </a>
        <form onSubmit={this.submit} className="create-order-logistic__form">
          <div className="flex-default flex-start space-top">
            <span>Terms of order</span>
          </div>
          <div className="flex-default">  
            <div className="row">
              <RadioGroup 
                name="termOfOrder"
                className="radio-board"
                options={[
                  { value: 'EXW', label: 'EXW' },
                  { value: 'FOB', label: 'FOB' },
                  { value: 'CIF', label: 'CIF' },
                  { value: 'CFR', label: 'CFR' },
                  { value: 'DDU', label: 'DDU' },
                  { value: 'DDP', label: 'DDP' },
                ]}
                othersPrompt
                optionClass="radio-board__option col-4"
                onChange={this.setValue}
                value={termOfOrder}
              />
              {getFieldError(fields, 'termOfOrder')}
            </div>
          </div>
          <div className="flex-default space-top">
            <span>Routing cost:</span>
            <div className="inline-field flex-default">
              <span 
                className={classNames(
                  'create-order-logistic__tab-select',
                  { 'active': routingCostGroup === 'Cheapest' }
                )}
                onClick={this.setRoutingCostGroup('Cheapest')}>
                Cheapest
              </span>
              <span  
                className={classNames(
                  'create-order-logistic__tab-select',
                  { 'active': routingCostGroup === 'Fastest' }
                )}
                onClick={this.setRoutingCostGroup('Fastest')}>
                Fastest
              </span>
            </div>
          </div>
          <div className="flex-default">
            <div className="row">
            { (routingCostGroup === 'cheapest') ? (
              <RadioGroup 
                name="routing"
                options={[
                  routingList['1'],
                  routingList['2'],
                  routingList['3'],
                  routingList['4'],
                ]}
                customKey={(option) => `${option.name}${option.cost}${option.days}`}
                optionClass="radio-board__option col-12 flex"
                customOption={this._renderRoutingOption}
                onChange={this.setValue}
                value={routing}
              />
              ) : (
                <RadioGroup 
                  name="routing"
                  options={[
                    routingList['5'],
                    routingList['6'],
                    routingList['7'],
                    routingList['8'],
                  ]}
                  customKey={(option) => `${option.name}${option.cost}${option.days}`}
                  optionClass="radio-board__option col-12 flex"
                  customOption={this._renderRoutingOption}
                  onChange={this.setValue}
                  value={routing}
                />
              )
            }
            </div>
          </div>
          {getFieldError(fields, 'routing')}
          <div className="flex-default flex-start space-top">
            <span>Costing:</span>
          </div>
          <div className="flex-default row">
            <div className="col-6 inline-field__col inline-field__col--left">
              <div className="create-order-logistic__price-badges row">
                <div className="col-6 inline-field__col inline-field__col--left center">
                  <TextBox
                    className="create-order-logistic__price-mask"
                    name="overridePercentage"
                    onChange={this.setValue}
                    value={overridePercentage}/>
                </div>
                <div className="col-6 inline-field__col inline-field__col--right center">
                  <div className="create-order-logistic__final-price">
                    {finalCost ? finalCost : `-`}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-6 inline-field__col inline-field__col--right">
              <Button
                onClick={this.overrideCost}
                type={ !override ? 'green-reverse' : 'green' }
                withIcon={ override ? {
                  name: "check",
                  size: 20,
                  style: { fill: '#ffffff' },
                } : null}
                fullWidth>
                Override
              </Button>
            </div>
          </div>
          
          <div className="flex-default space-top center">
            <a href="" className="highlight" onClick={this.showDocuments}>Documents ({documents.length}) uploaded</a>
          </div>
          <div className="flex-default center">
            <Button style={{ margin: '8px' }} type="blue-reverse" onClick={this.upload} withIcon={{ name: 'upload', size: 16 }} minPadding>Upload</Button>
            <a href={require('app/assets/documents/document.pdf')} target="_blank">
              <Button style={{ margin: '8px' }} type="blue-reverse" withIcon={{ name: 'download', size: 16 }} minPadding>Download</Button>
            </a>
          </div>
          <ErrorsDisplay errors={errors} center/>
          <div className="center">
            <Button className="space-top" onClick={this.submit} minPadding>
              CONFIRM
            </Button>
          </div>
        </form>
        <LoadingIndicator onDuty={inProgress}/>
      </div>
    )
  }
}