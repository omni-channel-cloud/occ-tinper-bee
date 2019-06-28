import React, { Component } from "react";
import { DatePicker } from "tinper-bee";
class DatePickerEditCell extends Component {
  constructor(props, context) {
    super(props);
    this.state = {
      value: this.props.value,
      editable: false
    };
  }

  handleSelect = value => {
    this.setState({ value });
  };

  commitChange = () => {
    this.setState({ editable: false });
    if (this.props.onChange) {
      this.props.onChange(this.state.value);
    }
  };

  edit = () => {
    this.setState({ editable: true });
  };

  render() {
    const { format, onSelectValue } = this.props;
    const { value, editable } = this.state;
    return (
      <div className="editable-cell">
        {editable ? (
          <div className="editable-cell-input-wrapper">
            <DatePicker
              format={format}
              onSelect={this.handleSelect}
              value={value}
              onChange={this.handleSelect}
              //   onClick={this.onClick}
              onDateInputBlur={this.commitChange}
            />
          </div>
        ) : (
          <div className="editable-cell-text-wrapper" onClick={this.edit}>
            {value || " "}
          </div>
        )}
      </div>
    );
  }
}

export default DatePickerEditCell;
