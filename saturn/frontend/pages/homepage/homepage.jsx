import React from "react";
import {Table} from 'antd';
import {Link} from 'react-router-dom';

import './homepage.scss';

function HomePage() {
  const app_list = []
  return (
    <>
      {
        app_list.map(
          app =>
            <Table
              style={{"padding": "3vh"}}
              key={app.app_label}
              rowKey={'name'}
              columns={[{
                title: app.name,
                key: app.app_url,
                dataIndex: "name",
                render: (name, row) => <Link to={row['frontend_url']}>{name}</Link>
              }]}
              dataSource={app.models}
              pagination={false}/>)
      }
    </>
  )
}

export default HomePage;
