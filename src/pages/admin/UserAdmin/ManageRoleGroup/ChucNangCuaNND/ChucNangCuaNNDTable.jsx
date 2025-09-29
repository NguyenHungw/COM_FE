import React, { useEffect, useState } from 'react';
import { Button, Checkbox, Input, message, notification, Pagination, Popconfirm, Space, Table, Tag } from 'antd';
import { CloudUploadOutlined, DeleteOutlined, EditOutlined, ExportOutlined, PlusOutlined, RedoOutlined, ReloadOutlined, SaveOutlined, SearchOutlined, SettingOutlined } from '@ant-design/icons';
import './chucNangCuaNND.scss' 
import { Image } from 'antd';

// import './donViModalUpdate.scss'
import * as XLSX from 'xlsx';
import { ChiTietNND, DanhSachChucNang, DanhSachNhomQuyen, SuaCNCN } from '../../../../../services/api.service';
import { render } from 'react-dom';


//   import './chucNangTable.scss'


const ChucNangCuaNND = ({ dataChucNang,chucNangCuaNhom, onUpdatePermission,onRefresh }) => {
  
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
  const  [selectRowKey ,setSelectRowKey] = useState(null)

// 
const [dataSource, setDataSource] = useState([]);

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
    //báo cho cha biết để refresh lại bảng trái
const handleSaveCN = async()=>{
  console.log('check cn',chucNangCuaNhom)
  const res = await SuaCNCN(chucNangCuaNhom.id,chucNangCuaNhom.chucNangID,chucNangCuaNhom.nndid,chucNangCuaNhom.xem,chucNangCuaNhom.them,chucNangCuaNhom.sua,chucNangCuaNhom.xoa)
  if(res && res?.status===1){
    notification.success({message:'Lưu Thành Công'})
    // setProductList(null)
    if(onRefresh){
onRefresh()
    }
  }
}

  const handleCheckboxChange = (e, dulieutruyenvao) => {
    //              copy object hien tai   //cap nhat dung filed bi click  
    const updated = { ...chucNangCuaNhom, [dulieutruyenvao]: e.target.checked };
    onUpdatePermission(updated); // báo cho cha biết
  };
useEffect(() => {
  if (chucNangCuaNhom) {
    // Ép object thành array để Table đọc được
    setProductList([chucNangCuaNhom]);
  } else {
    setProductList([]);
  }
}, [chucNangCuaNhom]);

const onChangeXem = (e,record) => {
  // console.log(`checked = ${e.target.checked}`);
  console.log('check onchange',e)
    console.log('check record',record)

  return
  const updated = dataSource.map(item=>{
    if(item.key == record.key) {
      return {...item, xem: e.target.value}; //cập nhật cột xem
    }
    return item;
  })
  setDataSource(updated)
};
const onChangeThem = e => {
  console.log(`checked = ${e.target.checked}`);
};
const onChangeSua = e => {
  console.log(`checked = ${e.target.checked}`);
};
const onChangeXoa = e => {
  console.log(`checked = ${e.target.checked}`);
  
};

    //    const fetchProduct = async ()=>{
    //       let query=`page=${current}&size=${pageSize}`;

    //     const res = await DanhSachChucNang(query)
    //     {
    //        if(res && res?.data){
    //         // console.log('check ress',res.data)
    //         //  setListProduct(res.data);
    //         console.log(res.data)
    //         console.log('totalrow',res.totalRow)
    //         setTotal(res.totalRow)
    //         setProductList(res.data)
    //        }
    //     }
    // }

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
            <span>Bảng Chức Năng</span>
            <span style={{ display: 'flex', gap: 15 }}>
      
                <Button
                    icon={<SaveOutlined />}
                    type="primary"
                    onClick={()=>handleSaveCN() }
                >Lưu</Button>
                <Button type='ghost' 
                // onClick={() => fetchProduct()}
                >
                    <ReloadOutlined/>
                </Button>
            </span>
        </div>
    )
  }

useEffect(()=>{
// fetchProduct()

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
      dataIndex: 'xem',
      render: (_, record) => (
        <Checkbox
          checked={record.xem}
          onChange={(e) => handleCheckboxChange(e, "xem")}
        >
          Xem
        </Checkbox>
      )
    },
    {
      dataIndex: 'them',
      render: (_, record) => (
        <Checkbox
          checked={record.them}
          onChange={(e) => handleCheckboxChange(e, "them")}
        >
          Thêm
        </Checkbox>
      )
    },
    {
      dataIndex: 'sua',
      render: (_, record) => (
        
        <Checkbox
          checked={record.sua}
          onChange={(e) => handleCheckboxChange(e, "sua")}
        >
          Sửa
        </Checkbox>
      )
    },
    {
      dataIndex: 'xoa',
      render: (_, record) => (
        <Checkbox
          checked={record.xoa}
          onChange={(e) => handleCheckboxChange(e, "xoa")}
        >
          Xóa
        </Checkbox>
      )
    }
  ];

    return(
        <>
        {/* <InputSearch/> */}
            <Table
              title={renderHeader}
              columns={columns} 
 // dataSource={props.chucNangCuaNhom ? [props.chucNangCuaNhom] : []}   // nó đang truyền là object nên phải ép thành array
              dataSource={productList}
              rowKey='chucNangID'
              onChange={handleOnchangePage}
             
          pagination={false}

            //    pagination={{ 
            // current: current,
            // pageSize:pageSize, 
            // showSizeChanger: true, 
            // total:total,
            // showTotal: (total,Range) => {return(<div>{Range[0]} - {Range[1]} trên {total} rows</div>)}
            // }}
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
  
        </>
    )
}
export default ChucNangCuaNND;