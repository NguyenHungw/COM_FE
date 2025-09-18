import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Input, InputNumber, Modal, notification, Row, Select, Space, Upload,Image, message } from 'antd';
import { AlipayCircleFilled, DashOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { v4 as uuidv4 } from 'uuid';
import MyTextEditor from '../../../components/Quilleditor/MyTextEditor';
import { data } from 'react-router-dom';
import { ReactSortable } from "react-sortablejs";
import { callDonVids, callLoaiSanPhamds, DoiViTriHinhAnh } from '../../../services/api.service';

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
   
   
    const [previewTitle, setPreviewTitle] = useState('');
    const [isSubmit,setIsSubmit] = useState(false)

    const [initForm,setInit] = useState(null)
    const [giaSauGiam,setGiaSauGiam] = useState(null)
     const [fileList,setFileList] = useState([])
 const [dsDonvi, setDsDonvi] = useState()
    const [dsLoaiSP, setDsLoaiSP] = useState()
    const {setIsUpdateProductModal,updateProductModal,setDataUpdate,dataUpdate } = props

const APILoaiSP = async ()=>{
  const res = await callLoaiSanPhamds()
  if(res&& res?.data){
    console.log('api loai sp',res)
    setDsLoaiSP(
      res.data.map((item)=>({
      label:item.tenLoaiSanPham,
      value:item.loaiSanPhamID
    }))
    )
   
  }
}
const APIDonViSP = async() =>{
  const res = await callDonVids()
  if(res&&res?.data){
    setDsDonvi(
      res.data.map((item)=>({
        label:item.tenDonVi,
        value:item.donViTinhID
      }))
    )
  }
}
   const HinhAnhDoiViTri = async(payload) =>{
  const res = await DoiViTriHinhAnh(payload)
  if(res&& res?.data){
    notification.success({
      message:"Đổi vị trí",
      description:"Thành công"
    })
  }
}

useEffect(()=>{
 if(fileList.length>0){
    const payload = fileList.map((item,index)=>({
      imageID:item.idPic,
      newIndex:index
    }))
  HinhAnhDoiViTri(payload)
  props.fetchProduct()
  
  }
  
 
},[fileList])
useEffect(()=>{
 
  if(updateProductModal){
      APILoaiSP()
      APIDonViSP()
      console.log("dataUpdate.danhSachAnh.idPic,",dataUpdate.danhSachAnh)
      if(dataUpdate?.id){
        const listIMG = dataUpdate.danhSachAnh.map((img,index)=>({
      uid:String(img.idPic),          
      name:img.filePath.split("/").pop(), //lấy tên file
      status: "done",
      url:`${import.meta.env.VITE_BACKEND_URL}${img?.filePath}`,
      idPic: img.idPic,
    }))
    setFileList(listIMG)
      }
  }
  if(dataUpdate?.id){

    

    // console.log('check dataupdate',dataUpdate)
const init = {
    ID:dataUpdate.id,
    TenSanPham:dataUpdate.tenSanPham,
    LoaiSanPhamID:dataUpdate.tenLoaiSP,
    DonViTinhID:dataUpdate.tenDonVi,
    GiaBan:dataUpdate.giaBan,
    SalePercent:dataUpdate.salePercent,
    MoTa:dataUpdate.moTa,
    SoLuong:dataUpdate.soLuong,
    ListIMG: dataUpdate.danhSachAnh || []  // mảng ảnh


  }
    const giaBan = init.GiaBan || 0
    const salePercent = init.SalePercent || 0;
    const result = giaBan * (1 - salePercent / 100);
   

    setGiaSauGiam(result)
  setInit(init)
  form.setFieldsValue(init)
  // console.log('check init',init)
  }
  
 
},[updateProductModal,dataUpdate])

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
      // console.log('check handle preview',file)
      if(file.url){
        setPreviewImage(file.thumbUrl || file.preview || file.url);
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
        return
      }      
      getBase64(file.originFileObj, (url) => {
        // console.log('checkurl>>',url)
        setPreviewImage(url);
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
    });
    };
 



      const handleChange = (info, type) => {
        
        if (info.file.status === 'uploading') {
            type ? setLoadingSlider(true) : setLoading(true);
            //info.file.status = 'done';
            return;
        }
        // console.log('check info',info)
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
               value={Math.round(giaSauGiam)}
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
      <div className='contain-img'>
        <Form.Item
          name="files"
          label="Ảnh"
        >
    
         <Upload
         className='upload-img'
        listType="picture-card"
        multiple={true}
        maxCount={5}
        beforeUpload={() => false} // không upload ngay
          onChange={({ fileList: newFiles }) =>
          setFileList([...fileList, ...newFiles])
        }
   
          showUploadList={{
          showPreviewIcon: true,
          showRemoveIcon: true,
        }}
        >
        <div>
          {loading ? <LoadingOutlined /> : <PlusOutlined />}
          <div style={{ marginTop: 8 }}>Upload</div>
      </div>
      </Upload>
         {/* Danh sách ảnh có thể kéo thả */}
      <ReactSortable
       className='sort-img' 
       style={{ 
       display: "flex", 
       flexWrap: "wrap", 
       gap: 12 }}
       list={fileList} 
       setList={(newlist)=>{setFileList(newlist)
       newlist.forEach((item, index) => {
        console.log('newlist',newlist)
      console.log(`Ảnh ID: ${item.uid} - Vị trí mới: ${index}`);
    });
       }} 
       animation={150} 
       >
        {fileList.map((file) => (
          <div key={file.idPic} style={{ position: "relative", width: 100, height: 100 }}>
  <Image
    src={file.url || URL.createObjectURL(file.originFileObj)}
    alt={file.name}
    style={{
      width: 100,
      height: 100,
      objectFit: "cover",
      borderRadius: 8,
    }}
  />
  <button
    onClick={() => setFileList(fileList.filter(f => f.uid !== file.uid))}
    style={{
      position: "absolute",
      top: 4,
      right: 4,
      background: "rgba(0,0,0,0.5)",
      border: "none",
      color: "#fff",
      borderRadius: "50%",
      cursor: "pointer",
      width: 20,
      height: 20,
      lineHeight: "20px",
      textAlign: "center",
    }}
  >
    ×
  </button>
  
</div>

        ))}
      </ReactSortable>
        </Form.Item>
        </div>
      </Col>
    </Row>
      <Space>
        </Space>
    </Form> 
    <div className='btn' style={{ display: "flex", justifyContent: "flex-end", width: "100%", gap: "10px" }}>
    <Button  onClick={() => { form.submit() }} type="primary">Submit</Button>
    <Button  
    htmlType="reset" 
    onClick={()=>{form.resetFields(),setGiaSauGiam(null)}}>Reset</Button>
</div>

      </Modal>
      <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={() => setPreviewOpen(false)}>
                <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
      
    </>
  );
};
export default SanPhamModalUpdate;