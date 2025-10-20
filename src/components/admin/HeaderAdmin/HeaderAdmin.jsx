import { useDispatch } from "react-redux";
import { callLogOutAccount } from "../../../services/api.service";
import { Avatar, Badge, Breadcrumb, Button, Dropdown, Layout, notification, Select, Space, theme } from "antd";
import { doLogOutAction } from "../../../redux/account/accountSlice";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as signalR from "@microsoft/signalr";

import {
  AppstoreOutlined,
    BellOutlined,
    DollarCircleOutlined,
    DownOutlined,
  ExceptionOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ProductOutlined,
  SettingOutlined,
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
  const [viewNotification,setViewNotification] = useState(false);
    const [count, setCount] = useState(0);
      const [connection, setConnection] = useState(null);

      useEffect(()=>{
  const conn = new signalR.HubConnectionBuilder()
      .withUrl("https://localhost:2222/chatHub") // ddiaj chi hub
      .withAutomaticReconnect()
      .build();

    setConnection(conn);
     conn.start()
      .then(() => {
        console.log(" Kết nối SignalR thành công");
        // Nếu cần, join group admin
        conn.invoke("JoinAsAdmin");
      })
      .catch(err => console.error("❌ Kết nối lỗi:", err));

    // Nhận tin nhắn mới
    conn.on("NewMessageAlert", (fromUser, message) => {
      console.log("niu mét:", message);

      // tawng badge lên 1 mỗi khi có tin nhắn mới
      setCount(prev => prev + 1);
    });
      return () => {
      conn.stop();
    };
      },[])

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const dispatch = useDispatch()
  const navigate = useNavigate()



// connection.start().catch(err => console.error(err));
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
    const handleNotification = () => {
      setViewNotification(true)
    }
    return(
          <Layout 
          // style={{ minHeight: "100vh" }}
          >
         <Header
        style={{
          borderRadius:10,
          margin:"0px 16px",
          //boxShadow: 'inset 0 0 0 2px white',
          border:'1px solid black',
          background:'white',
          position: "fixed",   // cố định
          width:"100%",
         // background:'linear-gradient(212deg,rgba(2, 0, 36, 1) 0%, rgba(9, 9, 121, 1) 35%, rgba(0, 212, 255, 1) 100%)'
        }}
         >
         <div className="contain-headeradmin">
         <div className="left-header">
         <BreadcrumbAntd/>
         </div>
         <div className="right-header">
               <Space size="middle">
          
                <Badge count={count}>
                        {/* <a onClick={handleNotification}> */}
                          <Dropdown menu={{ items: itemsDropDown }} trigger={['click']}>
                         <a onClick={(e) => e.preventDefault()}>
                        <BellOutlined style={{fontSize:20}}/>
                        </a>
                        </Dropdown>
                        {/* </a> */}
                        
                      </Badge>
                      <Dropdown menu={{ items: itemsDropDown }} trigger={['click']}>
                        <a onClick={(e) => e.preventDefault()}>
                            <Space>
                                {/* Welcome {props.user?.role} */}
                                <SettingOutlined style={{fontSize:20}}/>
                            </Space>
                        </a>
                    </Dropdown>
                     
                    </Space>
                   

                 
         </div>
         </div>
        
         
         </Header>
       
          </Layout>   
    )
}

export default HeaderAdmin