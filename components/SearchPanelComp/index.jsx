import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Form, Icon, Button, Label, Select, InputNumber, Message } from "tinper-bee";
import PropTypes from "prop-types";
import RefComponent from "components/RefComponent";
import DateRender from "./DateRender";
import DateTimeRender from "./DateRender/DateTimeRender";
import MonthRender from "./DateRender/MonthRender";
import RangeRender from "./DateRender/RangeRender";
import YearRender from "./DateRender/YearRender";
import SelectRender from "./SelectRender";
import FormControl from "./FormControl";

// import DatePicker from "tinper-bee/lib/Datepicker";
// const { YearPicker, MonthPicker, WeekPicker, RangePicker } = DatePicker;

const FormItem = Form.FormItem;
const Option = Select.Option;

import "./index.less";

const OPERATOR = {
   EQ: "EQ",
   LIKE: "LIKE",
   GT: "GT",
   LT: "LT",
   GTE: "GTE",
   LTE: "LTE",
   NOTEQ: "NOTEQ",
   IN: "IN",
   NOTIN: "NOTIN",
   LIKEORIN: "LIKEORIN"
};
class SearchPanle extends Component {
   state = {
      btnState: false
   };

   onCollapse() {
      this.setState({
         btnState: !this.state.btnState
      });
   }

   onClear() {
      this.props.form.resetFields();
   }

   onOK = e => {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
         let tpl = this.props.tpl;
         //时间禁用范围
         //树组件
         //树表组件
         //选月组件 设置值 input框中值不显示
         //数值范围选择组件
         //visiable控制
         //收起模式由不渲染变为 display:none
         //默认值清不掉bug  参照组件组件内部值不清空bug
         if (err) {
            console.log(err);
            //Message.create({ content: "表单中有未填写必选项", color: "warning", duration: 2 });
         } else {
            let searchData = {};
            tpl.forEach(item => {
               let opr = OPERATOR.EQ;

               let lable = item.key;
               let truekey = item.key;
               let type = item.type;
               let flag = false;

               //搜索条件中的相关表字段处理
               if (lable.indexOf("--") > -1) {
                  truekey = truekey.replace(/--/g, ".");
                  flag = true;
               }

               if (type == "text") {
                  //输入框为 LIKE
                  opr = OPERATOR.LIKE;
               } else if (type == "combo" || type == "refer") {
                  //如果参照 枚举多选 都为IN，单选 为EQ
                  if (item.multi) {
                     opr = OPERATOR.IN;
                  }
               }

               //debugger;
               //重新定义key 赋值 转换
               if (type == "dateRange") {
                  //时间区间
                  let v = values[lable];
                  let v1 = Array.isArray(v) && v.length > 0 ? v[0] : "";
                  let v2 = Array.isArray(v) && v.length > 1 ? v[1] : "";
                  if (v) {
                     if (flag) {
                        searchData[`search_${OPERATOR.GTE}_${truekey}_date`] = v1;
                        searchData[`search_${OPERATOR.LTE}_${truekey}_date`] = v2;
                     } else {
                        searchData[`search_${OPERATOR.GTE}_${lable}_date`] = v1;
                        searchData[`search_${OPERATOR.LTE}_${lable}_date`] = v2;
                     }
                  }
               } else if (type == "refer") {
                  //参照
                  let newRefDate = values[lable] ? JSON.parse(values[lable]) : null;

                  newRefDate =
                     Object.prototype.toString.call(newRefDate) == "[object Object]" ? newRefDate.refpk : null;
                  if (newRefDate) {
                     if (flag) {
                        searchData[`search_${opr}_${truekey}`] = newRefDate;
                     } else {
                        searchData[`search_${opr}_${lable}`] = newRefDate;
                     }
                  }
               } else {
                  let v = values[lable];
                  if (opr == OPERATOR.LIKE && v) {
                     v = "%" + v + "%";
                  }
                  if (v || (item.type == "number" && v == 0)) {
                     if (flag) {
                        searchData[`search_${opr}_${truekey}`] = v;
                     } else {
                        searchData[`search_${opr}_${lable}`] = v;
                     }
                  }
               }
            });

            this.props.onOK(searchData);
         }
      });
   };

   clearMatch = param => {
      this.clearMatchData = param.clearMatchData;
   };

   createFormType(item, index) {
      let { getFieldProps, getFieldError } = this.props.form;
      let disabled = item.disabled;
      let placeholder = "";
      if (item.placeholder) {
         placeholder = item.placeholder;
      } else {
         if (item.type == "combo") {
            placeholder = "请选择" + item.label;
         } else if (item.type == "dateRange") {
            placeholder = "开始" + item.label + " ~ 结束" + item.label;
         } else {
            placeholder = "请选择" + item.label;
         }
      }

      let options = {};
      if (item.initialValue) {
         options.initialValue = item.initialValue;
      }

      if (item.type == "refer") {
         if (item.required) {
            options.rules = [
               {
                  required: true,
                  message: (
                     <span>
                        <Icon type="uf-exc-t" />
                        <span>{`请输入${item.label}`}</span>
                     </span>
                  ),
                  pattern: /[^{"refname":"","refpk":""}|{"refpk":"","refname":""}]/
               }
            ];
         } else {
            options.rules = [];
         }
      } else {
         if (item.required) {
            options.rules = [
               {
                  required: item.required,
                  message: (
                     <span>
                        <Icon type="uf-exc-t" />
                        <span>{`请输入${item.label}`}</span>
                     </span>
                  )
               }
            ];
         }
      }

      if (item.type == "text") {
         return (
            <FormControl
               key={index}
               placeholder={placeholder}
               className="item-content"
               showClose={true}
               disabled={disabled}
               {...getFieldProps(item.key, options)}
            />
         );
      } else if (item.type == "combo") {
         let dataSource = item.dataSource;
         return (
            <SelectRender
               key={index}
               placeholder={placeholder}
               className="item-content"
               disabled={disabled}
               multiple={item.multi}
               dataSource={item.dataSource}
               {...getFieldProps(item.key, options)}
            />
         );
      } else if (item.type == "date") {
         return (
            <DateRender
               disabled={disabled}
               key={index}
               placeholder={placeholder}
               format={item.format}
               {...getFieldProps(item.key, options)}
            />
         );
      } else if (item.type == "dateRange") {
         return (
            <RangeRender
               disabled={disabled}
               key={index}
               placeholder={placeholder}
               format={item.format}
               {...getFieldProps(item.key, options)}
            />
         );
      } else if (item.type == "mounthRender") {
         return (
            <MonthRender
               disabled={disabled}
               key={index}
               placeholder={placeholder}
               format={item.format}
               {...getFieldProps(item.key, options)}
            />
         );
      } else if (item.type == "dateTimeRender") {
         return (
            <DateTimeRender
               disabled={disabled}
               key={index}
               placeholder={placeholder}
               format={item.format}
               {...getFieldProps(item.key, options)}
            />
         );
      } else if (item.type == "yearRender") {
         return (
            <YearRender
               disabled={disabled}
               key={index}
               placeholder={placeholder}
               format={item.format}
               {...getFieldProps(item.key, options)}
            />
         );
      } else if (item.type == "number") {
         let { precision } = item;
         debugger;
         return (
            <InputNumber
               disabled={disabled}
               key={index}
               placeholder={placeholder}
               className="item-content"
               iconStyle="one"
               toThousands={true}
               precision={precision}
               {...getFieldProps(item.key, options)}
            />
         );
      } else if (item.type == "refer") {
         return (
            <RefComponent
               disabled={disabled}
               key={index}
               placeholder={placeholder}
               refName={item.refinfo}
               fieldName={item.key}
               clearMatchData={this.clearMatch}
               multiple={item.multi}
               clientParam={item.clientParam}
               refCode={item.refCode}
               colData={
                  item.colData
                     ? item.colData
                     : {
                          strFieldCode: ["refcode", "refname"],
                          strFieldName: ["编码", "名称"]
                       }
               }
               form={this.props.form}
               title={item.title ? item.title : item.label}
               rules={options.rules}
            />
         );
      }
   }

   tplCreate(tpl) {
      let { getFieldProps, getFieldError } = this.props.form;
      let { btnState } = this.state;
      return tpl.map((item, index) => {
         if (!btnState && index >= 2) {
            return "";
         } else {
            return (
               <FormItem key={index}>
                  <div className={item.disabled ? "item disabled" : "item"}>
                     <div className="asterisk">{item.required ? <Icon type="uf-mi" className="mast" /> : ""}</div>
                     {this.createFormType(item, index)}
                  </div>
                  <div className="error">{getFieldError(item.key)}</div>
               </FormItem>
            );
         }
      });
   }

   render() {
      const { getFieldProps, getFieldError } = this.props.form;
      let self = this;
      let { btnState } = this.state;
      let { tpl } = this.props;
      return (
         <div className={btnState ? "from-item-container more" : "from-item-container less"}>
            <Form>
               <div className="form-item">
                  {this.tplCreate(tpl)}
                  <div className="handle">
                     <span onClick={self.onOK.bind(self)}>查询</span>
                     <span onClick={self.onClear.bind(self)}>清空</span>
                     {Array.isArray(tpl) && tpl.length <= 2 ? (
                        ""
                     ) : (
                        <span onClick={self.onCollapse.bind(self)}>{btnState ? "收起" : "展开"}</span>
                     )}
                  </div>
               </div>
            </Form>
         </div>
      );
   }
}

export default Form.createForm({})(SearchPanle);

const propTypes = {
   tpl: PropTypes.array,
   onOK: PropTypes.func
};

const defaultProps = {
   tpl: [],
   onOK: () => {}
};
