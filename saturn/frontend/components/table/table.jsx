import {BuildColumns} from "./columns.jsx";
import React, {Component} from 'react';
import {Button, Dropdown, Space, Table} from 'antd';
import {DownOutlined} from '@ant-design/icons';
import {Overlay} from "../dropdown-overlay/Overlay.jsx";
import {Link} from "react-router-dom";

class ModelTable extends Component {
  state = {
    data: [],
    selectedRowKeys: []
  };

  columns() {
    return BuildColumns()
  }

  onRowSelectionChange = (selectedRowKeys) => {
    this.setState({selectedRowKeys})
  }

  onDeleteAction = () => {
    const {selectedRowKeys, data} = this.state
    const updatedDate = data.filter(item => !selectedRowKeys.includes(item.id))
    this.setState({data: updatedDate})
  }

  componentDidMount() {
    fetch('/saturn/sandbox/dummyuser/')
      .then(response => response.json())
      .then(data => this.setState({data: data.users}))
  }

  render() {
    const { data, selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onRowSelectionChange
    }
    return (
      <>
        <Space style={{ marginBottom: 16 }}>
          <Dropdown overlay={Overlay(this.onDeleteAction)} trigger={["click"]}>
            <Button>Actions<DownOutlined/></Button>
          </Dropdown>
          <Link to={'/saturn/sandbox/dummyuser/add/'}><Button>Add</Button></Link>
        </Space>
        <Table
          rowKey={user => user.id}
          rowSelection={rowSelection}
          columns={this.columns()}
          dataSource={data}
        />
      </>
    );
  }
}
export default ModelTable;
