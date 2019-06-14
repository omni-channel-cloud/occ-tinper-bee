> 调用方式

```
   <SearchPanle
       onOK={this.onSearchOk}
       tpl={this.tpl}
   />

   tpl:组件描述
   onOK:点击查询获取数据的方法

```

> 组件描述 `tpl`

```
目前支持的所有类型：

this.tpl = [
         {
            type: "text",
            key: "text--id",
            label: "文本",
            //required: true,
            disabled: false
         },
         {
            type: "combo",
            key: "cccc--id",
            label: "枚举",
            multi: false,
            //required: true,
            disabled: false,
            placeholder: "全部",
            dataSource: [
               {
                  value: "001",
                  name: "类型1"
               },
               {
                  value: "002",
                  name: "类型2"
               },
               {
                  value: "003",
                  name: "类型3"
               }
            ]
         },
         {
            type: "refer",
            key: "organizationId",
            label: "参照",
            refinfo: "organization",
            multi: false,
            //required: true,
            disabled: false,
            title: "组织1"
            //refCode: '{"EQ_areaLevel":"3","EQ_parent.id":""}'
            //clientParam: '{"EQ_areaLevel":"3","EQ_parent.id":""}'
         },
         {
            type: "date",
            key: "time",
            label: "时间",
            //required: true,
            format: "YYYY-MM-DD",
            disabled: false,
            visiable: true
         },
         {
            type: "dateRange",
            key: "time1",
            label: "时间范围",
            //required: true,
            disabled: false
            //placeholder: "111"
         },
         {
            type: "mounthRender",
            key: "time2",
            label: "选择月",
            //required: true,
            disabled: false
         },
         {
            type: "dateTimeRender",
            key: "time3",
            label: "日期+时间",
            //required: true,
            disabled: false
         },
         {
            type: "yearRender",
            key: "time4",
            label: "年",
            //required: true,
            disabled: false
            //format: "YYYY-MM-DD"
         },
         {
            type: "number",
            key: "num",
            label: "数字",
            disabled: false,
            //required: true,
            initialValue: "3213"
         }
      ];
   }

```

> 参数

#### type ：组件渲染类型

> `key值为：parent.id 要写成 parent--id`

> **`text`** 文本类型

| 参数        | 说明                                | 值类型  |
| ----------- | ----------------------------------- | ------- |
| key         | 字段 key 值                         | string  |
| label       | 字段名称                            | string  |
| required    | 是否必填                            | boolean |
| disabled    |  是否可编辑                         | boolean |
| placeholder |  描述输入字段预期值的简短的提示信息 | string  |

> **`refer`** 参照类型

| 参数        | 说明                                | 值类型    |
| ----------- | ----------------------------------- | --------- |
| key         | 字段 key 值                         | string    |
| label       | 字段名称                            | string    |
| required    | 是否必填                            | boolean   |
| disabled    |  是否可编辑                         | boolean   |
| placeholder |  描述输入字段预期值的简短的提示信息 | string    |
| refinfo     |  参照类型                           | string    |
| multi       |  是否多选                           | boolean   |
| title       |  参照标题                           | string    |
| clientParam |  参照扩展参数                       | string {} |
| refCode     | 自定义档案 code                     | string {} |

> **`combo`** 枚举类型

| 参数       | 说明          | 值类型  |
| ---------- | ------------- | ------- |
| key        | 字段 key 值   | string  |
| label      | 字段名称      | string  |
| required   | 是否必填      | boolean |
| disabled   |  是否可编辑   | boolean |
| dataSource |  枚举预置参数 | array   |
| multi      |  是否多选     | boolean |

---

##### 时间组件渲染类型

> **`date`**  日期类型

> **`dateRange`** 日期范围类型

> **`mounthRender`** 月类型

> **`dateTimeRender`** 日期+时间类型

> **`yearRender`** 年类型

| 参数     | 说明         | 值类型  |
| -------- | ------------ | ------- |
| key      | 字段 key 值  | string  |
| label    | 字段名称     | string  |
| required | 是否必填     | boolean |
| disabled |  是否可编辑  | boolean |
| format   |   日期格式化 | string  |

##### 数字组件渲染类型

> **`number`** 数字类型可点击上下箭头增加数量

| 参数      | 说明                                      | 值类型  |
| --------- | ----------------------------------------- | ------- |
| key       | 字段 key 值                               | string  |
| label     | 字段名称                                  | string  |
| required  | 是否必填                                  | boolean |
| disabled  |  是否可编辑                               | boolean |
| precision |  显示精度。`如要输入小数，此属性必须设置` | number  |

> **`numberRange`** 数字范围类型 还未完成
