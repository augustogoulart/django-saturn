import React from "react";
import {HomeOutlined} from "@ant-design/icons";
import {Layout, Menu} from 'antd';
import {Link} from "react-router-dom";

const {Sider} = Layout;

export const SideMenuDark = ({collapsed, onCollapse}) => (
  <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
    <div className="logo"/>
    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
      <Menu.Item key="4" icon={<HomeOutlined />}>
        <Link to={"/"}>Home</Link>
      </Menu.Item>
    </Menu>
  </Sider>
)
