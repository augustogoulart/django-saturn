import {BuildColumns} from "./columns.jsx";
import React, {Component} from 'react';
import {Button, Dropdown, message, Space, Table} from 'antd';
import {DownOutlined} from '@ant-design/icons';
import {Overlay} from "../dropdown-overlay/Overlay.jsx";
import {Link} from "react-router-dom";
import Cookies from "js-cookie";

class ModelTable extends Component {
  state = {
    dataSource: [],
    title: null,
    selectedRowKeys: [],
    modelName: this.props.match.params.modelName,
    appName: this.props.match.params.appName,
  };

  columns() {
    const {dataSource, modelName, appName, title} = this.state
    return BuildColumns(dataSource, modelName, appName, title)
  }

  onRowSelectionChange = (selectedRowKeys) => {
    this.setState({selectedRowKeys})
  }

  onDeleteAction = () => {
    const {selectedRowKeys, data, modelName, appName} = this.state

    const csrftoken = Cookies.get('csrftoken');
    const headers = new Headers();
    headers.append('X-CSRFToken', csrftoken);

    fetch(`/saturn/api/${appName}/${modelName}/`, {
      method: 'POST',
      body: selectedRowKeys,
      headers: headers,
      credentials: 'include'
    })
      .then(() => {
        message.success("Deleted");
        this.handleDelete(data, selectedRowKeys)
      })
      .catch(() => message.error("Failed to delete"))
  }

  handleDelete = (data, selectedRowKeys) => {
    const updatedDate = data.filter(item => !selectedRowKeys.includes(item.id))
    this.setState({data: updatedDate})
  }

  componentDidMount() {
    const {modelName, appName} = this.state

    fetch(`/saturn/api/${appName}/${modelName}/`)
      .then(response => response.json())
      .then(dataSource => this.setState({dataSource: dataSource}))
  }

  render() {
    const {selectedRowKeys, modelName, appName, dataSource} = this.state
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onRowSelectionChange
    }

    return (
      <>
        <Space style={{marginBottom: 16}}>
          <Dropdown overlay={Overlay(this.onDeleteAction)} trigger={["click"]}>
            <Button>Actions<DownOutlined/></Button>
          </Dropdown>
          <Link to={`/saturn/${appName}/${modelName}/add/`}><Button>Add</Button></Link>
        </Space>
        <Table
          rowKey={obj => obj.id}
          rowSelection={rowSelection}
          columns={this.columns()}
          dataSource={dataSource}
        />
      </>
    );
  }
}

export default ModelTable;
