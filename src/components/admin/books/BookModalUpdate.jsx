import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Input, InputNumber, Modal, notification, Row, Select, Space, Upload,Image, message } from 'antd';
import { AlipayCircleFilled, DashOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { AddBookAPI, getBookCategory, updateBook, uploadImg } from '../../../services/api.service';;
import { v4 as uuidv4 } from 'uuid';

//import { AddUserAPI } from '../../../services/api.service';
// import { Form } from 'react-router-dom';
const BookModalUpdate = (props) => {
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
    const {setIsUpdateBookModal,updateBookModal,setDataUpdate,dataUpdate } = props
console.log('check initFOrm>',initForm)

useEffect(()=>{
      
  // if(dataUpdate?._id){
  //   let imgThumnail ={} ,imgSlide = []
  //   if(dataUpdate.thumbnail){
  //     imgThumnail = {
  //       uid: uuidv4(),
  //       name: dataUpdate.thumbnail,
  //       status: 'done',
  //       url: `${import.meta.env.VITE_BACKEND_URL}/images/book/${dataUpdate.thumbnail}`,
  //     }

  //   }
  //   if(dataUpdate.slider && dataUpdate.slider.length >0 ){
  //     dataUpdate.slider.map((item)=>{
  //       imgSlide.push({
  //         uid: uuidv4(),
  //         name: item,
  //         status: 'done',
  //         url: `${import.meta.env.VITE_BACKEND_URL}/images/book/${item}`,
  //       })

  //     })
  //     console.log('checkimgsl>>',[imgSlide])
  //   }
  if (dataUpdate?._id) {
    const arrThumbnail = [
        {
            uid: uuidv4(),
            name: dataUpdate.thumbnail,
            status: 'done',
            url: `${import.meta.env.VITE_BACKEND_URL}/images/book/${dataUpdate.thumbnail}`,
        }
    ]

    const arrSlider = dataUpdate?.slider?.map(item => {
        return {
            uid: uuidv4(),
            name: item,
            status: 'done',
            url: `${import.meta.env.VITE_BACKEND_URL}/images/book/${item}`,
        }
    })
    
    const init ={
        _id: dataUpdate._id,
        mainText: dataUpdate.mainText,
        author: dataUpdate.author,
        price: dataUpdate.price,
        category: dataUpdate.category,
        quantity: dataUpdate.quantity,
        sold: dataUpdate.sold,
        thumbnail: { fileList: arrThumbnail },
        slider: { fileList: arrSlider }
      
    }
    
    console.log('check data update>>>',dataUpdate)
    setInit(init)
    setFileListThumbline(arrThumbnail);
    setFileListSlider(arrSlider);
        
    //setFileList([imgThumnail, ...imgSlide])
    
    console.log('check init>>',init)
    
    console.log('chếch>>',arrThumbnail, arrSlider)
    
    form.setFieldsValue(init);
    
  }
  return () => {
    form.resetFields();
}
//reset lai form khi mo modal upload
  
  //console.log('check dataupdate>>',dataUpdate)
 
},[dataUpdate])

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
      //neu file.url va .preview ko ton tai thi thuc hien
      // if (!file.url && !file.preview) {
        
      //   file.preview = await getBase64(file.originFileObj);
      //   console.log("true",file.preview)
      // }
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
    if(type === 'thumbnail'){
      setFileListThumbline([])
    }
    if(type === 'slider'){
      //item là biến đại diện cho từng phần tử trong mảng ở đây là fileListSlider duyệt qua 
      //duyệt qua từng phần tử trong mảng fileListSlider với mỗi đkiện nó sẽ ktra xem có đúng với uid
      //được chọn không nếu không đúng thì cho vào một mảng mới
      const newSlider = fileListSlider.filter(item => item.uid !== file.uid)
      setFileListSlider(newSlider)

    }

  }
  
  const handleCancel = () => {

    setIsUpdateBookModal(false)
  }
  const handleUploadFile = async({ info,file, onSuccess, onError }) => {
 
    console.log('check file>>',file)
    const res = await uploadImg(file);
        if (res && res.data) {
          setFileListThumbline([{
                name: res.data.fileUploaded,
                uid: file.uid
            }])
            onSuccess('ok')
        } else {
            onError('Đã có lỗi khi upload file');
        }
};
const handleUploadFileSlider = async({file,onSuccess,onError}) =>{
  const res = await uploadImg(file)
  if(res&& res.data){
    //sao chép mảng cũ từ fileListSlider được truyền vào sau đó set thêm data
    setFileListSlider((fileListSlider)=>[...fileListSlider,{
      name:res.data.fileUploaded,
      uid:file.uid
    }])
    onSuccess('ok')
  }else{
    onError('có lỗi sảy ra')
  }
}
 const onFinish = async(values) =>{
  console.log('check values books',values)
  //console.log('check dataupdate',dataUpdate)
  
  if(fileListThumbline.length===0){
    notification.error({
      message:'lỗi validate',
      description:'vui lòng upload ảnh thumbline'

    })
    return
  }
  if(fileListSlider.length===0){
    notification.error({
      message:'lỗi validate',
      description:'vui lòng upload ảnh slider'
    })
    return
  }
  const {mainText,author,price,sold,quantity,category} = values;
  const thumbline = fileListThumbline[0].name;
  //item đại diện cho từng phần tử của mảng fileListSlider item.name truy cập vào thuộc tính name của từng phần tử
  //Mã này tạo ra một mảng mới, trong đó mỗi phần tử là giá trị của thuộc tính name của các phần tử trong fileListSlider
  const slider = fileListSlider.map(item => item.name)
  setIsSubmit(true)
  console.log('check thumbline>>',thumbline)
  console.log('check slider>>',slider)
  
  

  const res = await updateBook(dataUpdate._id,thumbline,slider,mainText,author,price,sold,quantity,category)
  console.log('checkkress>>',res)
  if(res&&res.data){
   
    notification.success({
      message:'Cập nhật',
      description:'Thành công'
    })
    form.resetFields();
    setFileListSlider([]);
    setFileListThumbline([])
    setIsUpdateBookModal(false);
    await props.fetchBook()

  }else{
    notification.error({
      message:'Đã có lỗi sảy ra',
      description:res.message
    })
  }
  
  

 
 }
 console.log('Thumbnail:', initForm?.thumbnail?.fileList);
console.log('Slider:', initForm?.slider?.fileList);
  return (
    <>
      {/* <Button type="primary" onClick={showModal}>
        Open Modal
      </Button> */}
      <Modal title="Cập Nhật Người Dùng" 
      open={updateBookModal} 
      onOk={onFinish} 
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
    <Col span={12}>
      <Form.Item
        name="mainText"
        label="Tên Sách"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      </Col>
      <Col span={12}>
      <Form.Item
        name="author"
        label="Tác Giả"
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
          name="price"
          label="Giá Tiền"
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
            controls
            formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
           // style={{ width: "100%" }} // Input chiếm 100% chiều rộng
          />
        </Form.Item>
      </Col>

      <Col span={6}>
        <Form.Item
          name="category"
          label="Loại"
          style={{ flex: 1 }} // Đảm bảo cột giãn đều
     
        >
          <Select
            defaultValue={''}
            showSearch
            allowClear
           options={dataTypeSelect}
          />
        </Form.Item>
      </Col>
      <Col span={6}>
        <Form.Item
          name="quantity"
          label="Số Lượng"
         // style={{ flex: 1 }} // Đảm bảo cột giãn đều
          rules={[
            {
              required: true,
            },
          ]}
        >
          <InputNumber
         
            defaultValue={0}
            controls
            style={{ width: "100%" }} // Input chiếm 100% chiều rộng
          />
        </Form.Item>
      </Col>
      <Col span={6}>
        <Form.Item
          name="sold"
          label="Giá Bán"
         // style={{ flex: 1 }} // Đảm bảo cột giãn đều
         
        >
          <InputNumber
            defaultValue={0}
            style={{ width: "100%" }} // Input chiếm 100% chiều rộng
          />
        </Form.Item>
      </Col>

      <Col span={12}>
        <Form.Item
          name="thumbnail"
          label="Ảnh thumbnail"
        >
         <Upload
        listType="picture-card"
        name='thumbnail'
        // fileList={fileListThumbline}
        
        onPreview={handlePreview}
        onChange={handleChange}
        customRequest={handleUploadFile}
        onRemove={(file)=> hanldeRemove(file,'thumbnail')}
        multiple={false}
        maxCount={1}
        beforeUpload = {beforeUpload}
        //defaultFileList={initForm?.thumbnail?.fileList ?? []}
        defaultFileList={initForm?.thumbnail?.fileList ?? []}

      >
      
        {/* {fileList.length >= 8 ? null : uploadButton} */}
        <div>
          {loading ? <LoadingOutlined /> : <PlusOutlined />}
          <div style={{ marginTop: 8 }}>Upload</div>
      </div>
      </Upload>    
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item
          name="slider"
          label="Ảnh Slide"
        >
         <Upload
        name="slider"

        action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
        listType="picture-card"
        className="avatar-uploader"
        onPreview={handlePreview}
        onChange={(info)=>handleChange(info,'slider')}
        onRemove={(file)=> hanldeRemove(file,'slider')}
        multiple={true}
        customRequest={handleUploadFileSlider}
        beforeUpload = {beforeUpload}
        //fileList={initForm?.slider?.fileList ?? []}
        defaultFileList={initForm?.slider?.fileList ?? []}

      >
       <div>
          {loadingSlider ? <LoadingOutlined /> : <PlusOutlined />}
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
export default BookModalUpdate;