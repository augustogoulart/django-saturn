import React from "react";
import {Link} from "react-router-dom"

export const BuildColumns = (dataSource, modelName, appName, title) => {
  return [
    {
      title:  title,
      dataIndex: 'id',
      render: (name, row) => <Link to={`/saturn/${appName}/${modelName}/${row.id}/change/`}>{row['list_display']}</Link>
    }
  ]}
