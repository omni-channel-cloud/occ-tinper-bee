import React, { Component } from "react";
import BeeGrid from "bee-complex-grid";
import Icon from "bee-icon";
import "./index.less";
import moment from "moment";

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
  columnsRender(record, item) {
    let returnDiv = "";
    switch (item.type) {
      case "text":
        returnDiv = <span>{record[item.key]}</span>;
        break;
      case "integer":
        returnDiv = <span>{record[item.key]}</span>;
        break;
      case "float":
        returnDiv = <span>{record[item.key]}</span>;
        break;
      case "phone":
        returnDiv = <span>{record[item.key]}</span>;
        break;
      case "date":
        returnDiv = (
          <span>
            {record[item.key]
              ? moment(record[item.key]).format("YYYY-MM-DD")
              : ""}
          </span>
        );
        break;
      case "datetime":
        returnDiv = (
          <span>
            {record[item.key]
              ? moment(record[item.key]).format("YYYY-MM-DD HH-MM-SS")
              : ""}
          </span>
        );
        break;
      case "boolean":
        returnDiv = <span>{record[item.key]}</span>;
        break;
      case "textarea":
        returnDiv = <span>{record[item.key]}</span>;
        break;
      case "combo":
        returnDiv = <span>{record[item.key]}</span>;
        break;
      case "docrefer":
        returnDiv = <span>{record[item.key]}</span>;
        break;
      case "refer":
        returnDiv = <span>{record[item.key]}</span>;
        break;
      default:
        returnDiv = <span>{record[item.key]}</span>;
        break;
    }
    return returnDiv;
  }

  // 转换模板
  transColumns(columns) {
    const returnColumns = [];
    columns.schema.tabs.forEach(tabItem => {
      tabItem.comps[0].items.forEach((item, dataIndex) => {
        returnColumns.push({
          title: item.label,
          dataIndex: dataIndex,
          key: item.key,
          width: 140,
          render: (text, record, index) => {
            return this.columnsRender(record, item);
          }
        });
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
