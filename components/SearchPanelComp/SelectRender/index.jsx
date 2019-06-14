import React, { Component } from "react";

import { Select } from "tinper-bee";
const Option = Select.Option;
import PropTypes from "prop-types";
export default class SelectRender extends React.Component {
   handChange(value) {
      if (typeof value == "string") {
         this.props.onChange(value);
      } else if (Array.isArray(value) && value.length > 0) {
         this.props.onChange(value.join(","));
      } else {
         this.props.onChange("");
      }
   }

   render() {
      let { value, placeholder, disabled, multiple, dataSource } = this.props;

      if (value && typeof value == "string") {
         value = value.split(",");
      } else if (Array.isArray(value) && value.length > 0) {
         value = value;
      } else {
         value = "";
      }
      return (
         <Select
            //placeholder={placeholder}
            className="item-content"
            disabled={disabled}
            multiple={multiple}
            onChange={this.handChange.bind(this)}
            value={value}>
            <Option value="" className="default">
               {placeholder}
            </Option>
            {Array.isArray(dataSource) && dataSource.length > 0
               ? dataSource.map((item, index) => {
                    return (
                       <Option key={index} value={item.value}>
                          {item.name}
                       </Option>
                    );
                 })
               : []}
         </Select>
      );
   }
}

const propTypes = {
   value: PropTypes.oneOfType([PropTypes.element, PropTypes.string, PropTypes.array]),
   placeholder: PropTypes.string,
   disabled: PropTypes.bool,
   multiple: PropTypes.bool,
   dataSource: PropTypes.array,
   onChange: PropTypes.func
};

const defaultProps = {
   value: "",
   placeholder: "请选择",
   disabled: "false",
   multiple: "false",
   dataSource: [],
   onChange: () => {}
};
