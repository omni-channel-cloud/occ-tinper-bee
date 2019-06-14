import React, { Component } from "react";
import PropTypes from "prop-types";
import { Icon, FormControl } from "tinper-bee";
import DatePicker from "tinper-bee/lib/Datepicker";
const { RangePicker } = DatePicker;
import moment from "moment";

export default class RangeRender extends React.Component {
   handChange(value) {
      if (value == "") {
         this.props.onChange([]);
      } else if (Array.isArray(value) && value.length > 0) {
         this.props.onChange([value[0].valueOf(), value[1].valueOf()]);
      }
   }

   render() {
      let { onChange, value, placeholder, disabled } = this.props;
      if (Array.isArray(value) && value.length > 0) {
         let date1 = moment.isMoment(value[0]) ? value[0] : moment(value[0]);
         let date2 = moment.isMoment(value[1]) ? value[1] : moment(value[1]);
         value = [moment(date1), moment(date2)];
      } else {
         value = [];
      }

      return (
         <RangePicker
            placeholder={placeholder}
            defaultValue={[]}
            dateInputPlaceholder={["开始", "结束"]}
            onChange={this.handChange.bind(this)}
            value={value ? value : []}
            disabled={disabled}
         />
      );
   }
}

RangeRender.defaultProps = {
   placeholder: "开始时间~结束时间",
   disabled: false,
   onChange: () => {}
};

RangeRender.propTypes = {
   placeholder: PropTypes.string,
   disabled: PropTypes.bool,
   onChange: PropTypes.func
};
