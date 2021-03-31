import React from "react";
import {Empty, Table} from 'antd';

import './homepage.scss';

function IndexPage() {
  return (
   <Empty description={"No Models Registered"} image={Empty.PRESENTED_IMAGE_SIMPLE}/>
  )
}

export default IndexPage;
