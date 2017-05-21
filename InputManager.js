/*
 * react input manager class
 * author: steven smith
 * description: produces input jsx and manages their states and handlers
*/
import React from 'react';
import Input from './Input.js';

/*
 * Manages react Input class state and handlers.
 * app: reference to react app to rerender DOM
*/
class InputManager {
  constructor(app) {
    this.stateChangeTarget = app;
    this.conditions = {};
    this.callbacks = {};
    this.states = {};
  }

  /*
   * Registers a new Input object from a config object according to
   * its id.
  */
  add(config, callback, condition) {
    this.conditions[config.id] = condition;
    this.callbacks[config.id] = callback;
    // Sets initial state of Input to config.
    this.states[config.id] = config;
  }

  /*
   * Gets a react JSX Input object by its id.
  */
  getJSX(id) {
    let config = this.states[id];
    return <Input key={config.id} params={config} onChange={this.changeListener.bind(this)} />
  }

  /*
   * Gets a react JSX Input object by its id.
  */
  getState(id) {
    return this.states[id];
  }

  /*
   * Checks conditions and calls callback function for inputs when a change is
   * detected.
  */
  changeListener(id, value) {
    let state = this.states[id];
    let condition = this.conditions[id];
    let callback = this.callbacks[id];
    let oldValue = state.value;
    state.value = value;
    this.stateChanged();
    if (Boolean(callback)) {
      if (!Boolean(condition) || (Boolean(condition) && condition(state, oldValue, value))) {
        this.states[id] = callback(state);
        this.stateChanged();
      }
    }
  }

  /*
   * Notifies react app that the state has changed and should rerender the DOM.
  */
  stateChanged() {
    let state = this.stateChangeTarget.state || {};
    state.inputManagerToggleFlag = !state.inputManagerToggleFlag;
    this.stateChangeTarget.setState(state);
  }

}

export default InputManager;
