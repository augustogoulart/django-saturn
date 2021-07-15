import "antd/dist/antd.css";
import React, { useEffect, useState } from "react";
import STNApiClient from "../../lib/api";
import { Layout, Menu, Breadcrumb } from "antd";
import { CollapsibleMenu } from "../../components/CollapsibleMenu";
import { ModelTable } from "../../components/ModelTable";
import { RegisteredList } from "../../types";

const { Header, Content, Footer, Sider } = Layout;

const api = new STNApiClient("http://localhost:8000/saturn/api/");

export function Home(): JSX.Element {
  const [collapsed, setCollapsed] = useState(false);
  const [registered, setRegistered] = useState<RegisteredList>({ appList: [] });

  useEffect(() => {
    async function getRegistered() {
      await api.getRegistered().then((data: any) => setRegistered(data));
    }

    getRegistered();
  }, []);

  function onCollapse(collapsed: boolean): void {
    setCollapsed(collapsed);
  }

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
          <CollapsibleMenu appList={registered.appList} />
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }} />
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <ModelTable appList={registered.appList} />
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Footer: Add Something here
        </Footer>
      </Layout>
    </Layout>
  );
}
