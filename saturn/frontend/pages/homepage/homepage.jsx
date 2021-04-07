import React, { useState, useEffect } from "react";
import {Empty, Table} from 'antd';
import {Link} from 'react-router-dom';


import './homepage.scss';

function IndexPage() {
  const [state, setState] = useState({appList: []})

  useEffect(() => {
    fetch('/saturn/api/registered/')
    .then(response => response.json())
    .then(response => setState(response))
  }, [])


  return (
    <>
      {
        state.appList.map(
          app =>
            <Table
              style={{"padding": "3vh"}}
              key={app.appLabel}
              rowKey={'name'}
              columns={[{
                title: app.name,
                key: app.appUrl,
                dataIndex: "name",
                render: (name, row) => <Link to={row['adminUrl']}>{name}</Link>
              }]}
              dataSource={app.models}
              pagination={false}/>)
      }
    </>
  )
}

export default IndexPage;
