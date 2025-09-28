import React, { useEffect, useState } from 'react';
import { Button, Input, message, notification, Pagination, Popconfirm, Space, Table, Tag } from 'antd';
import { CloudUploadOutlined, DeleteOutlined, EditOutlined, ExportOutlined, PlusOutlined, RedoOutlined, ReloadOutlined, SearchOutlined, SettingOutlined } from '@ant-design/icons';

import { Image } from 'antd';

// import './donViModalUpdate.scss'
import * as XLSX from 'xlsx';
import { ChiTietNND, DanhSachChucNang, DanhSachNhomQuyen } from '../../../../../services/api.service';


  import './chucNangTable.scss'


const ChucNangTable = ({dataChucNang,chucNangCuaNhom,setChucNangCuaNhom }) => {
  
    // const [productModalCreate,setProductkModalCreate] = useState(false)
  const [productList, setProductList] = useState([])
  const [dataDetailProduct,setDataDetailProduct] = useState(null)
  const [viewDetailProduct,setViewDetailProduct] = useState(false)
  const [viewImg ,setViewImg] = useState('')
  const [dataUpdate,setDataUpdate] = useState(null)
  const [updateProductModal,setIsUpdateProductModal] = useState(false)
  const [productModalCreate,setProductModalCreate] = useState(false)
  const [chucNangModal,setChucNangModal] = useState(false)
// phan trang
  const [total,setTotal] = useState(0)
  const [pageSize, setPageSize] = useState(5)
  const [current,setCurrent] = useState(1)
  const  [selectRowKey ,setSelectRowKey] = useState(null)
// 

    // const {dataChucNang,setDataChucNang } = props

    console.log('check chuc nang table',chucNangCuaNhom)
    // return
       const fetchProduct = async ()=>{
        if(dataChucNang){
           let query=`page=${current}&size=${pageSize}&id=${dataChucNang.nndid}`;

          const res = await ChiTietNND(query)
           if(res&&res?.data){
            console.log('check res',res.data)
            console.log('totalrow',res.totalRow)
            setTotal(res.totalRow)
            setProductList(res.data)
            console.log('check product list', productList)
      
        }
        }
         
    }

    useEffect(()=>{
      fetchProduct()
      setSelectRowKey(null)
      if(selectRowKey ==null){
        setChucNangCuaNhom(null)
      }

    },[dataChucNang])
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
      <span>Bảng Chức Năngx</span>
      <span style={{ display: 'flex', gap: 15 }}>

          <Button
              icon={<PlusOutlined />}
              type="primary"
              onClick={()=>setProductModalCreate(true) }
          >Thêm Chức Năng</Button>
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
    title: 'Chức Năng',
    dataIndex: 'tenChucNang',
    key: 'tenChucNang',
    sorter:true
    // render: text => <a>{text}</a>,
  },
   {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <>
        
          <div style={{ display: "flex", gap: "20px" }}>

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
        {console.table('last table',productList)}
        <div className='tableCN' style={{height:300}}>

            <Table
              title={renderHeader}
              columns={columns} 
              dataSource={productList}
              // rowKey='chucNangID'
              rowKey="id"

              onChange={handleOnchangePage}
              onRow={(record,rowIndex)=>{
                return {
                    onClick: () => {
                        console.log("Bạn vừa click row:", record);
                        setSelectRowKey(record.chucNangID)
                        setChucNangCuaNhom(record)

                    }
                }
                
              }}
              rowClassName={(record) =>
              record.chucNangID === selectRowKey ? "row-selected" : ""
          }
          pagination={false}
            //    pagination={{ 
            // current: current,
            // pageSize:pageSize, 
            // position: ["bottomRight"], // 👈 cố định vị trí

            // showSizeChanger: true, 
            // total:total,
            // showTotal: (total,Range) => {return(<div>{Range[0]} - {Range[1]} trên {total} rows</div>)}
            // }}
             />
        </div>

             <div style={{ marginTop: 16, textAlign: "center",maxHeight:'300px'}}>
              <Pagination
                current={current}
                pageSize={pageSize}
                total={total}
                showSizeChanger
                hideOnSinglePage={false}  // 👈 luôn hiển thị
                showTotal={(total, range) =>
                  `${range[0]} - ${range[1]} trên ${total} rows`
                }
                onChange={(page, size) => {
                  setCurrent(page);
                  setPageSize(size);
                }}
              />
            </div>
       
        </>
    )
}
export default ChucNangTable;