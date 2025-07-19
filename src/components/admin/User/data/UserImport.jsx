import React, { useState } from 'react';
import { InboxOutlined } from '@ant-design/icons';
import { message, Modal, notification, Table, Upload } from 'antd';
import * as XLSX from 'xlsx';
import { addListUserBulk } from '../../../../services/api.service';
import templateFile from './template.xlsx?url'

const { Dragger } = Upload;

const UserImport = (props) => {
  const [DataExcel,setDataExcel] = useState([])
  const {userImportModal,setUserImportModal,fetchUser} = props
  const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
        onSuccess("ok");
    }, 1000);
};

  
  const propsUpload = {
    name: 'file',
    multiple: false,
    maxCount:1,
   // action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
    //accept: '.csv,.xlsx,.xls,application/application/vnd.ms-excel',
    accept: ".csv,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    customRequest:dummyRequest,
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log("check ca 2>>>",info.file,info.fileList)
        console.log("check info file>>",info.file);
        console.log("check info file list>>",info.fileList)
      }
      if (status === 'done') {
         message.success(`${info.file.name} file uploaded successfully.`);
         if(info.file && info.fileList.length > 0 ){
                  const file = info.fileList[0].originFileObj;
        let reader = new FileReader();
    
        reader.onload = function(e) {
            let data = new Uint8Array(e.target.result);
            let workbook = XLSX.read(data, {type: 'array'});
            // find the name of your sheet in the workbook first
            let worksheet = workbook.Sheets['Sheet1'];
    
            // convert to json format
            const jsonData = XLSX.utils.sheet_to_json(worksheet,
              {
                header: ["fullName", "email", "phone"],
                range:1
              }).map((item,index)=>({...item,key:index+1}));
            
            // console.log("check json data>>",jsonData)
            if(jsonData && jsonData.length >0) setDataExcel(jsonData)
        };
        reader.readAsArrayBuffer(file);
        console.log("check file after upload>>>",file)
        }

    
  
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
  };
    console.log("check props>>",props)

    // const HandleFinish = () =>{
    //     setUserImportModal(false)
    // }
    const HandleCancel = () =>{
      // ()=> props.setUserImportModal(false)
      
      setUserImportModal(false)
      setDataExcel([])
    }
    const HandleOk = async()=>{
      setUserImportModal(false)
      const data = DataExcel.map((item) => {
        item.password = '123456'
        return item
      })

      const res = await addListUserBulk(data)
      if(res && res.data){
        notification.success({
          message:'Upload ',
          description:'thành công '+res.data.countSuccess+' thất bại '+res.data.countError
        },
        setDataExcel([]),
        fetchUser()
      
      )
        
      }

    }

    return(
        <>
             
    <Modal title="Basic Modal" 
    open={props.userImportModal} 
    okText="Import Data"
     onOk={HandleOk} 
     onCancel={HandleCancel}
     okButtonProps={
      {
        disabled:DataExcel.length < 1
      }
     }
    >

  <Dragger {...propsUpload}
  showUploadList={DataExcel.length>0}
  
  >
  
    <p className="ant-upload-drag-icon">
      <InboxOutlined />
    </p>
    <p className="ant-upload-text">Click or drag file to this area to upload</p>
    
    <p className="ant-upload-hint">
      Support for a single or bulk upload. Strictly prohibited from uploading company data or other
      banned files.

      <a 
      onClick={e=>e.stopPropagation()}
      href={templateFile}
      download id="download" > Download Template File</a>
    </p>

  </Dragger>
  <div style={{ paddingTop: 20 }}>
  <Table
  dataSource={DataExcel}
                        title={() => <span>Dữ liệu upload:</span>}
                        columns={[
                            { dataIndex: 'key',title:'STT' },
                            { dataIndex: 'fullName', title: 'Tên hiển thị' },
                            { dataIndex: 'email', title: 'Email' },
                            { dataIndex: 'phone', title: 'Số điện thoại' },
                        ]}
                    />
                    </div>
  </Modal>
 
        </>
    )
}
export default UserImport;