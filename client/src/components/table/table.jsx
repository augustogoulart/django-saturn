import 'antd/dist/antd.css';
import {BuildColumns} from "./columns";
import {Component} from 'react';
import {Button, Dropdown, Menu, message, Space, Table} from 'antd';
import {DownOutlined} from '@ant-design/icons';


class SaturnTable extends Component {
  //TODO - There's a lot of User related information here that should be in the User's page.
  state = {
    filteredInfo: null,
    sortedInfo: null,
    data: null
  };

  handleChange = (pagination, filters, sorter) => {
    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter,
    });
  };

  clearFilters = () => {
    this.setState({ filteredInfo: null });
  };

  clearAll = () => {
    this.setState({
      filteredInfo: null,
      sortedInfo: null,
    });
  };

  setAgeSort = () => {
    this.setState({
      sortedInfo: {
        order: 'descend',
        columnKey: 'age',
      },
    });
  };

  onMenuItemClick({key}) {
    message.info(`User ${key} was deleted`)
  }

  componentDidMount() {
    fetch('/api/users/')
      .then(response => response.json())
      .then(response => this.setState({data: response.data}))
  }

  render() {
    let { sortedInfo, filteredInfo, data } = this.state;

    const columns = BuildColumns(sortedInfo, filteredInfo)

    const menu = (
      <Menu onClick={this.onMenuItemClick}>
        <Menu.Item key={0}>Delete Selected Users</Menu.Item>
      </Menu>
    )

    return (
      <>
        <Space style={{ marginBottom: 16 }}>
          <Dropdown overlay={menu} trigger={["click"]}>
            <Button>Actions<DownOutlined/></Button>
          </Dropdown>
          <Button onClick={this.setAgeSort}>Sort age</Button>
          <Button onClick={this.clearFilters}>Clear filters</Button>
          <Button onClick={this.clearAll}>Clear filters and sorters</Button>
        </Space>
        <Table rowSelection={{type: "checkbox"}} columns={columns} dataSource={data} onChange={this.handleChange} />
      </>
    );
  }
}
export default SaturnTable;
