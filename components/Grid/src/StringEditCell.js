import React, { Component } from "react";
import { Icon, Tooltip } from "tinper-bee";

class StringEditCell extends Component {
  constructor(props, context) {
    super(props);
    this.state = {
      value: this.props.value,
      editable: false
    };
    this.editWarp = React.createRef();
  }

  commitChange = () => {
    if (this.state.value === "") return;
    this.setState({ editable: false });
    if (this.props.onChange) {
      this.props.onChange(this.state.value);
    }
  };

  edit = () => {
    this.setState({ editable: true });
  };

  handleKeydown = event => {
    if (event.keyCode == 13) {
      this.commitChange();
    }
  };

  handleChange = e => {
    const { typeFlag } = this.props;
    if (typeFlag && typeFlag == "float") {
      // 数字和小数点
      if (e.target.value === "") this.editWarp.className += " verify-cell";
      e.target.value = e.target.value.replace(/[^\d^\.]+/g, "");
      this.setState({ value: e.target.value });
    } else if (typeFlag && (typeFlag == "integer" || typeFlag == "phone")) {
      // 纯数字
      if (e.target.value === "") this.editWarp.className += " verify-cell";
      e.target.value = e.target.value.replace(/[^\d]/g, "");
      this.setState({ value: e.target.value });
    } else {
      // 所有都可以输入
      if (e.target.value === "") this.editWarp.className += " verify-cell";
      this.setState({ value: e.target.value });
    }
  };

  render() {
    const { value, editable } = this.state;
    return (
      <div className="editable-cell">
        {editable ? (
          <div
            ref={el => (this.editWarp = el)}
            className="editable-cell-input-wrapper"
          >
            <input
              className={value ? "u-form-control" : "u-form-control error"}
              autoFocus
              defaultValue={this.props.value}
              value={value}
              onKeyDown={this.handleKeydown}
              onChange={this.handleChange}
              onBlur={this.commitChange}
            />
            {value === "" ? (
              <Tooltip
                inverse
                className="u-editable-table-tp"
                placement="bottom"
                overlay={
                  <div className="tp-content">
                    {"请输入" + this.props.colName}
                  </div>
                }
              >
                <Icon className="uf-exc-t require" />
              </Tooltip>
            ) : null}
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
export default StringEditCell;
