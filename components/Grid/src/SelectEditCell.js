import React, { Component } from "react";
import {} from "tinper-bee";
import { Select } from "tinper-bee";
const Option = Select.Option;
class SelectEditCell extends Component {
  constructor(props) {
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
    const { dataSource, onSelectValue } = this.props;
    const { value, editable } = this.state;
    return (
      <div className="editable-cell">
        {editable ? (
          <div className="editable-cell-input-wrapper">
            <Select
              defaultValue={this.props.value}
              value={value}
              onSelect={this.handleSelect}
              onBlur={this.commitChange}
              autoFocus
            >
              {dataSource.map((item, index) => (
                <Option key={index} value={item[onSelectValue]}>
                  {item.name}
                </Option>
              ))}
            </Select>
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

export default SelectEditCell;
