import React from "react";
import {Empty, Table} from 'antd';

import './homepage.scss';

function HomePage() {
  return (
   <Empty description={"No Models Registered"} image={Empty.PRESENTED_IMAGE_SIMPLE}/>
  )
}

export default HomePage;
