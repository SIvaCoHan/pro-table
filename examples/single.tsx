import React, { useState } from 'react';
import { Button, Input } from 'antd';
import moment from 'moment';
import ProTable, { ProColumns, TableDropdown, TableStatus } from '../src';

const data: {
  key: string | number;
  name: string;
  age: string | number;
  address: string;
  money: number;
  date: number;
  sex: string;
}[] = [];
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

const columns: ProColumns[] = [
  {
    title: '序号',
    dataIndex: 'index',
    valueType: 'index',
  },
  {
    title: '边框序号',
    dataIndex: 'indexBorder',
    valueType: 'indexBorder',
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
    renderText: text => (text === 'man' ? '男' : '女'),
  },
  {
    title: 'Age',
    dataIndex: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    ellipsis: true,
    width: 100,
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
  },
  {
    title: '状态',
    dataIndex: 'status',
    render: () => (
      <div>
        <TableStatus.Success>上线成功</TableStatus.Success>
        <br />
        <TableStatus.Error>上线失败</TableStatus.Error>
        <br />
        <TableStatus.Processing>正在部署</TableStatus.Processing>
        <br />
        <TableStatus.Init>正在初始化</TableStatus.Init>
      </div>
    ),
  },
  {
    title: 'option',
    valueType: 'option',
    dataIndex: 'id',
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
  data: {
    key: string | number;
    name: string;
    age: string | number;
    address: string;
  }[];
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
        backgroundColor: '#fff',
      }}
    >
      <ProTable
        size="small"
        columns={columns}
        url={request}
        rowKey="key"
        params={{ keyword }}
        renderToolBar={action => [
          <Input.Search
            style={{
              width: 200,
            }}
            onSearch={value => setKeyword(value)}
          />,
          <Button
            onClick={() => {
              action.reload();
            }}
            key="1"
            type="primary"
            style={{
              marginRight: 8,
            }}
          >
            刷新
          </Button>,
          <Button
            key="2"
            style={{
              marginRight: 8,
            }}
            onClick={() => {
              action.setCurrent(3);
            }}
            type="dashed"
          >
            跳转到第三页
          </Button>,
          <Button
            key="3"
            onClick={() => {
              action.resetPageIndex();
            }}
            type="default"
            style={{
              marginRight: 8,
            }}
          >
            重置
          </Button>,
          <TableDropdown.Button
            onSelect={key => window.alert(key)}
            menus={[
              { key: 'copy', name: '复制' },
              { key: 'clear', name: '清空' },
            ]}
          >
            更多操作
          </TableDropdown.Button>,
        ]}
        pagination={{
          defaultCurrent: 10,
        }}
      />
    </div>
  );
};
