import { Link } from "react-router-dom";
import { Menu } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import React from "react";
import { Registered, RegisteredList } from "../types";

export function CollapsibleMenu({
  appList,
}: RegisteredList): JSX.Element | null {
  if (appList) {
    console.log(appList);
    return (
      <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
        {appList.map((app: Registered) => (
          <Menu.Item key={app.appLabel} icon={<HomeOutlined />}>
            <Link to={app.appUrl}>{app.name}</Link>
          </Menu.Item>
        ))}
      </Menu>
    );
  }
  return null;
}
