import './App.css';
import 'antd/dist/antd.css';
import React, {useState} from 'react';
import {Layout, Menu, Breadcrumb} from 'antd';
import {
  HomeOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';

const {Header, Content, Footer, Sider} = Layout;
const {SubMenu} = Menu;

export function App(): JSX.Element {
  const [collapsed, setCollapsed] = useState(false)

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
          <SubMenu key="sub1" icon={<UserOutlined/>} title="User">
            <Menu.Item key="3">Table 1</Menu.Item>
            <Menu.Item key="4">Table 2</Menu.Item>
            <Menu.Item key="5">Table 3</Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" icon={<TeamOutlined/>} title="App 2">
            <Menu.Item key="6">Team 1</Menu.Item>
            <Menu.Item key="8">Team 2</Menu.Item>
          </SubMenu>
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
            Django Saturn Admin
          </div>
        </Content>
        <Footer style={{textAlign: 'center'}}>Footer: Add Something here</Footer>
      </Layout>
    </Layout>
  );
}


