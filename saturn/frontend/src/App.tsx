import './App.css';
import 'antd/dist/antd.css';
import React, {useEffect, useState} from 'react';
import STNApiClient from "./lib/api";
import {Link} from 'react-router-dom';
import {Layout, Menu, Breadcrumb, Table} from 'antd';
import {
  HomeOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
const {Header, Content, Footer, Sider} = Layout;

const api = new STNApiClient('http://localhost:8000/saturn/api/')

interface AppList {
  appList: [{
    name:string;
    appLabel:string;
    appUrl:string;
    models:[]
  }]
}

export function App(): JSX.Element {

  const [collapsed, setCollapsed] = useState(false)
  const [state, setState] = useState<AppList>()

  useEffect(() => {
    async function getData() {
      await api.get('registered/').then((data:AppList) => setState(data))
    }
    getData()
  },[])

  function onCollapse(collapsed: boolean): void {
    setCollapsed(collapsed);
  }

  return (
    <Layout style={{minHeight: '100vh'}}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className="logo"/>
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          <Menu.Item key="1" icon={<HomeOutlined/>}>
            Home
          </Menu.Item>
          <Menu.Item key="sub1" icon={<UserOutlined/>} title="User">
            User
          </Menu.Item>
          <Menu.Item key="sub2" icon={<TeamOutlined/>} title="App 2">
            App 2
          </Menu.Item>
          <Menu.Item key="9" icon={<FileOutlined/>}>
            Files
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{padding: 0}}/>
        <Content style={{margin: '0 16px'}}>
          <Breadcrumb style={{margin: '16px 0'}}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div className="site-layout-background" style={{padding: 24, minHeight: 360}}>
            {state && state.appList.map(
                  app =>
                    <Table
                      style={{"paddingBottom": "3vh"}}
                      key={app.appLabel}
                      rowKey={'name'}
                      columns={[{
                        title: app.name,
                        key: app.appUrl,
                        dataIndex: "name",
                        // render: (name, row) => <Link to={row['adminUrl']}>{name}</Link>
                      }]}
                      dataSource={app.models}
                      pagination={false}/>)
              }
          </div>
        </Content>
        <Footer style={{textAlign: 'center'}}>Footer: Add Something here</Footer>
      </Layout>
    </Layout>
  );
}


