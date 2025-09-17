import { useDispatch } from "react-redux";
import { callLogOutAccount } from "../../../services/api.service";
import { Breadcrumb, Button, Dropdown, Layout, notification, Select, Space, theme } from "antd";
import { doLogOutAction } from "../../../redux/account/accountSlice";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AppstoreOutlined,
    DollarCircleOutlined,
    DownOutlined,
  ExceptionOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ProductOutlined,
  TeamOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Content, Header } from "antd/es/layout/layout";
import BreadcrumbAntd from "../../../pages/BreadcrumbAntd/BreadcrumbAntd";
import './headeradmin.scss'
 





const HeaderAdmin = (props) =>{
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleLogout = async() =>{
      console.log("Logging out...");
      const res = await callLogOutAccount()
      if(res && res.data){
      
        notification.success({
          message:"Đăng Xuất",
          description:"Đăng xuất thành công"
        })
        dispatch(doLogOutAction())
        navigate('/')
      }else{
        notification.error({
          message: "Error logout",
          description: JSON.stringify(res.error || "Lỗi không xác định")
      });
      }
  }
      const itemsDropDown = [
      {
          label: <Link to='/'><label>Trang Chủ</label></Link>,
          key: 'account',
      },
      {
          label: <label>Quản lý tài khoản</label>,
          key: 'account',
      },
      {
          label: <label onClick={()=> handleLogout()}>Đăng xuất</label>,

          key: 'logout',
      },
    
    ];
    return(
          <Layout 
          // style={{ minHeight: "100vh" }}
          >
         <Header
        style={{
          position: "fixed",   // cố định
          width:"100%",
          background:'white'
        }}
         >
         <div className="contain-headeradmin">
         <div className="left-header">
         <BreadcrumbAntd/>
         </div>
         <div className="right-header">
             <Dropdown menu={{ items: itemsDropDown }} trigger={['click']}>
                        <a onClick={(e) => e.preventDefault()}>
                            <Space>
                                Welcome {props.user?.role}
                                <DownOutlined />
                            </Space>
                        </a>
                    </Dropdown>
         </div>
         </div>
        
         
         </Header>
       
          </Layout>   
    )
}

export default HeaderAdmin