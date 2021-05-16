import styles from '../index.less';
import React, { useContext, useState, useEffect, useRef } from 'react';
import { Table, Input, Button, Form, Popconfirm, Space } from 'antd';
import { EditOutlined,PlusOutlined ,DeleteOutlined,SaveOutlined } from '@ant-design/icons'
import { connect } from 'umi'
const EditableContext = React.createContext();

const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};


const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef();
  const form = useContext(EditableContext);

  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({ [dataIndex]: record[dataIndex] });
  };

  const save = async e => {
    try {
      const values = await form.validateFields();

      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{ margin: 0 }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div className="editable-cell-value-wrap" style={{ paddingRight: 24 }} onClick={toggleEdit}>
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

const DataEdit = (props) => {
  const { dispatch, seriesData} = props
  // console.log(seriesData)
  /**
   * 行配置
   */
  const column = [
    {
      title: 'name',
      dataIndex: 'name',
      width: '40%',
      editable: true,
    },
    {
      title: 'value',
      dataIndex: 'value',
      width: '40%',
      editable: true,
    },
    {
      title: 'operation',
      dataIndex: 'operation',
      width: '20%',
      render: (text, record) =>
        dataSource.length >= 1 ? (
          <Popconfirm title="确认删除吗?" onConfirm={() => handleDelete(record.key)}>
            <a>删除</a>
          </Popconfirm>
        ) : null,
    },
  ];
  const [dataSource, setDataSource] = useState(seriesData.data);
  const [count, setCount] = useState(seriesData.data.length);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  useEffect(() => {
    setDataSource(seriesData.data)
  }, seriesData.data);
  /**
   * 删除单条数据
   * @param key 
   */
  const handleDelete = (key) => {
    setDataSource( dataSource.filter(item => item.key != key) );
  };
  /**
   * 添加数据
   */
  const handleAdd = () => {
    const newData = {
      key: count,
      name: `类型${count}`,
      value: (Math.random() * 100).toFixed(0),
    };
    setDataSource( [...dataSource, newData] )
    setCount( count + 1 );
  };
  /**
   * 删除选中数据
   */
  const handleDel = () => {
    let newDataSource = [...dataSource];
    selectedRowKeys.length > 0 && selectedRowKeys.forEach(key => {
      newDataSource = newDataSource.filter(item => item.key !== key)
    });
    setDataSource(newDataSource );
  }
  const handleSave = row => {
    const newData = [...dataSource];
    const index = newData.findIndex(item => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setDataSource( newData );
  };


  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };
  const columns = column.map(col => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: record => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave: handleSave,
      }),
    };
  });
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedRowKeys(selectedRowKeys )
    },
  };
  const saveData = ()=>{
    props.saveSeriesData(dataSource)
  }
  return (
    <div className={styles.container}>
      <div id="components-table-demo-edit-cell">
        <Space>
          <Button onClick={handleAdd} icon={<PlusOutlined />} type="dash" style={{ marginBottom: 16 }}>
            添加数据
        </Button>
          <Button onClick={handleDel} icon={<DeleteOutlined />} type="dash" style={{ marginBottom: 16 }}>
            删除选中数据
        </Button>
        <Button type="primary" onClick={saveData} icon={<SaveOutlined />} style={{ marginBottom: 16 }}>保存</Button>
        </Space>
        <Table
          components={components}
          rowSelection={{
            type: 'checkbox',
            ...rowSelection,
          }}
          rowClassName={() => 'editable-row'}
          bordered
          pagination={false}
          size="small"
          scroll={{ y: 300 }}
          dataSource={dataSource}
          columns={columns}
        />
      </div>
    </div>
  );
}


const mapStateToProps = (state) => {
  return state
}
export default connect(mapStateToProps)(DataEdit)
