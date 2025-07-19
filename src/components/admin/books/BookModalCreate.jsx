import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Input, InputNumber, Modal, notification, Row, Select, Space, Upload,Image, message } from 'antd';
import { AlipayCircleFilled, DashOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { AddBookAPI, getBookCategory, uploadImg } from '../../../services/api.service';
//import { AddUserAPI } from '../../../services/api.service';
// import { Form } from 'react-router-dom';
const BookModalCreate = (props) => {
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
    const {setBookModalCreate,bookModalCreate } = props

    // const handlePreviewThumb = async (file) => {
    //   // if (!file.url && !file.preview) {
    //   //   file.preview = await getBase64(file.originFileObj);
    //   // }
    //   setPreviewImageThumb(file.url || file.preview);
    //   setPreviewOpen(true);
    // };
    
  

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
      // setPreviewImage(file.thumbUrl || file.preview || file.url);
      // setPreviewOpen(true);
      getBase64(file.originFileObj, (url) => {
        console.log('checkurl>>',url)
        setPreviewImage(url);
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
    });
    };
 
    useEffect(()=>{
      const fetchSelected = async() =>{
        const res = await getBookCategory()
        if(res&&res.data){
          const d = res.data.map(item=>{
            return {label:item,value:item}
          })
          setDataTypeSelect(d)
        }
      }
      fetchSelected()
    },[])
   //const handleChangeThumb = ({ fileListThumbline: newfileListThumbline }) => setFileListThumbline(newfileListThumbline);
  // const handleChangeThumb = (info) => {
  //   console.log('check info1>>',info)
  //   let newFileList = [...info.fileList];
  //   // Nếu file upload thành công, thêm URL hoặc preview
  //   // newFileList = newFileList.map((file) => {
  //   //   if (file.response) {
  //   //     // file.url = file.response.url; // Cập nhật URL từ response của API
  //   //     // console.log('file url',file.url)
  //   //   }
  //   //   return file;
  //   // });
  //   setFileListThumbline(newFileList);
  // };
    //const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
    // const onFinish = async(values) => {

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
    //     console.log('Success:', values);
    //     const res = await AddUserAPI(values.fullName,values.password,values.email,values.phone)
    //     console.log("check res>>",res)
    //     if(res&&res.data){
    //       notification.success({
    //         message:"Thêm Người Dùng",
    //         description:"Thành Công"
    //       })
    //       props.fetchUser()
    //     }else{
    //       notification.error({
    //         message:"Error",
    //         description:JSON.stringify(res.error || "Lỗi không xác định")
    //       })
    //     }
    //   };
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

   setBookModalCreate(false)
  }
  const handleUploadFile = async({ info,file, onSuccess, onError }) => {
    // setTimeout(() => {
    //    console.log('checkfile>',file)
    //     onSuccess("ok");
    // }, 1000);
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

  // const uploadButton = (
  //   <button
  //     style={{
  //       border: 0,
  //       background: 'none',
  //     }}
  //     type="button"
  //   >
  //     <PlusOutlined />
  //     <div
  //       style={{
  //         marginTop: 8,
  //       }}
  //     >
  //       Upload
  //     </div>
  //   </button>
  // );
 const onFinish = async(values) =>{
  console.log('check values books',values)
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

  const res = await AddBookAPI(thumbline,slider,mainText,author,price,sold,quantity,category)
  if(res&&res.data){
    console.log('check res>>',res)
    notification.success({
      message:'Thêm Mới',
      description:'Thành công'
    })
    form.resetFields();
    setFileListSlider([]);
    setFileListThumbline([])
    setBookModalCreate(false);
    await props.fetchBook()

  }else{
    notification.error({
      message:'Đã có lỗi sảy ra',
      description:res.message
    })
  }
  
 }
  return (
    <>
      {/* <Button type="primary" onClick={showModal}>
        Open Modal
      </Button> */}
      <Modal title="Thêm Mới Người Dùng" 
      open={bookModalCreate} 
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
           // formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            //controls
            style={{ width: "100%" }} // Input chiếm 100% chiều rộng
          />
        </Form.Item>
      </Col>

      <Col span={12}>
        <Form.Item
          name="thumbnail"
          label="Ảnh Thumbline"
        >
         <Upload
        listType="picture-card"
        //fileList={fileListThumbline}
        onPreview={handlePreview}
        onChange={handleChange}
        customRequest={handleUploadFile}
        onRemove={(file)=> hanldeRemove(file,'thumbnail')}
        multiple={false}
        maxCount={1}
        beforeUpload = {beforeUpload}
        

      >
        {/* {fileList.length >= 8 ? null : uploadButton} */}
        <div>
          {loading ? <LoadingOutlined /> : <PlusOutlined />}
          <div style={{ marginTop: 8 }}>Upload</div>
      </div>
      </Upload>
      {/* {previewImage && (
        <Image
          wrapperStyle={{
            display: 'none',
          }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(''),
          }}
          src={previewImage}
        /> */}
        
      {/* )} */}
      
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item
          name="slider"
          label="Ảnh Slide"
        >
         <Upload
        action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
        listType="picture-card"
        className="avatar-uploader"
        //fileList={fileList}
        onPreview={handlePreview}
        onChange={(info)=>handleChange(info,'slider')}
        onRemove={(file)=> hanldeRemove(file,'slider')}
        multiple={true}
        customRequest={handleUploadFileSlider}
        beforeUpload = {beforeUpload}
      
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
export default BookModalCreate;