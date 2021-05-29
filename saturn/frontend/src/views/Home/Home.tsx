import 'antd/dist/antd.css';
import React, {useEffect, useState} from 'react';
import STNApiClient from "../../lib/api";
import {Link} from 'react-router-dom';
import {Layout, Menu, Breadcrumb, Table} from 'antd';
import {FileOutlined} from '@ant-design/icons';
import {CollapsibleMenu} from "../../components/CollapsibleMenu";

const {Header, Content, Footer, Sider} = Layout;

const api = new STNApiClient('http://localhost:8000/saturn/api/')

export interface Registered {
  name: string;
  appLabel: string;
  appUrl: string;
  models: []
}

export interface RegisteredList {
  appList: Registered[]
}

export function Home(): JSX.Element {

  const [collapsed, setCollapsed] = useState(false)
  const [registered, setRegistered] = useState<RegisteredList>({appList: []})

  useEffect(() => {
    async function getData() {
      await api.get('registered/').then((data: any) => setRegistered(data))
    }

    getData()
  }, [])

  function onCollapse(collapsed: boolean): void {
    setCollapsed(collapsed);
  }

  function modelTable(): JSX.Element[] | null {
    if (registered) {
      return registered.appList.map(
        app =>
          <Table
            style={{"paddingBottom": "3vh"}}
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
    return null
  }

  return (
    <Layout style={{minHeight: '100vh'}}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className="logo"/>
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          <CollapsibleMenu appList={registered.appList}/>
          <Menu.Item key="9" icon={<FileOutlined/>}>
            Files
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{padding: 0}}/>
        <Content style={{margin: '0 16px'}}>
          <Breadcrumb style={{margin: '16px 0'}}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div className="site-layout-background" style={{padding: 24, minHeight: 360}}>
            {modelTable()}
          </div>
        </Content>
        <Footer style={{textAlign: 'center'}}>Footer: Add Something here</Footer>
      </Layout>
    </Layout>
  );
}


