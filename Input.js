/*
 * react input class
 * author: steven smith
 * description: supports text, number, checkbox, button, and file input types
*/
import React from 'react';
import PropTypes from 'prop-types';

class Input extends React.Component {
  constructor(props) {
    super(props);
    this.params = this.props.params;
  }
  render() {
    // required fields
    let id;
    let type;
    let label;
    // optional fields
    let value = null;
    let checked = null;
    let min = null;
    let max = null;
    let disabled = null;

    id = this.params.id;
    type = this.params.type;
    label = this.params.label;
    // string and number types
    if (typeof this.params.value === 'string' || typeof this.params.value === 'number') {
      value = this.params.value;
    // checkboxes
    } else if (type === 'checkbox' && typeof this.params.value === 'boolean') {
      checked = this.params.value ? 'checked' : null;
    // buttons
    } else if (type === 'button' && typeof this.params.label === 'string') {
      value = this.params.label;
      label = null;
    }

    // min and max for numbers
    if (type === 'number' || type.includes('date')) {
      if (this.params.min === 'number') {
        min = this.params.min;
      }
      if (this.params.max === 'number') {
        max = this.params.max;
      }
    }

    // disabled input setting
    if (typeof this.params.disabled === 'boolean') {
      disabled = this.params.disabled ? 'disabled' : null;
    }

    return (
      <div>
        {typeof label === 'string' ? <label for={id}>{label}</label> : ''}
        <input
          id={id}
          type={type}
          value={value !== null ? value : ''}
          defaultChecked={checked}
          onChange={this.handleChangeEvent.bind(this)}
          onClick={this.handleClickEvent.bind(this)}
          onDrop={this.handleDropEvent.bind(this)}
          min={min}
          max={max}
          disabled={disabled}
          />
      </div>
    );
  }

  handleChangeEvent(event) {
    let value;
    if (this.params.type === 'checkbox') {
      value = event.target.checked;
    } else {
      value = event.target.value;
    }
    this.props.onChange(this.params.id, value);
  }

  handleClickEvent(event) {
    if (this.params.type === 'button') {
      this.props.onChange(this.params.id, true);
    }
  }

  handleDropEvent(event) {
    let files;
    if (this.params.type === 'file') {
      event.stopPropagation();
      event.preventDefault();
      files = event.dataTransfer.files;
      this.props.onChange(this.params.id, files);
    }
  }
}

Input.propTypes = {
  params: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired
};

export default Input;
