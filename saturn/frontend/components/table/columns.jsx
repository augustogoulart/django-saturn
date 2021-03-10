import React from "react";
import {Link} from "react-router-dom"

export const BuildColumns = () => {
  return [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (name, row) => <Link to={`/saturn/sandbox/dummyuser/${row.id}/change/`}>{name}</Link>
    },
    {
      title: 'Id',
      dataIndex: 'id',
    }
  ]}
