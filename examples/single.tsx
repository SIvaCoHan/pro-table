import React, { useState } from 'react';
import { Button, Input, Select } from 'antd';
import moment from 'moment';
import ProTable, { ProColumns, TableDropdown } from '../src';

interface DataItem {
  key: string | number;
  name: string;
  age: string | number;
  address: string;
  money: number;
  date: number;
  sex: string;
}

const data: DataItem[] = [];
for (let i = 0; i < 46; i += 1) {
  data.push({
    key: i,
    sex: i % 2 === 0 ? 'man' : 'woman',
    name: `Edward King ${i}`,
    age: 10 + i,
    money: parseFloat((10000.26 * (i + 1)).toFixed(2)),
    date: moment('2019-11-16 12:50:26').valueOf() + i * 1000 * 60 * 2,
    address: `London, Park Lane no. ${i}`,
  });
}

const columns: ProColumns<DataItem>[] = [
  {
    title: '序号',
    dataIndex: 'index',
    valueType: 'indexBorder',
    fixed: 'left',
    width: 80,
  },
  {
    title: 'Name',
    dataIndex: 'name',
    copyable: true,
  },
  {
    title: 'sex',
    dataIndex: 'sex',
    copyable: true,
    initialValue: 'man',
    valueEnum: {
      man: '男',
      woman: '女',
    },
  },
  {
    title: 'Age',
    dataIndex: 'age',
    hideInSearch: true,
  },
  {
    title: 'Address',
    dataIndex: 'address',
    ellipsis: true,
    renderFormItem: (item, config) => (
      <Select {...config}>
        <Select.Option value="山西">山西</Select.Option>
        <Select.Option value="杭州">杭州</Select.Option>
      </Select>
    ),
  },
  {
    title: 'money',
    dataIndex: 'money',
    valueType: 'money',
  },
  {
    title: 'date',
    key: 'date',
    dataIndex: 'date',
    valueType: 'date',
  },
  {
    title: 'dateTime',
    key: 'dateTime',
    dataIndex: 'date',
    valueType: 'dateTime',
  },
  {
    title: 'time',
    key: 'time',
    dataIndex: 'date',
    valueType: 'time',
    hideInTable: true,
  },
  {
    title: 'option',
    valueType: 'option',
    dataIndex: 'id',
    fixed: 'right',
    render: (text, row, index, action) => [
      <a
        onClick={() => {
          window.alert('确认删除？');
          action.reload();
        }}
      >
        delete
      </a>,
      <a
        onClick={() => {
          window.alert('确认刷新？');
          action.reload();
        }}
      >
        reload
      </a>,
      <TableDropdown
        onSelect={key => window.alert(key)}
        menus={[
          { key: 'copy', name: '复制' },
          { key: 'delete', name: '删除' },
        ]}
      />,
    ],
  },
];

const request = (): Promise<{
  data: DataItem[];
  success: true;
}> =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve({
        data,
        success: true,
      });
    }, 2000);
  });

export default () => {
  const [keyword, setKeyword] = useState<string>('');
  return (
    <div
      style={{
        padding: 48,
        backgroundColor: '#ddd',
      }}
    >
      <ProTable<DataItem>
        columns={columns}
        request={request}
        momentFormat="string"
        headerTitle="基础表单"
        params={{ keyword }}
        renderToolBar={action => [
          <Input.Search
            style={{
              width: 200,
            }}
            onSearch={value => setKeyword(value)}
          />,
          <Button
            key="2"
            onClick={() => {
              action.setCurrent(3);
            }}
            type="dashed"
          >
            go
          </Button>,
          <Button
            key="3"
            onClick={() => {
              action.resetPageIndex();
            }}
            type="default"
          >
            reset
          </Button>,

          <Button
            key="3"
            onClick={() => {
              action.resetPageIndex();
            }}
            type="primary"
          >
            新建
          </Button>,
        ]}
        pagination={{
          defaultCurrent: 10,
        }}
      />
    </div>
  );
};