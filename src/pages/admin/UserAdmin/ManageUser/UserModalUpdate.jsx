import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Input, InputNumber, Modal, notification, Row, Select, Space, Upload, message } from 'antd';
import { AlipayCircleFilled, DashOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { DanhSachNND, UpdateUser } from '../../../../services/api.service';


const UserModalUpdate = (props) => {

    const [description, setDescription] = useState("");
    const [form] = Form.useForm();
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [loading,setLoading] = useState(false)
    const [loadingSlider, setLoadingSlider] = useState(false);
    const [imageUrl,setImageUrl] = useState('')
    const [fileListThumbline, setFileListThumbline] = useState([]);
    const [fileListSlider,setFileListSlider] = useState([])
    const [previewTitle, setPreviewTitle] = useState('');
    const [isSubmit,setIsSubmit] = useState(false)
    const [dsDonvi, setDsDonvi] = useState()
    const [dsLoaiSP, setDsLoaiSP] = useState()
    const [giaSauGiam,setGiaSauGiam] = useState(null)
    const [fileList,setFileList] = useState([])
    const [initForm, setInit] = useState(null)
    const {updateProductModal,setIsUpdateProductModal,dataUpdate ,fetchProduct} = props
    const [danhSachNND,setDanhSachNND] = useState(null)
  
    const handleCancel = () =>{
      setIsUpdateProductModal(false)
    }
    const fetchDsnnd = async ()=>{
      const res = await DanhSachNND()
      if(res&&res?.status===1)
        setDanhSachNND(
      res.data.map((item)=>({
        label:item.tenNND,
        value:item.nndid

      }))
        )
    }
    const onFinish = async (values)=>{
      console.log('check values ',values)
      const idnnd = danhSachNND.find(item => item.label === values.tenNND)?.value ?? Number(values.tenNND) ?? null;
    
      const res = await UpdateUser(values.userID,idnnd,values.phone,values.isActive,values.fullName,values.email,values.address)
      if(res&&res?.status===1){
         notification.success({ 
          message:"Sửa Thành công"
        })
        setIsUpdateProductModal(false)
       form.resetFields()
      await props.fetchProduct()
      
      }
    }
    useEffect(()=>{
     
      if(updateProductModal){
        fetchDsnnd()
         console.log("check dataup",dataUpdate)
        //  return
       if(dataUpdate){
        const init = ({
          fullName : dataUpdate.fullName,
          email : dataUpdate.email,
          createAt: dataUpdate.createAt,
          isActive : dataUpdate.isActive,
          tenNND:dataUpdate.tenNND,
          userID:dataUpdate.userID
        })

        setInit(init)
        form.setFieldsValue(init)
        console.log('check init',init)
      }
      }
      
      

    },[updateProductModal])
  
  return (
    <>
   
      <Modal title="Cập Nhật Người Dùng" 
      open={updateProductModal} 
      // onOk={onFinish} 
      onCancel={handleCancel}
      footer={null}
      width={800}
      confirmLoading={isSubmit}
      >
      <DashOutlined/>
      <Form 
      form={form} 
      name="validateOnly" 
      layout="vertical" 
      autoComplete="off"
      onFinish={onFinish}  
      >
    <Row gutter={10}>
    <Col span={8}>
  
      <Form.Item
        name="email"
        label="Email"
      
      >
        <Input disabled />
      </Form.Item>
      </Col>
       <Col span={16}>
      <Form.Item
        name="Password"
        label="Password"
      >
        <Input disabled />
      </Form.Item>
      
      </Col>
    </Row>
    <Row gutter={8}>
      <Col span={8}>
        <Form.Item
        name="fullName"
        label="Tên Người Dùng"
       
      >
        <Input />
      </Form.Item>
      
      </Col>
      <Col span={8}>
        <Form.Item
        name="phone"
        label="Số điện thoại"
      >
        <Input />
      </Form.Item>
      
      </Col>
         <Col span={8}>
        <Form.Item
        name="createAt"
        label="Ngày tạo tài khoản"
      >
        <Input />
      </Form.Item>
      
      </Col>
        <Col span={24}>
        <Form.Item
        name="address"
        label="Địa Chỉ"
      >
        <Input />
      </Form.Item>
      </Col>
       <Col span={4}>
        <Form.Item
        name="userID"
        label="ID"
      >
        <Input disabled/>
      </Form.Item>
      
      </Col>
      
      
       
      <Col span={10}>
        <Form.Item
        name="tenNND"
        label="Nhóm Người Dùng"
      >
           <Select
                    defaultValue={name}
                    showSearch
                    allowClear
                    options={danhSachNND}
                  />
      </Form.Item>
      
      </Col>
       <Col span={10}>
        <Form.Item
        name="isActive"
        label="Trạng Thái"
        
      >
        <Select>
    <Select.Option value={1}>Hoạt động</Select.Option>
    <Select.Option value={0}>Không hoạt động</Select.Option>
    <Select.Option value={3}>Tạm ngưng</Select.Option>
  </Select>
      </Form.Item>
      
      </Col>
    </Row>
      <Space>
        </Space>
    </Form> 
    <div className='btn' style={{ display: "flex", justifyContent: "flex-end", width: "100%", gap: "10px" }}>
    <Button  onClick={() => { form.submit() }} type="primary">Submit</Button>
    <Button  
    htmlType="reset" 
    onClick={()=>{form.resetFields()}}>Reset</Button>
</div>

      </Modal>
    
      
    </>
  );
};
export default UserModalUpdate;