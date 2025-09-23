import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Input, InputNumber, Modal, notification, Row, Select, Space, Upload, message } from 'antd';
import { AlipayCircleFilled, DashOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { callDonVids, callLoaiSanPhamds, ThemDonVi, ThemLoaiSanPham, ThemSanPhamAnhVaGia } from '../../../services/api.service';

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

const LoaiSanPhamModalCreate = (props) => {

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
    const {productModalCreate,setProductModalCreate,dataUpdate } = props
  
    const handleCancel = () =>{
      setProductModalCreate(false)
    }
    const onFinish = async (values)=>{{
      
      console.log('check values',values)
      
     
      const res = await ThemLoaiSanPham(values.tenLoaiSanPham,values.moTaLoaiSP,values.trangThai)
      if(res && res?.data){
        notification.success({
          message:'Thêm Đơn Vị',
          description:'Thành công'
        })
        props.fetchProduct()
        form.resetFields()
        setProductModalCreate(false)
      }
    }}
  
  return (
    <>
   
      <Modal title="Thêm Mới Loại Sản Phẩm" 
      open={productModalCreate} 
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
export default LoaiSanPhamModalCreate;