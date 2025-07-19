import React, { useEffect, useState } from 'react';
import { Button, Input, notification, Popconfirm, Table } from 'antd';
import InputSearch from './InputSearch';
import { deleteUserById, getAllUserNoPage, getAllUserYesPage } from '../../../services/api.service';
import { CloudUploadOutlined, DeleteOutlined, EditOutlined, ExportOutlined, PlusOutlined, RedoOutlined, ReloadOutlined } from '@ant-design/icons';
import ViewDetailUser from './ViewDetailUser';
import UserModalCreate from './UserModalCreate';
import UserImport from './data/UserImport';
import * as XLSX from 'xlsx';
import UserModalUpdate from './UserModalUpdate';



const UserTable = () =>{
  const [dataDetailUser,setDataDetailUser] = useState(null)
  const [viewDetailUser,setViewDetailUser] = useState(false)
  const [listdata,setlistdata] = useState([]);
  const [current,setCurrent]=useState(1);
  const [pageSize,setPageSize]=useState(5);
  const [total,setTotal]=useState(0);
  const [isLoading,setisLoading] = useState(false)
  const [filter,setFilter] = useState("")
  const [sortQuery,setSortQuery] = useState("")
  //add Modal
  const [userModalCreate,setUserModalCreate] = useState(false)
  //import Modal
  const [userImportModal,setUserImportModal] = useState(false)
  //update
  const[dataUpdate,setDataUpdate] = useState()
  const[updateUserModal,setIsUpdateUserModal] = useState(false)

  const onChange = (pagination, filters, sorter, extra) => {
    // console.log('params', pagination, filters, sorter, extra);
     //setCurrent ,setPageSize
        //nếu thay đổi trang Current 
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
        if(sorter && sorter.field){
          const q = sorter.order === 'ascend' ? `sort=${sorter.field}` : `sort=-${sorter.field}`;
          setSortQuery(q);
        }
  };
  const fetchUser = async()=>{
    setisLoading(true)
    let query = `current=${current}&pageSize=${pageSize}`
    //filter
    if(filter){
      query += `&${filter}`
    }
    //sort
    if(sortQuery){
      query += `&${sortQuery}`
    }
    const res = await getAllUserYesPage(query)
    if(res&&res.data){
      setlistdata(res.data.result)
      setTotal(res.data.meta?.total||0)
    }else{
      console.log(res.data)
      //setlistdata(['test'])
    }
    setisLoading(false)
  }
  const handleSearch = (query) => {
    setFilter(query)
}

const HandleDelete = async(id) =>{
  const res = await deleteUserById(id)
  if(res&&res.data){
    notification.success({
      message:"DELETE",
      description:"Xoa Thanh Cong"
    },
    fetchUser()
  )

  }
}
useEffect(()=>{
  fetchUser()

},[current,pageSize,filter,sortQuery]) // neu 1 trong 4 biến này thay đổi thì hàm fetchUser sẽ được gọi
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
    title: '_id',
    //key: '_id',
    render: (_, record, index) => {
        return (
            <div><a href='#' 
            onClick={
              ()=>{
              setViewDetailUser(true)
              setDataDetailUser(record)
              }
            }
            
            >{record._id}</a></div>
        )
    }
},

    {
      title: 'FullName',
      dataIndex: 'fullName',
      sorter:true
    },
    {
      title: 'email',
      dataIndex: 'email',
      sorter: true
    },
    {
      title: 'phone',
      dataIndex: 'phone',
      sorter: true
    },
    {
      title: 'role',
      dataIndex: 'role',
      sorter: true
    },
    {
      title: 'createdAt',
      dataIndex: 'createdAt',
      sorter: true
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <>
          <div style={{ display: "flex", gap: "20px" }}>
            <EditOutlined
              onClick={() => {
                console.log("check record",record)
               setDataUpdate(record)
                setIsUpdateUserModal(true)
              }}
              style={{ cursor: "pointer", color: "orange" }}
            />
            <Popconfirm
              placement="left"
              title="Delete the task"
              description="Are you sure to delete this task?"
              onConfirm={() => { HandleDelete(record._id) }}
              //onCancel={cancel}
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
  const handleExport = ()=>{
    
    if(listdata && listdata.length>0){
      const worksheet = XLSX.utils.json_to_sheet(listdata);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
      XLSX.writeFile(workbook, "MYSavedData.xlsx");
    }
    
    
  }

  const renderHeader=() => {
    return(
      <div style={{ display: 'flex', justifyContent: 'space-between',border:'1px solid red' }}>
      <span style={{border:'12px solid green'}}>Table List Users</span>
      <span style={{ display: 'flex', gap: 15 ,border:'13px solid black'}}>
          <Button
              icon={<ExportOutlined />}
              type="primary"
              onClick={handleExport}
          >Export</Button>

          <Button
              icon={<CloudUploadOutlined />}
              type="primary"
              onClick={() => setUserImportModal(true)}
          >Import</Button>

          <Button
              icon={<PlusOutlined />}
              type="primary"
              onClick={()=>setUserModalCreate(true) }
          >Thêm mới</Button>
          <Button type='ghost' onClick={() => fetchUser()}>
              <ReloadOutlined />
          </Button>


      </span>
  </div>
    )

  }
 
  return (

    <>
          <InputSearch 
          handleSearch={handleSearch}
          setFilter={setFilter}
          fetchUser={fetchUser}


          />
          <Table 
          loading={isLoading}
          title={renderHeader}
          columns={columns} 
          dataSource={listdata}
          onChange={onChange}
          rowKey="_id"
          
          pagination={{ 
            current: current,
            pageSize:pageSize, 
            showSizeChanger: true, 
            total:total,
            showTotal: (total,Range) => {return(<div>{Range[0]} - {Range[1]} trên {total} rows</div>)}
            
            }}
           />
           <ViewDetailUser
            viewDetailUser = {viewDetailUser}
            setViewDetailUser ={setViewDetailUser}
            dataDetailUser = {dataDetailUser}
            setDataDetailUser = {setDataDetailUser}
           />
           <UserModalCreate
            userModalCreate= {userModalCreate}
            setUserModalCreate={setUserModalCreate}
            fetchUser={fetchUser}
           />
           <UserImport
                       fetchUser={fetchUser}

            userImportModal = {userImportModal}
            setUserImportModal = {setUserImportModal}
           />
           <UserModalUpdate
            setDataUpdate = {setDataUpdate}
            dataUpdate = {dataUpdate}
            updateUserModal = {updateUserModal}
            setIsUpdateUserModal = {setIsUpdateUserModal}
            fetchUser = {fetchUser}
           />
    </>

  )
}
export default UserTable;