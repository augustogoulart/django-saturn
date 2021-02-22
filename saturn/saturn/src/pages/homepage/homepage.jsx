import React, {Component} from "react";
import {Table} from 'antd';
import {Link} from 'react-router-dom';

import 'antd/dist/antd.css';
import './homepage.scss';

class HomePage extends Component {
  state = {
    searchText: '',
    searchedColumn: '',
    context: {
      app_list:[]
    }
  };

  constructor() {
    super();

  }

  componentDidMount() {
    fetch("/saturn/")
      .then(response => response.json())
      .then(context => this.setState({context}))
  }

  render() {
    const {context: {app_list}} = this.state

    return (
      <>
        {
          app_list.map(
            app =>
              <Table
                style={{"padding":"3vh"}}
                key={app.app_label}
                columns={[{
                       title:app.name,
                       key:app.app_label,
                       dataIndex: "name",
                       render: (name, row) =>  <Link to={row.admin_url}>{name}</Link>
                     }]}
                dataSource={app.models}
                pagination={false}/>)
        }
      </>

    )
  }
}

export default HomePage;
