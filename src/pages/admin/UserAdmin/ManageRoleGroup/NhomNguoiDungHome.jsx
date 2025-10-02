import { Col, Row } from "antd"
import ChucNangTable from "./ChucNangRole/ChucNangTable"
import NhomNguoiDungTable from "./NhomNguoiDung/NhomNguoiDungTable"
import ChucNangCuaNND from "./ChucNangCuaNND/ChucNangCuaNNDTable"
import { useState } from "react"

const NhomNguoiDungHome = ()=> {
      const [dataChucNang, setDataChucNang] = useState(null);
      const [chucNangCuaNhom, setChucNangCuaNhom] = useState(null)
      // callback cập nhật khi tick checkbox

      
const handleUpdatePermission = (newRecord) => {
  setChucNangCuaNhom(newRecord);
};


  // Hàm để ChucNangCuaNND gọi khi lưu xong
  const handleRefreshChucNang = () => {
    if (dataChucNang) {
      // reset để ChucNangTable tự useEffect fetch lại
      setDataChucNang({ ...dataChucNang });
    }
  };

    return (
        <>
      
         <Row gutter={50}>
      <Col span={12} style={{height:500 ,border: '1px solid blue' , borderRadius:8 } }>
      <ChucNangTable 
      dataChucNang={dataChucNang}
      chucNangCuaNhom = {chucNangCuaNhom}
      setChucNangCuaNhom= {setChucNangCuaNhom}

      


      /></Col>

      <Col span={12}>
      <div className="tablecss" style={{ height:500,border: '1px solid blue' , borderRadius:8 }}>

      <ChucNangCuaNND 
      dataChucNang={dataChucNang}
      chucNangCuaNhom={chucNangCuaNhom}
        onUpdatePermission={handleUpdatePermission}
        onRefresh={handleRefreshChucNang}  


       />
            </div>

      </Col>
    </Row>
        
        <NhomNguoiDungTable 
        dataChucNang={dataChucNang} //cais nay tu table chính
        setDataChucNang ={setDataChucNang} //table trái
        setChucNangCuaNhom ={setChucNangCuaNhom} //table quyền
         />
      
        </>
    ) 
}
export default NhomNguoiDungHome