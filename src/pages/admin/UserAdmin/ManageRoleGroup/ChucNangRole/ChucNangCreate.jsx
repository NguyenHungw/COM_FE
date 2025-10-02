import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Input, InputNumber, Modal, notification, Row, Select, Space, Upload, message, Table } from 'antd';
import { AlipayCircleFilled, DashOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { DanhSachChucNangChuaCo, ThemCNcuaNND, ThemNhomChucNang } from '../../../../../services/api.service';

import './chucNangCreate.scss'

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

const ChucNangCreate = ({dataChucNang,chucNangCuaNhom,setChucNangCuaNhom,productModalCreate,setProductModalCreate,fetchProduct}) => {
  

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
    // const {productModalCreate,setProductModalCreate,dataUpdate } = props
    const [total,setTotal] = useState(0)
    const [pageSize, setPageSize] = useState(5)
    const [current,setCurrent] = useState(1)
    const  [selectRowKey ,setSelectRowKey] = useState([])
    const [productList,setProductList] = useState(null)
    const [dataSelect, setDataSelect] = useState([])


  // const [selectedItems, setSelectedItems] = useState([]);
  // const filteredOptions = dataSelect.filter(o => !selectedItems.includes(o));
  const handlesubmit = async (ids) => {
    console.log('check id',ids)
    console.log('check data',dataChucNang)

    
    // const res = await ThemCNcuaNND({ ids, nndid: dataChucNang.nndid })
    // console.log('check rés',res)
    // if(res&&res?.status===1){
    //   notification.success("Thêm Thành công")
    //   setProductModalCreate(false)
    // }
    try {
    // Gọi nhiều request song song
    const results = await Promise.all(
      ids.map((id) => ThemCNcuaNND(id, dataChucNang.nndid))
    );

    // Kiểm tra tất cả đều thành công
    if (results.every((res) => res && res.status === 1)) {
      notification.success({ message: "Thêm thành công tất cả" });
      setProductModalCreate(false);
      setDataSelect([])
      setSelectRowKey([])
      fetchProduct()
    } else {
      notification.error({ message: "Có id thêm không thành công" });
    }
  } catch (err) {
    console.error("Lỗi khi gọi API:", err);
    notification.error({ message: "Lỗi hệ thống" });
  }

  }

  useEffect(()=>{
if(dataChucNang){
      console.log('check dataa cn ',dataChucNang)
            


}
  },[dataChucNang])
  // useEffect(()=>{
  //   console.log('check dataselect',dataSelect)
  
  // },[dataSelect])
  const fetchDanhSach = async () => {
    let query=`page=${current}&size=${pageSize}&id=${dataChucNang.nndid}`;

    const res = await DanhSachChucNangChuaCo(query)
    console.log('1111111111111111',res)
    if(res&& res?.status===1){
      setProductList(res.data)
      setTotal(res.totalRow)
      console.log('check product list', productList)
    }
  }

  
    useEffect(()=>{
    if(dataChucNang){
          console.log('xxxxxxxxxxxxxxxxx',dataChucNang.nndid)
fetchDanhSach()
    }
  },[productModalCreate])
    const handleCancel = () =>{
      setProductModalCreate(false)
       setDataSelect([])
      setSelectRowKey([])
    }
    const onFinish = async (values)=>{{
      // console.log('check values',values)
    //  return
      const res = await ThemNhomChucNang(values.tenChucNang)
      if(res && res?.data){
        notification.success({
          message:'Thêm Chức Năng',
          description:'Thành công'
        })
        fetchProduct()
        form.resetFields()
        setProductModalCreate(false)
      }
    }}

    const columns = [
   {
      title: 'STT',
      key: 'id',
      render: (_, record, index) => {
          return (
              <div>{index + 1}</div>
          )
          
      }
      
  },
   {
    title: 'ID',
    dataIndex: 'chucNangid',
    key: 'chucNangid',
    // render: text => <a>{text}</a>,
  },
  {
    title: 'Chức Năng',
    dataIndex: 'tenChucNang',
    key: 'tenChucNang',
    // render: text => <a>{text}</a>,
  },
   
  
   {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <>
        
          <div style={{ display: "flex", gap: "20px" }}>
{/* 
            <Popconfirm
              placement="left"
              title="Delete the task"
              description="Are you sure to delete this task?"
              onConfirm={() => { HandleDelete(record.donViTinhID) }}
              onCancel={cancel}
              okText="Yes"
              cancelText="No"
            >
              <DeleteOutlined style={{ cursor: "pointer", color: "red" }} />
            </Popconfirm> */}
          </div>
        </>
      )
      
  }
];
 const handleOnchangePage = (pagination, filters, sorter, extra) =>{
    if (pagination && pagination.current) {
      if (+pagination.current !== +current) { //current la gia tri page hien tai react dang luu
        setCurrent(+pagination.current) //"5" =>5
      }
    }
    if (pagination && pagination.pageSize) {
      if (+pagination.pageSize !== +pageSize) { //current la gia tri page hien tai react dang luu
        setPageSize(+pagination.pageSize) //"5" =>5
      }
    }
    // if(sorter && sorter.field){
    //   const q = sorter.order === 'ascend' ? `sort=${sorter.field}` : `sort=-${sorter.field}`;
    //   setSortQuery(q);
    // }
  }
  
  return (
    <>
      <Modal title="Thêm Mới Chức Năng" 
      open={productModalCreate} 
      // onOk={onFinish} 
      onCancel={handleCancel}
      footer={null}
      width={800}
      confirmLoading={isSubmit}
      >
      <DashOutlined/>
        <Select
      mode="multiple"
      placeholder="Inserted are removed"
      value={
        dataSelect ? dataSelect.map(item => item.chucNangid) : []

        }
           // ✅ chỉ lấy id
      //       onChange={(values) => {
      //   // values là mảng id [1,2,3]
      //   const selected = productList.filter(item =>
      //     values.includes(item.chucNangid)
      //   );
      //   setDataSelect(selected); // lưu object đầy đủ
      // }}
      style={{ width: '100%' }}
      options={dataSelect.map(item => ({
        value: item.chucNangid,
        label: item.tenChucNang,
      }))}
    />
       <Table
              // title={renderHeader}
              columns={columns} 
              dataSource={productList}
              // rowKey='chucNangID'
              rowKey="id"
              onChange={handleOnchangePage}
              onRow={(record,rowIndex)=>{
                return {
                    onClick: () => {
                    setSelectRowKey(prev =>
                      prev.includes(record.chucNangid)
                        ? prev.filter(id => id !== record.chucNangid) // bỏ nếu đã có
                        : [...prev, record.chucNangid]                // thêm nếu chưa có
                    );
                    // setDataSelect([record])
                setDataSelect(prev => {
                  // kiểm tra record đã có trong mảng chưa
                  const exists = prev.some(item => item.chucNangid === record.chucNangid);
                  if (exists) {
                    // nếu có rồi => bỏ ra 
                    return prev.filter(item => item.chucNangid !== record.chucNangid);
                  } else {
                    // nếu chưa có => thêm vào
                    return [...prev, record];
                  }
                });
                    // else{
                    //   setDataSelect([])
                    //   setDataSelect([record])
                    // }
                    }
                }
                
              }}
              rowClassName={(record) =>
              selectRowKey.includes(record.chucNangid) ? "row-selected" : ""
          }/>
    <div className='btn' style={{ display: "flex", justifyContent: "flex-end", width: "100%", gap: "10px" }}>
    <Button  
    onClick={() => { 
    const ids = dataSelect.map(item => item.chucNangid);
    handlesubmit(ids)
    // form.submit() 
    }} 
    type="primary">Submit</Button>
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
export default ChucNangCreate;