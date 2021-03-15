import React from "react";
import {Link} from "react-router-dom"

export const BuildColumns = () => {
  return [
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
      render: (name, row) => <Link to={`/saturn/sandbox/dummyuser/${row.id}/change/`}>{name}</Link>
    },
    {
      title: 'Id',
      dataIndex: 'id',
    }
  ]}
