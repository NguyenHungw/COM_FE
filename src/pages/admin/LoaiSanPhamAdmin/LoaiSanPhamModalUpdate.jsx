import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Input, InputNumber, Modal, notification, Row, Select, Space, Upload, message } from 'antd';
import { AlipayCircleFilled, DashOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { callDonVids, callLoaiSanPhamds, SuaLoaiSanPham, ThemDonVi, ThemLoaiSanPham, ThemSanPhamAnhVaGia } from '../../../services/api.service';

import MyTextEditor from '../../../components/Quilleditor/MyTextEditor';


    const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
};
const selectItem = [
  { value: 2, label: 'Chờ Duyệt' },
  { value: 1, label: 'Hoạt Động' },
  { value: 0, label: 'Ngưng Hoạt Động' },

]
const beforeUpload = file => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
};
 const onPreview = async file => {
  // console.log('check preview',file.thumbUrl)
   
  };

const LoaiSanPhamModalUpdate = (props) => {

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
    const [initForm ,setInit] = useState(null)
    const {productModalCreate,setProductModalCreate,dataUpdate ,setIsUpdateProductModal,updateProductModal} = props
  
    // const handleCancel = () =>{
    //   setIsUpdateProductModal(false)
    // }
    const funcInit = (dataUpdate)=>{
      const init = {
        loaiSanPhamID:dataUpdate.loaiSanPhamID,
        tenLoaiSanPham:dataUpdate.tenLoaiSanPham,
        moTaLoaiSP:dataUpdate.moTaLoaiSP,
        trangThai:dataUpdate.trangThai,
      }
      console.log('chheck init',init)
      setInit(init)
      form.setFieldsValue(init)
    }
    useEffect(()=>{
  
      if(updateProductModal){
funcInit(dataUpdate)
      }
        
    },[updateProductModal])
    const onFinish = async (values)=>{{
      
      console.log('check values',values)
      
    
      const res = await SuaLoaiSanPham(dataUpdate.loaiSanPhamID,values.tenLoaiSanPham,values.moTaLoaiSP,values.trangThai)
      console.log('check0res',res.message)
      if(res && res?.data===1){
        notification.success({
          message: res.message,
        })
        props.fetchProduct()
        form.resetFields()
        setIsUpdateProductModal(false)
      }
    }}
  
  return (
    <>
   
      <Modal title="Thêm Mới Loại Sản Phẩm" 
      open={updateProductModal} 
      // onOk={onFinish} 
      onCancel={()=>{setIsUpdateProductModal(false)}}
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
      
      // onValuesChange={onValuesChange}
      
      >
    <Row gutter={10}>
    <Col span={8}>
      <Form.Item
        name="tenLoaiSanPham"
        label="Tên Loại Sản Phẩm"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      </Col>
       <Col span={8}>
      <Form.Item
        name="moTaLoaiSP"
        label="Mô Tả"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      </Col>
       <Col span={8}>
      <Form.Item
        name="trangThai"
        label="Trạng Thái"
        rules={[
          {
            required: true,
          },
        ]}
      >
         <Select
      options={selectItem}
    />
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
      <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={() => setPreviewOpen(false)}>
                <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
      
    </>
  );
};
export default LoaiSanPhamModalUpdate;