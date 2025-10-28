import React, { useEffect, useState } from 'react';
import { Button, Input, message, notification, Pagination, Popconfirm, Space, Table, Tag } from 'antd';
import { CallDanhSachDonViPage, callDanhSachSPAdmin_NhieuIMG, DanhSachDonHang, getProductsAdminAPI, getProductsAPI, TrangThaiDonHang, XoaDonVi, XoaSPAnhGia } from '../../../services/api.service';
import { CloudUploadOutlined, DeleteOutlined, EditOutlined, ExportOutlined, PlusOutlined, RedoOutlined, ReloadOutlined, SearchOutlined } from '@ant-design/icons';

import { Image } from 'antd';
// import InputSearch from './InputSearch';
// import DonViModalUpdate from './DonViModalUpdate';
// import DonViModalCreate from './DonViModalCreate';
// import './donViModalUpdate.scss'
import * as XLSX from 'xlsx';
import DonHangOrderIDDetail from './DonHangOrderIDDetail';
import DonHangUserDetail from './DonHangUserDetail';
// import ViewDetailDonVi from './ViewDetailDonVi';



const DonHangTable = () => {
  
    // const [productModalCreate,setProductkModalCreate] = useState(false)
  const [productList, setProductList] = useState(null)
  const [orderIDdetails,setOrderIDdetails] = useState(false)
  const [dataOrderIDdetails,setDataOrderIDdetails] = useState(null)

  const [userIDdetails,setUserIDdetails] = useState(false)


// phan trang
  const [total,setTotal] = useState(null)
  const [pageSize, setPageSize] = useState(10)
  const [current,setCurrent] = useState(1)
// 
  const [userID,setUserID] = useState(null)
       const fetchProduct = async ()=>{
          let query=`page=${current}&size=${pageSize}`;

        const res = await DanhSachDonHang(query)
        {
           if(res && res?.data){
            // console.log('check ress',res.data)
            //  setListProduct(res.data);
            console.log(res.data)
            console.log('totalrow',res.totalRow)
            setTotal(res.totalRow)
            setProductList(res.data.reverse())
           }
        }
    }

    const handleXacNhanDon = async(record) => {
      console.log('check record',record)
   
      if(record.trangThaiDonHang>=0 && record.trangThaiDonHang<4){

        const newTrangThai= record.trangThaiDonHang+1
        console.log('check newtrangthai',newTrangThai)
        // console.log('')
 const res = await TrangThaiDonHang(record.orderID,newTrangThai);
 console.log('check res>>>',res)

      if(res&&res?.status===1){
        notification.success({message:'Cập nhật thành công'})
        fetchProduct()
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
  useEffect(()=>{
    if(userID != null){
      setUserIDdetails(true)
    }

  },[userID])

    const HandleDelete = async (id)=>{
      console.log('check id',id)
      // return
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
      <span style={{fontWeight:'bold'}}>Đơn Hàng</span>
      <span style={{ display: 'flex', gap: 15 }}>
      <div className='search-container' style={{display:'flex'}}>
        <Input style={{width:500}}/>
        <Button
          icon={<SearchOutlined />}
        />
      </div>
          <Button
              icon={<ExportOutlined />}
              type="primary"
              onClick={handleExport}
          >Export</Button>

 
       
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
useEffect(()=>{
  if(userID){
    console.log('check userID',userID)
  }
},[userID])
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
    title: 'OrderID',
    dataIndex: 'OrderID',
    render: (_, record, index) => {
        return (
            <div><a rowKey={record.orderID} 
            onClick={
              ()=>{
               setOrderIDdetails(true)
               setDataOrderIDdetails(record)
               console.log('check record',record)
              }
            }
            >{record.orderID}</a></div>
        )
        
    }
},

  {
    title: 'Người Đặt Hàng',
    dataIndex: 'fullName',
    key: 'fullName',
    render: (text, record) => (
    <span
      style={{ color: 'blue', cursor: 'pointer' }}
      // onMouseDown={() => setUserID(record.userID)}
      onClick={() => setUserID(record.userID)}
    >
      {text}
    </span>
  ),
  },
    {
    title: 'Phương Thức Thanh Toán',
    dataIndex: 'phuongThucThanhToan',
    key: 'phuongThucThanhToan',
      
  },
      {
    title: 'Ngày Mua',
    dataIndex: 'ngayMua',
    key: 'ngayMua',
render: (_, record) => {
  const date = new Date(record.ngayMua);
  //date.setHours(date.getHours() - 7); // trừ 7 tiếng UTC+7
  return <div>{date.toLocaleString('vi-VN')}</div>;
}
  },
      {
    title: 'Giá Trị',
    dataIndex: 'thanhTien',
    key: 'thanhTien',
     render: (thanhtien) => {
      if(thanhtien == null) return '-';
      var text = thanhtien.toLocaleString('vi-VN'); // thêm dấu chấm ngăn cách hàng nghìn
      return <p style={{fontWeight:'bold', color:'green'}} >{text}</p>
     }
  },
      {
    title: 'Trang Thái Thanh Toán',
    dataIndex: 'trangThaiThanhToan',
    key: 'trangThaiThanhToan',
          render: (trangThaiThanhToan) => {
        let color = trangThaiThanhToan === 1 ? 'green' : 'volcano';
        let text = trangThaiThanhToan === 1 ? 'Đã Thanh Toán' : 'Chưa Thanh Toán';
        return <Tag color={color}>{text}</Tag>;
      }
  },
    {
    title: 'Trang Thái Đơn Hàng',
    dataIndex: 'trangThaiDonHang',
    key: 'trangThaiDonHang',
    render:(trangThaiDonHang)=>{
       const statusMap = {
      0: { color: 'yellow', text: 'Đang Chờ Xử Lý' },
      1: { color: 'processing', text: 'Đang Vận Chuyển' },
      2: { color: 'success', text: 'Giao Thành Công' },
      3: { color: 'error', text: 'Đã Hủy' },
      4: { color: 'warning', text: 'Hoàn Trả' },
    };
    if(trangThaiDonHang === null || trangThaiDonHang === undefined ){
      return <Tag color='gray' >Chưa có</Tag>
    }
    const status = statusMap[trangThaiDonHang] || {color:'default',text:'Không xác định'}
    return <Tag color={status.color}>{status.text}</Tag>
    }
  },
   {
      title: "Action",
      key: "action",
      render: (_, record) => {
        let buttontxt = ''
        let buttonColor ='default'

        switch(record.trangThaiDonHang){
          case 0:
            buttontxt = "Xác Nhận"
            buttonColor ="blue"
            break;
          case 1: 
            buttontxt ="Đã Giao"
            buttonColor = "green"
            break;
          case 2:
            buttontxt ="Đã Hủy"
            buttonColor = "red"
            break;
          case 3:
            buttontxt ="Hoàn Trả"
            buttonColor = "orange"
            break;
          default:
            buttontxt=null
            break;
        }

      return(
        <div style={{display:'flex',gap:20}}>
          {buttontxt&&(
            <Button
            type='primary'
            style={{backgroundColor: buttonColor,borderColor:buttonColor}}
            onClick={()=>handleXacNhanDon(record)}
            >
            {buttontxt}
            </Button>
            
          )}
                 {(record?.trangThaiDonHang === null || record?.trangThaiDonHang === undefined || record?.trangThaiDonHang===4)&&(
              <Popconfirm
              placement="left"
              title="Delete the task"
              description="Are you sure to delete this task?"
              onConfirm={() => { HandleDelete(record.orderID) }}
              onCancel={cancel}
              okText="Yes"
              cancelText="No"
            >
              <DeleteOutlined style={{ cursor: "pointer", color: "red" }} />
            </Popconfirm>
            )}
        </div>
      )
    
     
           
      }
      
  }
];


    return(
        <>
        {/* <InputSearch/> */}
        {/* <div style={{ transform: 'scale(0.9)', transformOrigin: 'top left' }}> */}
            <Table
 
              title={renderHeader}
              columns={columns} 
              dataSource={productList}
              rowKey='id'
              onChange={handleOnchangePage}
               pagination={{ 
            current: current,
            pageSize:pageSize, 
            showSizeChanger: true, 
            total:total,
            showTotal: (total,Range) => {return(<div>{Range[0]} - {Range[1]} trên {total} rows</div>)}
            }}
             />
             {/* </div> */}
             <DonHangOrderIDDetail
             dataOrderIDdetails = {dataOrderIDdetails}
             setDataOrderIDdetails = {setDataOrderIDdetails}
             orderIDdetails = {orderIDdetails}
             setOrderIDdetails ={setOrderIDdetails}

             />
             {/* <DonHangUserDetail
              userID = {userID}
              userIDdetails = {userIDdetails}
              setUserIDdetails = {setUserIDdetails}
              
             >
             </DonHangUserDetail> */}
        {/* <ViewDetailDonVi
          dataUpdate={dataUpdate}
          setDataUpdate= {setDataUpdate}
          viewDetailProduct = {viewDetailProduct}
          setViewDetailProduct = {setViewDetailProduct}
          dataDetailProduct = {dataDetailProduct}
          setDataDetailProduct = {setDataDetailProduct}
        />
        <DonViModalUpdate          
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
  
        </>
    )
}
export default DonHangTable;