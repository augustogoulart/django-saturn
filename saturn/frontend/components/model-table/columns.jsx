import React from "react";
import {Link} from "react-router-dom"

export const BuildColumns = (dataSource, modelName, appName) => {
  return [
    {
      title: modelName ,
      dataIndex: 'id',
      render: (name, row) => <Link to={`/saturn/${appName}/${modelName}/${row.id}/change/`}>{row['listDisplay']}</Link>
    }
  ]}
