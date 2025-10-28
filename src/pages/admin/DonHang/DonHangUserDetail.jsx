import React from 'react';
import { Button, ConfigProvider, Flex, Popover } from 'antd';
const text = <span>Title</span>;

const content = (
  <div>
    <p>Content</p>
    <p>Content</p>
  </div>
);
    const buttonWidth = 80;

const DonHangUserDetail = (props) => {
        const {userID,userIDdetails,setUserIDdetails} = props;

        console.log('check don hang user detail',userIDdetails)

return(
  <ConfigProvider button={{ style: { width: buttonWidth, margin: 4 } }}>
    <Flex vertical justify="center" align="center" className="demo">
     
    
      <Popover 
      placement="right" 
      title={text} 
      open={userIDdetails} 
      content={content}>
      </Popover>

          
        </Flex>
  </ConfigProvider>
);
}
export default DonHangUserDetail;