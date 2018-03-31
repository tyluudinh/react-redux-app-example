import React, {Component} from 'react';
import './main.css'

export default class MainScreen extends Component {
  render(){
    return(
      <section id="main-content">
        <div className="container">
          <div className="content-container">
            <div className="row">
              <div className="col-xs-12">
                {this.props.children}
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
}
