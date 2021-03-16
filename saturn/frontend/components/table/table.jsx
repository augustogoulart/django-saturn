import {BuildColumns} from "./columns.jsx";
import React, {Component} from 'react';
import {Button, Dropdown, message, Space, Table} from 'antd';
import {DownOutlined} from '@ant-design/icons';
import {Overlay} from "../dropdown-overlay/Overlay.jsx";
import {Link} from "react-router-dom";
import Cookies from "js-cookie";

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

    const csrftoken = Cookies.get('csrftoken');
    const headers = new Headers();
    headers.append('X-CSRFToken', csrftoken);

    fetch('/saturn/__sandbox__/dummyuser/delete/', {
      method: 'POST',
      body: selectedRowKeys,
      headers: headers,
      credentials: 'include'
    })
      .then(()=> {message.success("Deleted");this.handleDelete(data, selectedRowKeys)})
      .catch(() => message.error("Failed to delete"))
  }

  handleDelete = (data, selectedRowKeys) => {
    const updatedDate = data.filter(item => !selectedRowKeys.includes(item.id))
    this.setState({data: updatedDate})
  }

  componentDidMount() {
    fetch('/saturn/__sandbox__/dummyuser/')
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
