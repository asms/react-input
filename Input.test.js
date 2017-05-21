import React from 'react';
import {shallow} from 'enzyme';
import Input from './Input.js';

test('stub', () => {
  // Render an input class instance
  const params = {
    class: 'input',
    type: 'text',
    id: 'text-id-1',
    value: 'some text'
  };
  const onChange = function() { /* no need to detect changes in test. */ };
  const input = shallow(
    <Input params={params} onChange={onChange.bind(this)} />
  );

  // TODO: test

});
