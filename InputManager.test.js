import React from 'react';
import {shallow} from 'enzyme';
import Input from './Input.js';
import InputManager from './InputManager.js';

test('stub', () => {
  // Render an input class instance
  const params = {
    class: 'input',
    type: 'text',
    id: 'text-id-1',
    value: 'some text'
  };


  class App extends React.Component {
    inputManager: {}
    constructor(props) {
      super(props);
      this.inputManager = new InputManager(this);
      const callback = function(state) {
        state.value = state.value.replace('teh', 'the');
        return state;
      };
      const condition = function(state, oldValue, newValue) {
        return newValue.indexOf('teh') !== -1;
      };
      this.inputManager.add(params, callback, condition);
    }
    render() {
      return this.inputManager.getJSX(params.id);
    }
  }
  const app = shallow(<App />);
  app.find(Input).dive().find('input').simulate('change', {target: {value: 'teh'}});
  expect(app.find(Input).prop('params').value).toEqual('the');
});
