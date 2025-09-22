import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Input, InputNumber, Modal, notification, Row, Select, Space, Upload, message } from 'antd';
import { AlipayCircleFilled, DashOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { callDonVids, callLoaiSanPhamds, ThemSanPhamAnhVaGia } from '../../../services/api.service';

import MyTextEditor from '../../../components/Quilleditor/MyTextEditor';
//import { AddUserAPI } from '../../../services/api.service';
// import { Form } from 'react-router-dom';

    const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
};

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

const DonViModalCreate = (props) => {

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
    const {productModalCreate,setProductModalCreate } = props
  


 const handleChange = info => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }

    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, url => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };
  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

    const APILoaiSP = async() =>{
      const res = await callLoaiSanPhamds()
      if(res&& res.data){
        console.log('check loai sp',res)
        setDsLoaiSP(
          res.data.map(item => ({
            label:item.tenLoaiSanPham,
            value:item.loaiSanPhamID
          }))
        )
      }
    }
    const ApiDonViSP = async() =>{
      const res = await callDonVids()
      if(res&& res.data){
        setDsDonvi(
          res.data.map(item =>({
            label:item.tenDonVi,
            value:item.donViTinhID
          }))
        )
      }
    }
    useEffect(()=>{
      if(productModalCreate){
      APILoaiSP()
      ApiDonViSP()
      }
      
    },[productModalCreate])

    const handleCancel = () =>{
      setProductModalCreate(false)
    }
    const onFinish = async (values)=>{{
      console.log('check values img',values.files.fileList)
      console.log('check fileslist',fileList)
      const formData = new FormData();
      formData.append("TenSanPham",values.TenSanPham)
      formData.append("LoaiSanPhamID",values.LoaiSanPhamID)
      formData.append("DonViTinhID",values.DonViTinhID)
      formData.append("MoTa",values.MoTa)
      formData.append("SoLuong",values.SoLuong)
      formData.append("GiaBan",values.GiaBan)
      formData.append("SalePercent",values.SalePercent)
      fileList.forEach(item => {
        formData.append("files",item.originFileObj)
      });
      const res = await ThemSanPhamAnhVaGia(formData)
      if(res && res?.data){
        notification.success({
          message:'Thêm Sản phẩm',
          description:'Thành công'
        })
      }

    }}

   
    const onValuesChange = (changedValues,allValues) =>{
    const giaBan = allValues.GiaBan || 0
    const salePercent = allValues.SalePercent || 0;
    const result = giaBan * (1 - salePercent / 100);
    setGiaSauGiam(result)
    }
 


  return (
    <>
   
      <Modal title="Thêm Mới Người Dùng" 
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
      
      onValuesChange={onValuesChange}
      
      >
    <Row gutter={10}>
    <Col span={12}>
      <Form.Item
        name="TenSanPham"
        label="Tên sản phẩm"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      </Col>
      <Col span={6}>
      <Form.Item
        name="LoaiSanPhamID"
        label="Loại sản phẩm"
      >
     
         <Select
            defaultValue={''}
            showSearch
            allowClear
           options={dsLoaiSP}
          />
      </Form.Item>
      
      </Col>
      <Col span={6}>
      <Form.Item
        name="DonViTinhID"
        label="Đơn vị"
        // rules={[
        //   {
        //     required: true,
        //   },
        // ]}
      >
        <Select
            defaultValue={''}
            showSearch
            allowClear
           options={dsDonvi}
          />
      </Form.Item>
      
      </Col>
      <Col span={6}>
        <Form.Item
          name="GiaBan"
          label="Giá Bán"
         // style={{ flex: 1 }} // Đảm bảo cột giãn đều
          rules={[
            {
              required: true,
            },
          ]}
        >
          <InputNumber
            addonAfter="VND"
            defaultValue={0}
            min={0}
            controls
            formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          />
        </Form.Item>
      </Col>

      <Col span={6}>
        <Form.Item
          name="SalePercent"
          label="Giảm Giá"
          min={0}
          style={{ flex: 1 }} // Đảm bảo cột giãn đều
        >
          <InputNumber
          
            addonAfter="%"
            defaultValue={0}
            controls
            formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
           // style={{ width: "100%" }} // Input chiếm 100% chiều rộng
          />
        </Form.Item>
      </Col>
      <Col span={6}>
        <Form.Item 
          //  name="giaSauGiam"
           label="Giá sau giảm"
        >
          <InputNumber
              value={giaSauGiam}
              min={0}
              disabled
              style={{width:"100%" ,color:'green'}}
              formatter={(value) =>
            `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          }></InputNumber>
        </Form.Item>
        
  
          
      </Col>
      <Col span={6}>
        <Form.Item
          name="SoLuong"
          label="Số lượng"         
        >
          <InputNumber
            defaultValue={0}
            min={0}
            style={{ width: "100%" }} // Input chiếm 100% chiều rộng
          />
        </Form.Item>
      </Col>
      <Col span={24}>
        <Form.Item
        name="MoTa"
        lable="Mô tả"
        getValueFromEvent={(content) => content} // 👈 lấy content (HTML string) từ ReactQuill
        >
      <MyTextEditor/>
        </Form.Item>
        
      </Col>

      <Col span={12}>
        <Form.Item
          name="files"
          label="Ảnh"
        >
         <Upload
        listType="picture-card"
        multiple={true}
        maxCount={5}
        beforeUpload={() => false} // không upload ngay
        fileList={fileList}
        onChange={({fileList})=>setFileList(fileList)}
       onPreview={onPreview}

        // onChange={handleChange}
        

      >
     
        <div>
          {loading ? <LoadingOutlined /> : <PlusOutlined />}
          <div style={{ marginTop: 8 }}>Upload</div>
      </div>
      </Upload>
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
    onClick={()=>{form.resetFields(),setFileListThumbline([])}}>Reset</Button>
</div>

      </Modal>
      <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={() => setPreviewOpen(false)}>
                <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
      
    </>
  );
};
export default DonViModalCreate;