import React from "react";
import {Link} from "react-router-dom"

export const BuildColumns = (listDisplay, modelName) => {
  // TODO - Table list should map to the model's __str__
  console.log(listDisplay, modelName)
  return [
    {
      title:  listDisplay,
      dataIndex: 'usernameq',
      render: (name, row) => <Link to={`/saturn/sandbox/dummyuser/${row.id}/change/`} >{name}</Link>
    }
  ]}
