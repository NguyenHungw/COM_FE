import React, { useEffect, useState } from 'react';
import { Button, Input, message, notification, Pagination, Popconfirm, Space, Table, Tag } from 'antd';
import { CloudUploadOutlined, DeleteOutlined, EditOutlined, ExportOutlined, PlusOutlined, RedoOutlined, ReloadOutlined, SearchOutlined, SettingOutlined } from '@ant-design/icons';

import { Image } from 'antd';
import InputSearch from './InputSearch';
import './nhomNguoidungTable.scss'


// import './donViModalUpdate.scss'
import * as XLSX from 'xlsx';
import { DanhSachNhomQuyen } from '../../../../../services/api.service';
import ChucNangTable from '../ChucNangRole/ChucNangTable';




const NhomNguoiDungTable = (props) => {
  
    // const [productModalCreate,setProductkModalCreate] = useState(false)
  const [productList, setProductList] = useState(null)
  const [dataDetailProduct,setDataDetailProduct] = useState(null)
  const [viewDetailProduct,setViewDetailProduct] = useState(false)
  const [viewImg ,setViewImg] = useState('')
  const [dataUpdate,setDataUpdate] = useState(null)
  const [updateProductModal,setIsUpdateProductModal] = useState(false)
  const [productModalCreate,setProductModalCreate] = useState(false)
  const [chucNangModal,setChucNangModal] = useState(false)
// phan trang
  const [total,setTotal] = useState(null)
  const [pageSize, setPageSize] = useState(5)
  const [current,setCurrent] = useState(1)
  const [selectRowKey,setSelectRowKey] = useState(null)
// 
const [dataChucNang,setDataChucNang] = useState(null)
       const fetchProduct = async ()=>{
          let query=`page=${current}&size=${pageSize}`;

        const res = await DanhSachNhomQuyen(query)
        {
           if(res && res?.data){
            // console.log('check ress',res.data)
            //  setListProduct(res.data);
            console.log(res.data)
            console.log('totalrow',res.totalRow)
            setTotal(res.totalRow)
            setProductList(res.data)
           }
        }
    }

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
    const HandleDelete = async (id)=>{
      console.log('check id',id)
      
      return
      const res = await XoaDonVi(id)
      if(res && res?.data){
        fetchProduct()
        notification.success({
          message:'xóa thành công',
          description:res.status
        },
        
      )}

    }
      const handleExport = ()=>{
    let exportData = [];

    if(productList && productList.length>0){
      // console.log('check productlist',productList)
      const worksheet = XLSX.utils.json_to_sheet(productList);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
      XLSX.writeFile(workbook, "MYSavedData.xlsx");
    }
    
    
  }
  const renderHeader=() => {
    
    return(
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <span>Table List Users</span>
      <span style={{ display: 'flex', gap: 15 }}>
      <div className='search' style={{display:'flex'}}>
          <Input></Input>
      <Button
              icon={<SearchOutlined />}
              // type="green"
              // onClick={handleExport}
          ></Button>
      </div>
    
          <Button
              icon={<ExportOutlined />}
              type="primary"
              onClick={handleExport}
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

},[current,pageSize])
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
    dataIndex: 'nndid',
       


    render: (_, record, index) => {
        return (
            <div><a href='#' rowKey={record.nndid}
            onClick={
              ()=>{
               setViewDetailProduct(true)
               setDataDetailProduct(record)
               console.log('check record',record)
              }
            }
            >{record.nndid}</a></div>
        )
        
    }
},
    
  {
    title: 'Tên Nhóm Người Dùng',
    dataIndex: 'tenNND',
    key: 'tenNND',
    // render: text => <a>{text}</a>,
  },
  {
    title: 'Mô Tả',
    dataIndex: 'ghiChu',
    key: 'ghiChu',
    sorter:true
  },
 
   {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <>
        
          <div style={{ display: "flex", gap: "20px" }}>
          
            <SettingOutlined
              onClick={() => {
                // console.log("check record",record)
               setDataUpdate(record)
               setChucNangModal(true)
              }}
              style={{ cursor: "pointer", color: "black" }}
            />
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
               onConfirm={() => { HandleDelete(record.donViTinhID) }}
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
        {/* <InputSearch/> */}
            <Table
              title={renderHeader}
              columns={columns} 
              dataSource={productList}
              rowKey='id'
              onChange={handleOnchangePage}
                onRow={(record,rowIndex)=>{
                return {
                    onClick: () => {
                      if(selectRowKey === record.nndid){ // neeus click 2 lần cùng 1 row
                        setSelectRowKey(null)
                        // props.setDataChucNang([]);      
                      }else {
                        // lần click đầu tiên hoặc click row khác
                        setSelectRowKey(record.nndid);
                        props.setDataChucNang(record);
                        props.setChucNangCuaNhom(null)
                      }


                      // }
                      //   console.log("Bạn vừa click row:", record);
                      //   setSelectRowKey(record.nndid)
                      //   props.setDataChucNang(record)
                      //   setDataChucNang(record)

                    }
                }
                
              }}
              rowClassName={(record) =>
              record.nndid === selectRowKey ? "row-selected" : ""}
              
               pagination={{ 
            current: current,
            pageSize:pageSize, 
            showSizeChanger: true, 
            total:total,
            showTotal: (total,Range) => {return(<div>{Range[0]} - {Range[1]} trên {total} rows</div>)}
            }}
             />
        
        {/* <ViewDetailDonVi
          dataUpdate={dataUpdate}
          setDataUpdate= {setDataUpdate}
          viewDetailProduct = {viewDetailProduct}
          setViewDetailProduct = {setViewDetailProduct}
          dataDetailProduct = {dataDetailProduct}
          setDataDetailProduct = {setDataDetailProduct}
        />
        <Nhom          
          dataUpdate = {dataUpdate}
          setDataUpdate = {setDataUpdate}
          updateProductModal = {updateProductModal}
          setIsUpdateProductModal = {setIsUpdateProductModal}
          fetchProduct={fetchProduct}
        />
        <DonViModalCreate
          productModalCreate = {productModalCreate}
          setProductModalCreate = {setProductModalCreate}
          dataUpdate = {dataUpdate}
          fetchProduct={fetchProduct}

        /> */}
             {/* click vào row thì truyền data tới cn table */}
             {/* <ChucNangTable
             dataChucNang = {dataChucNang}
             setDataChucNang ={setDataChucNang}

             /> */}
        </>
    )
}
export default NhomNguoiDungTable;