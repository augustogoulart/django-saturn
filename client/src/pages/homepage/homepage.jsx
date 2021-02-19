import {Component} from "react";
import {Table} from 'antd';

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
              <Table key={app.app_label}
                     columns={[{
                           title:app.name,
                           key:app.app_label,
                           dataIndex: "name"
                         }]}
                     dataSource={app.models}
                     pagination={false}/>)
        }
      </>

    )
  }
}

export default HomePage;
