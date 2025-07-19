import React, { useState } from 'react';
import { Badge, Button, Descriptions, Drawer } from 'antd';
import moment from 'moment';


const ViewDetailUser =(props) =>{
    
    const {viewDetailUser,setViewDetailUser,dataDetailUser,setDataDetailUser} = props
    console.log("check dataDetailUser>>>",dataDetailUser)
    const onClose = () => {
      setViewDetailUser(false);
      //setDataDetailUser(null);
    };


      
    return (
      <>
          <Drawer
                title="Chức năng xem chi tiết"
                width={"50vw"}
                onClose={onClose}
                open={viewDetailUser}
            >
                <Descriptions
                    title="Thông tin user"
                    bordered
                    column={2}
                >
                    <Descriptions.Item label="Id">{dataDetailUser?._id}</Descriptions.Item>
                    <Descriptions.Item label="Tên hiển thị">{dataDetailUser?.fullName}</Descriptions.Item>
                    <Descriptions.Item label="Email">{dataDetailUser?.email}</Descriptions.Item>
                    <Descriptions.Item label="Số điện thoại">{dataDetailUser?.phone}</Descriptions.Item>

                    <Descriptions.Item label="Role" span={2}>
                        <Badge status="processing" text={dataDetailUser?.role} />
                    </Descriptions.Item>
                    <Descriptions.Item label="Created At">
                        {moment(dataDetailUser?.createdAt).format('DD-MM-YYYY hh:mm:ss')}
                    </Descriptions.Item>
                    <Descriptions.Item label="Updated At">
                        {moment(dataDetailUser?.updatedAt).format('DD-MM-YYYY hh:mm:ss')}
                    </Descriptions.Item>
                </Descriptions>
            </Drawer>
        
      </>
    );
}
export default ViewDetailUser;