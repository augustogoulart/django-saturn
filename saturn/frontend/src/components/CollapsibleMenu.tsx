import {Registered, RegisteredList} from "../views/Home/Home";
import {Menu} from "antd";
import {HomeOutlined} from "@ant-design/icons";
import React from "react";

export function CollapsibleMenu({appList}: RegisteredList): JSX.Element | null {
  if (appList) {
    return (
      <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
        {
          appList.map((app: Registered) => <Menu.Item key={app.appLabel} icon={<HomeOutlined/>}>
            {app.name}
          </Menu.Item>)
        }
      </Menu>
    )
  }
  return null
}
