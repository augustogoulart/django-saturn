import {BuildColumns} from "./columns.jsx";
import React, { useState, useEffect } from "react";
import {Button, Dropdown, message, Space, Table} from 'antd';
import {DownOutlined} from '@ant-design/icons';
import {Overlay} from "../dropdown-overlay/Overlay.jsx";
import {Link} from "react-router-dom";
import Cookies from "js-cookie";

function ModelTable(props){
  const [dataSource, setDataSource] = useState([])
  const [selectedRowKeys, setSelectedRowKeys] = useState([])

  const modelName = props.match.params.modelName;
  const appName = props.match.params.appName;

  useEffect(() => {fetch(`/saturn/api/${appName}/${modelName}/`)
    .then(response => response.json())
    .then(dataSource => setDataSource(dataSource))
  }, [])

  function columns() {
    return BuildColumns(dataSource, modelName, appName)
  }

  function onRowSelectionChange(selectedRowKeys){
    setSelectedRowKeys({selectedRowKeys})
  }

  function onDeleteAction(){
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
        handleDelete(data, selectedRowKeys)
      })
      .catch(() => message.error("Failed to delete"))
  }

  function handleDelete(data, selectedRowKeys){
    const updatedDate = data.filter(item => !selectedRowKeys.includes(item.id))
    setDataSource({data: updatedDate})
  }

  const rowSelection = {
    selectedRowKeys,
    onChange: onRowSelectionChange
  }

  return (
    <>
      <Space style={{marginBottom: 16}}>
        <Dropdown overlay={Overlay(onDeleteAction)} trigger={["click"]}>
          <Button>Actions<DownOutlined/></Button>
        </Dropdown>
        <Link to={`/saturn/${appName}/${modelName}/add/`}><Button>Add</Button></Link>
      </Space>
      <Table
        rowKey={obj => obj.id}
        rowSelection={rowSelection}
        columns={columns()}
        dataSource={dataSource}
      />
    </>
  );
}

export default ModelTable;
