import {Link} from "react-router-dom"

export const BuildColumns = (sortedInfo, filteredInfo) => {
  sortedInfo = sortedInfo || {}
  filteredInfo = filteredInfo || {}
  return [
    {
      title: 'Name',
      dataIndex: 'name',
      filters: [
        {text: 'Joe', value: 'Joe'},
        {text: 'Jim', value: 'Jim'},
      ],
      filteredValue: filteredInfo.name || null,
      onFilter: (value, record) => record.name.includes(value),
      sorter: (a, b) => a.name.length - b.name.length,
      sortOrder: sortedInfo.columnKey === 'name' && sortedInfo.order,
      ellipsis: true,
      render: (name, row) => <Link to={`/auth/user/${row.id}`}>{name}</Link>
    },
    {
      title: 'id',
      dataIndex: 'id',
      sorter: (a, b) => a.age - b.age,
      sortOrder: sortedInfo.columnKey === 'id' && sortedInfo.order,
      ellipsis: true,
    },
    {
      title: 'Address',
      dataIndex: 'address',
      filters: [
        {text: 'London', value: 'London'},
        {text: 'New York', value: 'New York'},
      ],
      filteredValue: filteredInfo.address || null,
      onFilter: (value, record) => record.address.includes(value),
      sorter: (a, b) => a.address.length - b.address.length,
      sortOrder: sortedInfo.columnKey === 'address' && sortedInfo.order,
      ellipsis: true,
    },
  ]}
