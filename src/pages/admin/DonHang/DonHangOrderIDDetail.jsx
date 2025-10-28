import React, { useEffect, useState } from 'react';
import { Button, Divider, Modal, Table } from 'antd';
import { AddressByOrderID, ChiTietDonHangAddress } from '../../../services/api.service';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import { Image } from 'antd';

const DonHangOrderIDDetail = (props) => {
const {orderIDdetails,setOrderIDdetails,dataOrderIDdetails,setDataOrderIDdetails} = props
const [data,setData] = useState(null)
const [addressData, setAddressData] = useState(null)
    console.log('check dataOrderIDdetails',dataOrderIDdetails)
    
function formatPhoneNumberInternational(phoneNumber, countryCode = 'VN') {
  const phoneNumberObject = parsePhoneNumberFromString(phoneNumber, countryCode);

  if (phoneNumberObject) {
    return phoneNumberObject.formatInternational();
  } else {
    return null; // Or handle invalid number appropriately
  }
}
const collumn =[
  {
    title:"Sản Phẩm",
    dataIndex: "tenSanPham",
    key: "tenSanPham",
    render : (_,record) => (
      <div style={{display:'flex',alignItems:'center',gap:20}}>
        <Image
          src={`${import.meta.env.VITE_BACKEND_URL}${record.filePath}`}
          width={80}
          height={80}
          style={{objectFit:'cover',borderRadius:4}}
        />
        
      <div>
        <div style={{fontWeight:600}}>{record.tenSanPham}</div>
        <div style={{color:'gray',fontSize:13}}>
          Mã SP : {record.sanPhamID}
        </div>
      </div>
      </div>
    )
  },
  {
    title:"Giá",
    dataIndex: "thanhTien",
    key:"thanhTien"
  },
    {
    title:"Số Lượng",
    dataIndex: "soLuong",
    key:"soLuong"
  },
   {
    title:"Tổng tiền",
    render:(_,record) =>{
      var tong= record.thanhTien * record.soLuong
      return(
        <p style={{fontWeight:'bold', color:'green'}}>{tong+" VNĐ"}</p>
      )
    }
  }
]
    const fetchData = async() => {
      const res = await ChiTietDonHangAddress(dataOrderIDdetails?.orderID)
      console.log('res',res)
      if(res&&res?.status===1){
        // console.log('test')
        setData(res.data)
      }
    }
    const getAddress = async() => {
      const res = await AddressByOrderID(dataOrderIDdetails?.orderID)
      if(res&&res?.status===1){
        setAddressData(res.data)
      }
    }

    useEffect(()=>{
      if(orderIDdetails){
      fetchData()
      getAddress()
      }
      
    },[orderIDdetails])
    useEffect(()=>{
      if(data!==null){
        console.log('check data',data)
      }
    },[data])
  return (
    <>
      <Modal
        title={'ID đơn hàng: '+dataOrderIDdetails?.orderID}
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={orderIDdetails}
        centered
        height={500}
        width={1000}
        // onOk={props.setOrderIDdetails(false)}
         onCancel={()=>setOrderIDdetails(false)}
      >
      <div className='orderID-container'>
      <div className='header-orderid'>
      <p>Địa Chỉ Nhận Hàng</p>
      {addressData?.map(item=>(
        <>
        <div style={{fontWeight:'bold'}}>
          {item.fullName+"("+formatPhoneNumberInternational(item.phone,"VN").replaceAll(" ", "")+") "}
        </div>
        <div style={{fontWeight:'bold'}}>
          {item.address}
        </div>
        </>
       
      ))}
        <Table
        style={{borderRadius:10,border:'1px solid blue'}}
        columns={collumn}
        dataSource={data}
        pagination={false}
        rowKey="sanPhamID"
      />
      </div>
      <div className='tongtien'>
       {data && (
  <div style={{ textAlign: 'right', marginTop: 10 }}>
    <strong>Tổng cộng: </strong>
    <span style={{ color: 'green', fontWeight: 600 }}>
      {data.reduce((sum, item) => sum + (item?.thanhTien || 0), 0)
        .toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
    </span>
  </div>
)}
      </div>
      </div>

      
      </Modal>
    </>
  );
};
export default DonHangOrderIDDetail;