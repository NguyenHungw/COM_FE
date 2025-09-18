import React, { useEffect, useState } from 'react';
import { Button, message, notification, Popconfirm, Space, Table, Tag } from 'antd';
import { callDanhSachSPAdmin_NhieuIMG, getProductsAdminAPI, getProductsAPI, XoaSPAnhGia } from '../../../services/api.service';
import { CloudUploadOutlined, DeleteOutlined, EditOutlined, ExportOutlined, PlusOutlined, RedoOutlined, ReloadOutlined } from '@ant-design/icons';

import { Image } from 'antd';
import InputSearch from './InputSearch';
import ViewDetailProduct from './ViewDetailProduct';
import SanPhamModalUpdate from './SanPhamModalUpdate';
import SanPhamModalCreate from './SanPhamModalCreate';
import './sanPhamModalUpdate.scss'


const SanPhamTable = () => {
  
    // const [productModalCreate,setProductkModalCreate] = useState(false)
  const [productList, setProductList] = useState(null)
  const [dataDetailProduct,setDataDetailProduct] = useState(null)
  const [viewDetailProduct,setViewDetailProduct] = useState(false)
  const [viewImg ,setViewImg] = useState('')
  const [dataUpdate,setDataUpdate] = useState(null)
  const [updateProductModal,setIsUpdateProductModal] = useState(false)
  const [productModalCreate,setProductModalCreate] = useState(false)

    let query = 'page=1&s=50'
       const fetchProduct = async ()=>{
        const res = await callDanhSachSPAdmin_NhieuIMG(query)
        {
           if(res && res?.data){
            console.log('check ress',res.data)
            setProductList(res.data)
           }
        }
    }
    const HandleDelete = async (id)=>{
      const res = await XoaSPAnhGia(id)
      if(res && res?.data){
        fetchProduct()
        notification.success({
          message:'xóa thành công',
          description:res.status
        },
        
      )}

    }
  const renderHeader=() => {
    
    return(
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <span>Table List Users</span>
      <span style={{ display: 'flex', gap: 15 }}>
          <Button
              icon={<ExportOutlined />}
              type="primary"
              // onClick={handleExport}
          >Export</Button>

          <Button
              icon={<CloudUploadOutlined />}
              type="primary"
            // onClick={() => setUserImportModal(true)}
          >Import</Button>

          <Button
              icon={<PlusOutlined />}
              type="primary"
              onClick={()=>setProductModalCreate(true) }
          >Thêm mới</Button>
          <Button type='ghost' onClick={() => fetchProduct()}>
              <ReloadOutlined/>
          </Button>
      </span>
  </div>
    )
  }

useEffect(()=>{
fetchProduct()
},[])
const confirm = e => {
  console.log(e);
  message.success('Click on Yes');
};
const cancel = e => {
  console.log(e);
  message.error('Click on No');
};
const filePath = `${import.meta.env.VITE_BACKEND_URL}/upload/${productList?.Anh}`
// console.log('fp',filePath)

// console.log('product',productList?.filePath)

const columns = [
   {
      title: 'STT',
      //key: '_id',
      render: (_, record, index) => {
          return (
              <div>{index + 1}</div>
          )
      }
  },
  {
    title: 'ID',
    

    render: (_, record, index) => {
        return (
            <div><a href='#' 
            onClick={
              ()=>{
               setViewDetailProduct(true)
               setDataDetailProduct(record)
               console.log('check record',record)
              }
            }
            >{record.id}</a></div>
        )
        
    }
},
    {
    title: 'Ảnh Sản Phẩm',
    // dataIndex: filePath,
    // key: 'filePath',
    render: (_,record,index)=>{
      const url = `${import.meta.env.VITE_BACKEND_URL}${record?.anhChinh}`
      return(
         <Image
          width={80}
          height={80}
          src={url}
          style={{objectFit:'cover',borderRadius:4}}
        />
       
      )
    }
    // render: text => <a>{text}</a>,
  },
  {
    title: 'Tên Sản Phẩm',
    dataIndex: 'tenSanPham',
    key: 'tenSanPham',
    sorter:true
    // render: text => <a>{text}</a>,
  },
  {
    title: 'Giá bán',
    dataIndex: 'giaBan',
    key: 'giaBan',
    sorter:true
  },
  {
    title: 'SalePercent',
    dataIndex: 'salePercent',
    key: 'salePercent',
    sorter:true
  },
{
    title: 'Giá sau giảm',
    dataIndex: 'giaSauGiam',
    key: 'giaSauGiam',
    sorter:true
  },
  {
    title: 'Số Lượng',
    dataIndex: 'soLuong',
    key: 'SoLuong',
    sorter:true
  },
  {
    title: 'Tên loại sản phẩm',
    dataIndex: 'tenLoaiSP',
    key: 'tenLoaiSP',
    sorter:true
  },
  {
    title: 'Tên đơn vị',
    dataIndex: 'tenDonVi',
    key: 'tenDonVi',
    sorter:true
  },
  {
    title: 'Ngày bắt đầu',
    dataIndex: 'ngayBatDau',
    key: 'ngayBatDau',
    sorter:true
  },
   {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <>
          <div style={{ display: "flex", gap: "20px" }}>
            <EditOutlined
              onClick={() => {
                // console.log("check record",record)
               setDataUpdate(record)
               setIsUpdateProductModal(true)
              }}
              style={{ cursor: "pointer", color: "orange" }}
            />
            <Popconfirm
              placement="left"
              title="Delete the task"
              description="Are you sure to delete this task?"
               onConfirm={() => { HandleDelete(record.id) }}
              onCancel={cancel}
              okText="Yes"
              cancelText="No"
            >
              <DeleteOutlined style={{ cursor: "pointer", color: "red" }} />
            </Popconfirm>
          </div>
        </>
      )
  }
];


    return(
        <>
        <InputSearch/>
            <Table
              title={renderHeader}
              columns={columns} 
              dataSource={productList}
              rowKey='id'
             />
        <ViewDetailProduct
          dataUpdate={dataUpdate}
          setDataUpdate= {setDataUpdate}
          viewDetailProduct = {viewDetailProduct}
          setViewDetailProduct = {setViewDetailProduct}
          dataDetailProduct = {dataDetailProduct}
          setDataDetailProduct = {setDataDetailProduct}
        />
        <SanPhamModalUpdate
          dataUpdate = {dataUpdate}
          setDataUpdate = {setDataUpdate}
          updateProductModal = {updateProductModal}
          setIsUpdateProductModal = {setIsUpdateProductModal}
          fetchProduct={fetchProduct}
        />
        <SanPhamModalCreate
          productModalCreate = {productModalCreate}
          setProductModalCreate = {setProductModalCreate}

        />
        </>
    )
}
export default SanPhamTable;