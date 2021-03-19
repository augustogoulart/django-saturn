import React from "react";
import {Link} from "react-router-dom"

export const BuildColumns = () => {
  // TODO - Table list should map to the model's __str__
  return [
    {
      title: 'Username',
      dataIndex: 'username',
      render: (name, row) => <Link to={`/saturn/sandbox/dummyuser/${row.id}/change/`}>{name}</Link>
    },
    {
      title: 'Id',
      dataIndex: 'id',
    }
  ]}
