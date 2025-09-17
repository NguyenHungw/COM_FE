import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Input, InputNumber, Modal, notification, Row, Select, Space, Upload,Image, message } from 'antd';
import { AlipayCircleFilled, DashOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { v4 as uuidv4 } from 'uuid';
import MyTextEditor from '../../../components/Quilleditor/MyTextEditor';

//import { AddUserAPI } from '../../../services/api.service';
// import { Form } from 'react-router-dom';
const SanPhamModalUpdate = (props) => {
    const [form] = Form.useForm();

    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [dataTypeSelect,setDataTypeSelect] = useState()
    const [loading,setLoading] = useState(false)
    const [loadingSlider, setLoadingSlider] = useState(false);
    const [imageUrl,setImageUrl] = useState('')
   
    const [fileListThumbline, setFileListThumbline] = useState([]);
    const [fileListSlider,setFileListSlider] = useState([])
    const [previewTitle, setPreviewTitle] = useState('');
    const [isSubmit,setIsSubmit] = useState(false)

    const [initForm,setInit] = useState(null)
    const [giaSauGiam,setGiaSauGiam] = useState(null)
    const {setIsUpdateProductModal,updateProductModal,setDataUpdate,dataUpdate } = props
console.log('check initFOrm>',initForm)

useEffect(()=>{
 
},[])

    const beforeUpload = (file) => {
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
    const getBase64 = (img, callback) => {
      console.log("running Base64 func")
      const reader = new FileReader();
      reader.addEventListener('load', () => callback(reader.result));
      reader.readAsDataURL(img);
      
    }
    const handlePreview = async (file) => {
      console.log('check handle preview',file)
      if(file.url){
        setPreviewImage(file.thumbUrl || file.preview || file.url);
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
        return
      }      
      getBase64(file.originFileObj, (url) => {
        console.log('checkurl>>',url)
        setPreviewImage(url);
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
    });
    };
 


    console.log('check 1>>>>',initForm?.slider?.fileList)
    console.log('check 2>>>>',initForm?.slider)
      const handleChange = (info, type) => {
        
        if (info.file.status === 'uploading') {
            type ? setLoadingSlider(true) : setLoading(true);
            //info.file.status = 'done';
            return;
        }
        console.log('check info',info)
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            console.log('check done',info)
            getBase64(info.file.originFileObj, (url) => {
                type ? setLoadingSlider(false) : setLoading(false);
                setImageUrl(url);
            });
        }
        
    };

  const hanldeRemove = (file,type) => {
   
  }
  
  const handleCancel = () => {

    setIsUpdateProductModal(false)
  }
  const handleUploadFile = async({ info,file, onSuccess, onError }) => {
 
  
};


 const onFinish = async(values) =>{


 
 }
   const onValuesChange = (changedValues,allValues) =>{
    const giaBan = allValues.GiaBan || 0
    const salePercent = allValues.SalePercent || 0;
    const result = giaBan * (1 - salePercent / 100);
    setGiaSauGiam(result)
    }

  return (
    <>
       <Modal title="Thêm Mới Người Dùng" 
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
          //  options={dsLoaiSP}
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
          //  options={dsDonvi}
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
        // fileList={fileList}
        // onChange={({fileList})=>setFileList(fileList)}

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
    onClick={()=>{form.resetFields(),setGiaSauGiam(null),setFileListThumbline([])}}>Reset</Button>
</div>

      </Modal>
      <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={() => setPreviewOpen(false)}>
                <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
      
    </>
  );
};
export default SanPhamModalUpdate;