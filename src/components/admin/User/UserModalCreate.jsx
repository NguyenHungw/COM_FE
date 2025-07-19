import React, { useState } from 'react';
import { Button, Form, Input, Modal, notification, Select, Space } from 'antd';
import { DashOutlined } from '@ant-design/icons';
import { AddUserAPI } from '../../../services/api.service';
// import { Form } from 'react-router-dom';
const UserModalCreate = (props) => {
    const [form] = Form.useForm();

    const onFinish = async(values) => {
        console.log('Success:', values);
        const res = await AddUserAPI(values.fullName,values.password,values.email,values.phone)
        console.log("check res>>",res)
        if(res&&res.data){
          notification.success({
            message:"Thêm Người Dùng",
            description:"Thành Công"
          })
          props.fetchUser()
        }else{
          notification.error({
            message:"Error",
            description:JSON.stringify(res.error || "Lỗi không xác định")
          })
        }
      };
  const {userModalCreate,setUserModalCreate} = props
  
  const handleCancel = () => {
    setUserModalCreate(false)
  }
 
  return (
    <>
      {/* <Button type="primary" onClick={showModal}>
        Open Modal
      </Button> */}
      <Modal title="Thêm Mới Người Dùng" 
      open={userModalCreate} 
      onOk={onFinish} 
      onCancel={handleCancel}
      footer={null}
      >
      <DashOutlined/>
      <Form 
      form={form} 
      name="validateOnly" 
      layout="vertical" 
      autoComplete="off"
      onFinish={onFinish}
    


      >
      <Form.Item
        name="fullName"
        label="Tên hiển thị"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        name="email"
        label="Email"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="phone"
        label="Số điện thoại"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Space>
    

        </Space>
    </Form> 
    <div className='btn' style={{ display: "flex", justifyContent: "flex-end", width: "100%", gap: "10px" }}>
    <Button  onClick={() => { form.submit() }} type="primary">Submit</Button>
    <Button  htmlType="reset" onClick={()=>{form.resetFields()}}>Reset</Button>
</div>
      </Modal>
      
    </>
  );
};
export default UserModalCreate;