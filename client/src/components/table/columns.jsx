import {Link} from "react-router-dom"

export const BuildColumns = () => {
  return [
    {
      title: 'Name',
      dataIndex: 'name',
      render: (name, row) => <Link to={`/auth/user/${row.id}`}>{name}</Link>
    },
    {
      title: 'Id',
      dataIndex: 'id',
    }
  ]}
