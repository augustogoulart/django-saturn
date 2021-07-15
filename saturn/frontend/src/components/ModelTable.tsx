import { Table } from "antd";
import { Link } from "react-router-dom";
import React from "react";
import { Registered, RegisteredList } from "../types";

export function ModelTable({ appList }: RegisteredList): JSX.Element | null {
  if (appList) {
    return (
      <div
        className="site-layout-background"
        style={{ padding: 24, minHeight: 360 }}
      >
        {appList.map((app: Registered) => (
          <Table
            style={{ paddingBottom: "3vh" }}
            key={app.appLabel}
            rowKey={"name"}
            columns={[
              {
                title: app.name,
                key: app.appUrl,
                dataIndex: "name",
                render: (name, row) => <Link to={row["adminUrl"]}>{name}</Link>,
              },
            ]}
            dataSource={app.models}
            pagination={false}
          />
        ))}
      </div>
    );
  }
  return null;
}
