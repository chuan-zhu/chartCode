import { Collapse, Form, Input, Button, Checkbox, InputNumber, Switch, Select, Col } from 'antd';
const { Option } = Select;
// 像素/百分比
export const unit2 = (
    <Select defaultValue="px" className="select-after">
        <Option value="px">px</Option>
        <Option value="%">%</Option>
    </Select>
);
// 像素/百分比
export const unit1 = (
    <Select defaultValue="px" className="select-after">
        <Option value="px">px</Option>
    </Select>
);