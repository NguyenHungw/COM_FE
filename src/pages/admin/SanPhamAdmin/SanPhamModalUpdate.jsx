import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Input, InputNumber, Modal, notification, Row, Select, Space, Upload,Image, message } from 'antd';
import { AlipayCircleFilled, DashOutlined, DeleteOutlined, EditOutlined, LoadingOutlined, PlusOutlined, SettingOutlined } from '@ant-design/icons';
import { v4 as uuidv4 } from 'uuid';
import MyTextEditor from '../../../components/Quilleditor/MyTextEditor';
import { data } from 'react-router-dom';
import { ReactSortable } from "react-sortablejs";
import { callDonVids, callLoaiSanPhamds, ChiTietIMG, DoiViTriHinhAnh, RemoveIMG, SuaGiaSP, SuaSP, UpdateIMG, UploadIMG } from '../../../services/api.service';



//import { AddUserAPI } from '../../../services/api.service';
// import { Form } from 'react-router-dom';
const SanPhamModalUpdate = (props) => {
    const [form] = Form.useForm();
const [refreshKey, setRefreshKey] = useState(0) // refresh cho hinh anh sau khi them moi

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
     const [fileListIMG,setFileListIMG] = useState([]) // lưu trữ ảnh cũ
     const [newFileList,setNewFileList] = useState([]) //upload ảnh mới
     const [deleteFile,setDeleteFile] = useState() //xóa ảnh
 const [dsDonvi, setDsDonvi] = useState()
    const [dsLoaiSP, setDsLoaiSP] = useState()
    const [showOptions,setShowOptions] = useState(false)
    const {setIsUpdateProductModal,updateProductModal,setDataUpdate,dataUpdate } = props


  const callIMG = async ()=>{
    // const formData = new FormData()
    // formData.append("id",initForm.ID)
    // console.log('check id',initForm.ID)
    const res = await ChiTietIMG(initForm.ID)
    if(res&& res?.data){
      console.log('res><><',res)
      const listIMG = res?.data.map((item,index)=>({
         uid:String(item.id),      // thuoc tinh bat buoc cua antd dung lam key duy nhat de quan ly danh sach anh    
      name:item.filePath.split("/").pop(), //lấy tên file
      status: "done",
      url:`${import.meta.env.VITE_BACKEND_URL}${item?.filePath}`,
      idPic: item.id // su dung de xoa anh, doi vitri anh
      }))
      setFileListIMG(listIMG)
      console.log('check fl',fileListIMG)
    }
  }
const refreshUpdateModal = () =>{
    setNewFileList([])
      APILoaiSP()
      APIDonViSP()
      console.log("refreshModal,",dataUpdate.danhSachAnh)
      if(dataUpdate?.id){
        const listIMG = dataUpdate.danhSachAnh.map((img,index)=>({
      uid:String(img.idPic),      // thuoc tinh bat buoc cua antd dung lam key duy nhat de quan ly danh sach anh    
      name:img.filePath.split("/").pop(), //lấy tên file
      status: "done",
      url:`${import.meta.env.VITE_BACKEND_URL}${img?.filePath}`,
      idPic: img.idPic // su dung de xoa anh, doi vitri anh
    }))
    
    setFileListIMG(listIMG)
      // setRefreshKey(prev => prev + 1) // luôn tăng

}
}
    const handeClear = () =>{
      setNewFileList([])
    }
    const handleEditImg = async (file,old) => {
      console.log('old',old)
console.log('check inf',file)
const formData = new FormData()
formData.append("id",old)
formData.append('files',file)
// return
const res = await UpdateIMG(formData)
if(res && res?.data){
  notification.success({
    message:"Cập nhật thành công",
    description:res.data.status,
  },
  // setFileListIMG(null),
   callIMG()
)
 
   props.fetchProduct()
}
    }
  
  const APIUploadIMG = async (file) => {
  console.log("File mới:", file)

  const formData = new FormData()
  formData.append("id", initForm.ID)
  formData.append("files", file)

  try {
    const res = await UploadIMG(formData)
    if (res?.data) {
      notification.success({ message: "Upload thành công" })
    }
    //  const newImg = {
    //     uid: String(Date.now()), // unique key
    //     name: file.name,
    //     status: "done",
    //     url: URL.createObjectURL(file) // hiển thị ngay (preview tạm)
    //   }
    // setFileListIMG(prev => [...prev, newImg])
    // callIMG()
callIMG()
    // refreshUpdateModal()
  } catch (err) {
    notification.error({ message: "Upload lỗi", description: err.message })
  }

  return false // ngăn antd auto upload
}

const APILoaiSP = async ()=>{
  const res = await callLoaiSanPhamds()
  if(res&& res?.data){
    // console.log('api loai sp',res)
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
    // notification.success({
    //   message:"Đổi vị trí",
    //   description:"Thành công"
    // })
  }
}

useEffect(()=>{
 if(fileListIMG.length>0){
    const payload = fileListIMG.map((item,index)=>({
      imageID:item.idPic,
      newIndex:index
    }))
  HinhAnhDoiViTri(payload)
  props.fetchProduct()
  
  }
  
 
},[fileListIMG])



useEffect(()=>{
 
  if(updateProductModal){
refreshUpdateModal()
initFunc()

        // setNewFileList([])
    //   APILoaiSP()
    //   APIDonViSP()
    //   console.log("dataUpdate.danhSachAnh.idPic,",dataUpdate.danhSachAnh)
    //   if(dataUpdate?.id){
    //     const listIMG = dataUpdate.danhSachAnh.map((img,index)=>({
    //   uid:String(img.idPic),      // thuoc tinh bat buoc cua antd dung lam key duy nhat de quan ly danh sach anh    
    //   name:img.filePath.split("/").pop(), //lấy tên file
    //   status: "done",
    //   url:`${import.meta.env.VITE_BACKEND_URL}${img?.filePath}`,
    //   idPic: img.idPic // su dung de xoa anh, doi vitri anh
    // }))
    // setFileListIMG(listIMG)
    //   }
  }
  if(dataUpdate?.id){

    initFunc()

    // console.log('check dataupdate',dataUpdate)

  // console.log('check init',init)
      setNewFileList([])
  }
  
 
},[updateProductModal,dataUpdate])
useEffect(()=>{
// refreshUpdateModal()
// setModal()
},[dataUpdate])
const initFunc = ()=>{
  const init = {
    ID:dataUpdate.id,
    TenSanPham:dataUpdate.tenSanPham,
    LoaiSanPhamID:dataUpdate.loaiSanPhamID,
    DonViTinhID:dataUpdate.donViTinhID,
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
  // setFileList(dataUpdate.danhSachAnh)
  form.setFieldsValue(init)
 }

  
  const handleCancel = () => {

    setIsUpdateProductModal(false)
  }

  const handleUploadFile = async({ info,file, onSuccess, onError }) => {
 
  
};

// const UpdateSP = async(values)=>{
//   console.log('val',values)
 
// }
 const onFinish = async(values) =>{
console.log('check values',values)
// UpdateSP(values)
let called = false
// const res = await SuaSP(values.ID,values.TenSanPham,values.LoaiSanPhamID,values.DonViTinhID,values.MoTa,values.SoLuong)
//   if(res&&res?.data===1){
//     console.log(res)
//     notification.success({message:"cập nhật thành công"})
//         form.resetFields();
//     setIsUpdateProductModal(false)
//     // setInit(null)  
//     await props.fetchProduct()
//   }

 try {
  if(values.TenSanPham || values.LoaiSanPhamID || values.DonViTinhID || values.MoTa || values.SoLuong){
     const resSP = await SuaSP(
        values.ID,
        values.TenSanPham,
        values.LoaiSanPhamID,
        values.DonViTinhID,
        values.MoTa,
        values.SoLuong
      )
       if (resSP?.data === 1) {
        notification.success({ message: "Cập nhật thông tin sản phẩm thành công" })
        called = true
      }
  }
   if (values.GiaBan || values.SalePercent) {
      const resGia = await SuaGiaSP(
         values.ID,
      values.GiaBan,
       values.SalePercent
      )
      if (resGia?.data === 1) {
        notification.success({ message: "Cập nhật giá sản phẩm thành công" })
        called = true
      }
    }

    if (called) {
      form.resetFields()
      setIsUpdateProductModal(false)
      await props.fetchProduct()
    } else {
      notification.info({ message: "Không có dữ liệu nào được thay đổi" })
    }
 }catch(error){
  notification.error({
      message: "Lỗi cập nhật",
      description: error?.response?.data?.message || "Lỗi không xác định"
    })
 }

 
 }
   const onValuesChange = (changedValues,allValues) =>{
    const giaBan = allValues.GiaBan || 0
    const salePercent = allValues.SalePercent || 0;
    const result = giaBan * (1 - salePercent / 100);
    setGiaSauGiam(result)
    }
      const handleRemoveImg= async(file) =>{
      console.log('check file',file.uid)
      const res = await RemoveIMG(file.idPic)
      console.log('checl remove',res)
      if(res&&res?.data?.status === 1){
        notification.success({
          message:"Xóa hình ảnh",
          description:"Thành công"
        },
        //  setModal()
        callIMG()
      
      )
       
        props.fetchProduct();
      }else{
        notification.error({
          message:"Xóa hình ảnh",
          description:"Thành thất bại"
        })
      }
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
       <Form.Item name="ID" hidden>
    <Input />
  </Form.Item>
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
        getValueFromEvent={(content) => content} //  lấy content (HTML string) từ ReactQuill
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
        // beforeUpload={()=>{false}} // không upload ngay
        // beforeUpload={APIUploadIMG}
        // fileList={newFileList}
        // onChange={({ newFileList }) => setNewFileList(UploadIMG(newFileList))}
        // onChange={}
        // onClick={()=>APIUploadIMG(file)}
        // onChange = {(file)=>APIUploadIMG(file)}
        // onClick={(file)=> APIUploadIMG(file)}
        beforeUpload={(file)=>APIUploadIMG(file)}
        // onChange={APIUploadIMG}
          // onChange={({ fileList: newFiles }) =>
          // setFileList([...fileList, ...newFiles])
        // }
   
          showUploadList={false}
        >
        <div>
          {loading ? <LoadingOutlined /> : <PlusOutlined />}
          <div style={{ marginTop: 8 }}>Upload</div>
      </div>
      </Upload>
         {/* Danh sách ảnh có thể kéo thả */}
      <ReactSortable
      key={refreshKey}   // mỗi khi length thay đổi => re-render

       className='sort-img' 
       style={{ 
       display: "flex", 
       flexWrap: "wrap", 
       gap: 12 }}
       list={fileListIMG} 
       setList={setFileListIMG}
      //  setList={(fileListIMG)=>{setFileListIMG(fileListIMG)
      
      //  }} 
       animation={150} 
       >
        {fileListIMG.map((file) => (
          <div key={file.uid} style={{ position: "relative", width: 100, height: 100 }}>
  <Image
    src={file.url || URL.createObjectURL(file.originFileObj)}
  //    src={file.url? file.url: file.originFileObj instanceof File? URL.createObjectURL(file.originFileObj)
  //     : ""
  // }


    alt={file.name}
    style={{
      width: 100,
      height: 100,
      objectFit: "cover",
      borderRadius: 8,
    }}
  />
  <button
    type="button" // rất quan trọng cần phải có để tách riêng với sự kiện onfinnish của antd tránh dùng chung

  
      onClick={() => setShowOptions(!showOptions)}
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
    <SettingOutlined />
  </button>
  {showOptions &&(
    <div style={{
      position:"absolute",
      top:32,
      right:4,
      display:'flex',
      flexDirection:'column',
      gap:'4px'
      }}>
       {/* Nút Xóa */}
          <button
            type="button" // rất quan trọng

            onClick={()=>handleRemoveImg(file)}
              // setFileList(fileList.filter((f) => f.uid !== file.uid))
            
            style={{
              background: "red",
              border: "none",
              color: "#fff",
              borderRadius: "50%",
              padding: "2px 6px",
              cursor: "pointer",
              
            }}
          >
            <DeleteOutlined
            
             />
          </button>
        
          <Upload 
          type="file"
            
              showUploadList={false}
               multiple={false}
        maxCount={1}
        beforeUpload={(newfile) => {
                    handleEditImg(newfile,file.idPic); // gọi API ngay khi chọn file
                    return false; // ngăn AntD tự upload
                  }}
            style={{
              background: "blue",
              border: "none",
              color: "#fff",
              borderRadius: "50%",
              padding: "2px 6px",
              cursor: "pointer",
              
            }}
          >
            <EditOutlined />
            </Upload>
    </div>
    
  )}
  
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