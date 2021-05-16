import styles from './index.less';
import React, { useContext, useState, useEffect, useRef } from 'react';
import { Table, Input, Button, Form, Modal, Space, message } from 'antd';
import { EditOutlined, PlusOutlined, DeleteOutlined, SaveOutlined } from '@ant-design/icons'
import DataEdit from './components/DataEdit.jsx'
import { connect } from 'umi'
const EditableContext = React.createContext<any>();

interface Item {
  key: string;
  name: string;
}

interface EditableRowProps {
  index: number;
}

const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

interface EditableCellProps {
  title: React.ReactNode;
  editable: boolean;
  children: React.ReactNode;
  dataIndex: string;
  record: Item;
  handleSave: (record: Item) => void;
}

const EditableCell: React.FC<EditableCellProps> = ({
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

class TableEdit extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: '名称',
        dataIndex: 'name',
        width: '40%',
        editable: true,
      },
      {
        title: '操作',
        dataIndex: 'operation',
        width: '20%',
        render: (text, record) =>
          this.state.dataSource.length >= 1 ? (
            <Space>
              <Button icon={<EditOutlined />} onClick={() => this.handleEdit(record.key)}>编辑</Button>
              <Button icon={<DeleteOutlined />} onClick={() => this.handleDel(record.key)}>删除</Button>
            </Space>
          ) : null,
      },
    ];
    const { dataSet, dispatch } = props
    this.state = {
      dataSource: dataSet.dataSource,
      count: 1,
      isModalVisible: false,
    };
  }

  /**
   * 编辑所在数据
   * @param key 
   */
  handleEdit = key => {
    this.setState({ isModalVisible: true, });
    this.props.dispatch({
      type: 'dataSet/update',
      payload: { editTarget: key }
    })
  };

  /**
   * 删除当前行数据
   * @param key 
   */
  handleDel = (key) => {
    const { count, dataSource } = this.state;
    const newData = dataSource.filter(item => item.key !== key)
    this.setState({
      dataSource: newData,
      count: count - 1,
    });
  }
  /**
   * 新增一行数据
   */
  handleAdd = () => {
    const { count, dataSource } = this.state;
    const unitData = [{
      key: '0',
      name: '毛衣',
      value: (Math.random() * 100).toFixed(0),
    },
    {
      key: '1',
      name: '裤子',
      value: (Math.random() * 100).toFixed(0),
    },
    {
      key: '2',
      name: '羽绒服',
      value: (Math.random() * 100).toFixed(0),
    },
    {
      key: '3',
      name: '帽子',
      value: (Math.random() * 100).toFixed(0),
    },
    {
      key: '4',
      name: '短裙',
      value: (Math.random() * 100).toFixed(0),
    },
    {
      key: '5',
      name: '风衣',
      value: (Math.random() * 100).toFixed(0),
    }]
    if (count > 3) {
      message.warning('数据项添加过多！建议不超过4组数据');
    }
    const newData = {
      key: count,
      name: `2021年${count}组销售情况`,
      data: unitData
    };
    this.setState({
      dataSource: [...dataSource, newData],
      count: count + 1,
    });
  };
  /**
   * 保存数据
   * @param row 
   */
  handleSave = row => {
    const newData = [...this.state.dataSource];
    const index = newData.findIndex(item => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    this.setState({ dataSource: newData });
  };
  /**
   * 系列数据项保存
   */
  saveSeriesData = (newData) => {
    const { editTarget } = this.props.dataSet
    const { dataSource } = this.state;
    dataSource[editTarget].data = newData
    this.setState({
      dataSource
    })
    message.success('保存成功！');
    this.setState({ isModalVisible: false })
  }
  /**
   *全部数据保存
   */
  saveAllData = ()=>{
    const dataSource = this.state.dataSource;
    this.props.dispatch({
      type: 'dataSet/update',
      payload: { dataSource: dataSource }
    })
    message.success('保存成功！');
  }
  render() {
    const { dataSource, isModalVisible } = this.state;
    const { editTarget } = this.props.dataSet
    const components = {
      body: {
        row: EditableRow,
        cell: EditableCell,
      },
    };
    const columns = this.columns.map(col => {
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
          handleSave: this.handleSave,
        }),
      };
    });
    // console.log(dataSource[editTarget])
    return (
      <div className={styles.container}>
        <div id="components-table-demo-edit-cell">
          <Space>
            <Button onClick={this.handleAdd} icon={<PlusOutlined />} type="primary" style={{ marginBottom: 16 }}>
              添加新数据
        </Button>
            <Button onClick={this.saveAllData} icon={<SaveOutlined />} type="primary" style={{ marginBottom: 16 }}>
              保存
        </Button>
          </Space>
          <Table
            components={components}
            rowClassName={() => 'editable-row'}
            bordered
            dataSource={dataSource}
            columns={columns}
          />
          <Modal title="编辑数据"
            className={styles.modal}
            visible={isModalVisible}
            footer={null}
            onOk={() => this.setState({ isModalVisible: false })}
            onCancel={() => this.setState({ isModalVisible: false })}>
            <DataEdit seriesData={dataSource[editTarget]} saveSeriesData={(newSeriesData) => this.saveSeriesData(newSeriesData)}></DataEdit>
          </Modal>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return state
}
export default connect(mapStateToProps)(TableEdit)
