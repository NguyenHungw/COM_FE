import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Input, InputNumber, Modal, notification, Row, Select, Space, Upload, message } from 'antd';
import { AlipayCircleFilled, DashOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { callDonVids, callLoaiSanPhamds, SuaDonVi, ThemSanPhamAnhVaGia } from '../../../services/api.service';


const DonViModalUpdate = (props) => {

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
  
    const handleCancel = () =>{
      setIsUpdateProductModal(false)
    }
    const onFinish = async (values)=>{
      console.log('check values ',values)
      // return
      const res = await SuaDonVi(values.donViTinhID,values.tenDonVi,values.mota)
      if(res&&res?.data){
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
         console.log("check dataup",dataUpdate)
       if(dataUpdate){
        const init = ({
          donViTinhID : dataUpdate.donViTinhID,
          tenDonVi : dataUpdate.tenDonVi,
          mota : dataUpdate.mota
        })

        setInit(init)
        form.setFieldsValue(init)
      }
      }
      
      

    },[updateProductModal])
  
  return (
    <>
   
      <Modal title="Cập Nhật Đơn Vi" 
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
        name="donViTinhID"
        hidden
      ></Form.Item>
      <Form.Item
        name="tenDonVi"
        label="Tên đơn vị"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      </Col>
       <Col span={16}>
      <Form.Item
        name="mota"
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
export default DonViModalUpdate;