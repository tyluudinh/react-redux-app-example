import React, { Component } from 'react';
import './footer.css';

export default class FooterScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <footer className="app-footer">
        <a target="_blank" rel="noopener noreferrer" href="http://spout360.com" >Spout360</a>
        &nbsp;© 2017.<span className="float-right">Current Version <a target="_blank">2.0.1</a>
        </span>
      </footer>
    )
  }
}
