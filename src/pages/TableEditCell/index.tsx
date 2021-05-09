import styles from './index.less';
import React, { useContext, useState, useEffect, useRef } from 'react';
import { Table, Input, Button, Form, Modal ,Space} from 'antd';
import { EditOutlined } from '@ant-design/icons'
import DataEdit from './components/DataEdit'

const EditableContext = React.createContext<any>();

interface Item {
  key: string;
  name: string;
  age: string;
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
        title: 'name',
        dataIndex: 'name',
        width: '40%',
        editable: true,
      },
      {
        title: 'age',
        dataIndex: 'age',
        width: '40%',
      },
      {
        title: 'operation',
        dataIndex: 'operation',
        width: '20%',
        render: (text, record) =>
          this.state.dataSource.length >= 1 ? (
            <Button icon={<EditOutlined />} onClick={() => this.handleEdit(record.key)}>编辑</Button>
          ) : null,
      },
    ];

    this.state = {
      dataSource: [
        {
          key: '0',
          name: 'Edward King 0',
          age: '32',
        },
        {
          key: '1',
          name: 'Edward King 1',
          age: '32',
        },
      ],
      count: 2,
      isModalVisible: false
    };
  }
  /**
   * 
   * @param key 
   */
  handleEdit = key => {
    this.setState({ isModalVisible: true });
  };

  handleAdd = () => {
    const { count, dataSource } = this.state;
    const newData = {
      key: count,
      name: `Edward King ${count}`,
      age: 32,
    };
    this.setState({
      dataSource: [...dataSource, newData],
      count: count + 1,
    });
  };

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

  render() {
    const { dataSource, isModalVisible } = this.state;
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
    return (
      <div>
        <Space>
        <Button onClick={this.handleAdd} type="primary" style={{ marginBottom: 16 }}>
          添加新数据
        </Button>
        <Button onClick={this.handleAdd} type="primary" style={{ marginBottom: 16 }}>
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
        <Modal title="编辑数据" visible={isModalVisible} onOk={() => this.setState({ isModalVisible: false })} onCancel={() => this.setState({ isModalVisible: false })}>
          <DataEdit></DataEdit>
        </Modal>
      </div>
    );
  }
}

export default () => <div className={styles.container}><div id="components-table-demo-edit-cell"><TableEdit /></div></div>;
