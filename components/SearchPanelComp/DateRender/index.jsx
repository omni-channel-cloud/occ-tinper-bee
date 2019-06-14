import React, { Component } from "react";

import { Icon, FormControl } from "tinper-bee";
import DatePicker from "tinper-bee/lib/Datepicker";
import PropTypes from "prop-types";
import moment from "moment";

export default class DateRender extends React.Component {
   handChange(value) {
      if (value == "") {
         this.props.onChange(null);
      } else {
         this.props.onChange(value.valueOf());
      }
   }

   render() {
      let { onChange, value, placeholder, format, disabled } = this.props;
      if (value) {
         if (moment.isMoment(value)) {
            value = value;
         } else {
            value = moment(value);
         }
      }
      return (
         <DatePicker
            disabled={disabled}
            placeholder={placeholder}
            onChange={this.handChange.bind(this)}
            value={value}
            format={format ? format : "YYYY-MM-DD"}
         />
      );
   }
}

const propTypes = {
   placeholder: PropTypes.string,
   disabled: PropTypes.bool,
   onChange: PropTypes.func,
   format: PropTypes.string
};

const defaultProps = {
   placeholder: "请选择",
   disabled: false,
   onChange: () => {},
   format: "YYYY-MM-DD"
};
