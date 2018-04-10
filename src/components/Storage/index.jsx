/**
* @module: <Storage/> component will be to save/load the state of a component with localStorage
* @author: mamy
* @since: 2018-04-10 10:32:52
*/
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Storage extends Component {
  static propTypes = {
    render: PropTypes.func.isRequired,
  }
  constructor(props) {
    super(props);
    this.state = {
      localStorageAvailable: false,
    };
  }
  componentDidMount() {
    this.checkLocalStorageExists();
  }
  checkLocalStorageExists() {
    const testKey = 'test';
    try {
      localStorage.setItem(testKey, testKey);
      localStorage.removeItem(testKey);
      this.setState({
        localStorageAvailable: true,
      });
    } catch (err) {
      this.setState({
        localStorageAvailable: false,
      });
    }
  }
  load = (key) => {
    if (this.state.localStorageAvailable) {
      return localStorage.getItem(key);
    }
    return null;
  }
  save = (key, data) => {
    if (this.state.localStorageAvailable) {
      localStorage.setItem(key, data);
    }
  }
  remove = (key) => {
    if (this.state.localStorageAvailable) {
      localStorage.removeItem(key);
    }
  }
  render() {
    return (
      <span>
        {this.props.render({
          load: this.load,
          save: this.save,
          remove: this.remove,
        })}
      </span>
    );
  }
}

export default Storage;
