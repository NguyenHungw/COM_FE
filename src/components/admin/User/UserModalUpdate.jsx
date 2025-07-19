import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Modal, notification, Select, Space } from 'antd';
import { DashOutlined } from '@ant-design/icons';
import { AddUserAPI, updateUser } from '../../../services/api.service';
// import { Form } from 'react-router-dom';
const UserModalUpdate = (props) => {
    const [form] = Form.useForm();
    const {setDataUpdate,dataUpdate,updateUserModal,setIsUpdateUserModal,fetchUser} = props
    console.log("check data update>>",dataUpdate)
    const onFinish = async(values) => {
        console.log('Success:', values);
        const res = await updateUser(values._id,values.fullName,values.email,values.phone)
        console.log("check res>>",res)
        if(res&&res.data){
          notification.success({
            message:"Cập nhật",
            description:"Thành Công"
          })
          fetchUser()
        }else{
          notification.error({
            message:"Error",
            description:JSON.stringify(res.error || "Lỗi không xác định")
          })
        }
      };
  
  
  const handleCancel = () => {
    setIsUpdateUserModal(false)
    //fetchUser()
  }
  useEffect(()=>{
    form.setFieldsValue(dataUpdate)

  },[dataUpdate])
 
  return (
    <>
      {/* <Button type="primary" onClick={showModal}>
        Open Modal
      </Button> */}
      <Modal title="Cập nhật người dùng" 
      open={updateUserModal} 
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
        name="_id"
        label="id"
        // rules={[
        //   {
        //     required: false,
        //   },
        // ]}
      >
         <Input
         disabled= {true} />
         </Form.Item>
      {/* <Input 
        disabled={true}
      /> */}
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
      {/* </Form.Item>
      <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input.Password />  */}
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
        <Input 
          disabled={true}

        />
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
export default UserModalUpdate;