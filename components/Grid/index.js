import React, { Component } from "react";
import BeeGrid from "bee-complex-grid";
import { Checkbox, FormControl } from "tinper-bee";
import Icon from "bee-icon";
import "./index.less";
import moment from "moment";
import StringEditCell from "./src/StringEditCell";
import SelectEditCell from "./src/SelectEditCell";
import DatePickerEditCell from "./src/DatePickerEditCell";

const defualtPaginationParam = {
  dataNumSelect: ["5", "10", "15", "20", "25", "50", "All"],
  horizontalPosition: "center",
  verticalPosition: "bottom",
  dataNum: 4,
  btnType: {
    shape: "border"
  },
  noBorder: true,
  confirmBtn: () => null
};
const defaultProps = {
  //   hideBodyScroll: true,
  headerScroll: false,
  bordered: false,
  data: []
};

class Grid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refresh: true
    };
  }

  /**
   *获取保存的column和table上的属性
   *
   */
  getColumnsAndTablePros = () => {
    return this.grid.getColumnsAndTablePros();
  };
  /**
   *
   * 重置grid的columns
   */
  resetColumns = newColumns => {
    this.grid.resetColumns(newColumns);
  };

  exportExcel = () => {
    this.grid.exportExcel();
  };

  // 模板转换的render
  columnsRender(record, item, index) {
    // console.log(item);
    let returnDiv = "";
    switch (item.type) {
      case "text":
        returnDiv =
          item.editable != 0 ? (
            <StringEditCell
              typeFlag={item.type}
              colName={item.label}
              value={record[item.key]}
              onChange={e => {
                record[item.key] = e;
                // this.setState({ refresh: !this.state.refresh });
              }}
            />
          ) : (
            <span>{record[item.key]}</span>
          );
        break;
      case "integer":
        returnDiv =
          item.editable != 0 ? (
            <StringEditCell
              typeFlag={item.type}
              colName={item.label}
              value={record[item.key]}
              onChange={e => {
                record[item.key] = e;
                // this.setState({ refresh: !this.state.refresh });
              }}
            />
          ) : (
            <span>{record[item.key]}</span>
          );
        break;
      case "float":
        returnDiv =
          item.editable != 0 ? (
            <StringEditCell
              typeFlag={item.type}
              colName={item.label}
              value={record[item.key]}
              onChange={e => {
                record[item.key] = e;
                // this.setState({ refresh: !this.state.refresh });
              }}
            />
          ) : (
            <span>{record[item.key]}</span>
          );
        break;
      case "phone":
        returnDiv =
          item.editable != 0 ? (
            <StringEditCell
              typeFlag={item.type}
              colName={item.label}
              value={record[item.key]}
              onChange={e => {
                record[item.key] = e;
                // this.setState({ refresh: !this.state.refresh });
              }}
            />
          ) : (
            <span>{record[item.key]}</span>
          );
        break;
      case "date":
        returnDiv =
          item.editable != 0 ? (
            <span>
              {record[item.key]
                ? moment(record[item.key]).format("YYYY-MM-DD")
                : ""}
            </span>
          ) : (
            // <DatePickerEditCell
            //   format={"YYYY-MM-DD dddd"}
            //   value={record[item.key]}
            //   onChange={e => {
            //     record[item.key] = e;
            //     // this.setState({ refresh: !this.state.refresh });
            //   }}
            // />
            <span>
              {record[item.key]
                ? moment(record[item.key]).format("YYYY-MM-DD")
                : ""}
            </span>
          );
        break;
      case "datetime":
        returnDiv =
          item.editable != 0 ? (
            <span>
              {record[item.key]
                ? moment(record[item.key]).format("YYYY-MM-DD HH-MM-SS")
                : ""}
            </span>
          ) : (
            <span>{record[item.key]}</span>
          );
        break;
      case "boolean":
        returnDiv = (
          <Checkbox
            disabled={item.editable != 0 ? false : true}
            checked={record[item.key]}
            onChange={e => {
              record[item.key] = e;
              this.setState({ refresh: !this.state.refresh });
            }}
          />
        );
        break;
      case "textarea":
        returnDiv =
          item.editable != 0 ? (
            <StringEditCell
              colName={item.label}
              typeFlag={item.type}
              value={record[item.key]}
              onChange={e => {
                record[item.key] = e;
                // this.setState({ refresh: !this.state.refresh });
              }}
            />
          ) : (
            <span>{record[item.key]}</span>
          );
        break;
      case "combo":
        returnDiv =
          item.editable != 0 ? (
            <SelectEditCell
              // daataSource 格式必须为 id、code、name
              dataSource={item.dataSource}
              // value 是显示的值
              value={record[item.key]}
              // onSelectValue：选中的值要传给onchange的值（e）是id
              onSelectValue="name"
              onChange={e => {
                record[item.key] = e;
                // this.setState({ refresh: !this.state.refresh });
              }}
            />
          ) : (
            <span>{record[item.key]}</span>
          );
        break;
      case "docrefer":
        returnDiv =
          item.editable != 0 ? (
            <span>{record[item.key]}</span>
          ) : (
            <span>{record[item.key]}</span>
          );
        break;
      case "refer":
        returnDiv =
          item.editable != 0 ? (
            <span>{record[item.key]}</span>
          ) : (
            <span>{record[item.key]}</span>
          );
        break;
    }
    return returnDiv;
  }

  // 转换模板
  transColumns(columns) {
    const returnColumns = [];
    columns.forEach((item, dataIndex) => {
      returnColumns.push({
        title: item.label,
        dataIndex: dataIndex,
        key: item.key,
        width: 140,
        render: (text, record, index) => {
          return this.columnsRender(record, item, index);
        }
      });
    });
    return returnColumns;
  }

  render() {
    const {
      paginationObj,
      columns,
      data,
      exportData,
      ...otherProps
    } = this.props;
    const _paginationObj = { ...defualtPaginationParam, ...paginationObj };
    _paginationObj.disabled =
      paginationObj.disabled !== undefined
        ? paginationObj.disabled
        : data.length === 0;
    let _exportData = exportData || data;
    const newColumns = this.transColumns(columns);
    console.log(data);
    return (
      <div className="demo-grid-wrapper">
        <BeeGrid
          className="ucf-example-grid"
          data={data}
          columns={newColumns}
          {...otherProps}
          exportData={_exportData}
          paginationObj={_paginationObj}
          ref={el => (this.grid = el)}
        />
      </div>
    );
  }
}

Grid.defaultProps = defaultProps;
export default Grid;
