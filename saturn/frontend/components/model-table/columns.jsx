import React from "react";
import {Link} from "react-router-dom"

export const BuildColumns = (listDisplay, modelName, appName, title) => {
  // TODO - dataIndex should map to the model's __str__
  return [
    {
      title:  title,
      dataIndex: 'id',
      render: (name, row) => <Link to={`/saturn/${appName}/${modelName}/${row.id}/change/`} >{row['str']}</Link>
    }
  ]}
