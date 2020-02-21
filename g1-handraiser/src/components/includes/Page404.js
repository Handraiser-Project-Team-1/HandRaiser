import React from "react";
import { useHistory } from 'react-router-dom';
import { Result, Button } from 'antd';
const Page404 = () => {
  let history = useHistory()
  return (
    <React.Fragment>
      <Result
        style={{paddingTop:150}}
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist or have been remove by the owner."
        extra={<Button type="primary" onClick={() => { history.push('/classes') }}>Back Home</Button>}
      />
    </React.Fragment>
  );
}
 
export default Page404