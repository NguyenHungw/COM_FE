import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Header from "../header";
import Footer from "../footer";
import { Content } from "antd/es/layout/layout";
import { useState } from "react";
import { Button, Dropdown, Layout, Menu, message, notification, Space, theme } from "antd";
import Sider from "antd/es/layout/Sider";
import { AppstoreOutlined, DollarCircleOutlined, DownOutlined, ExceptionOutlined, MenuFoldOutlined, MenuUnfoldOutlined, TeamOutlined, UserOutlined, VideoCameraOutlined } from "@ant-design/icons";
import './layoutAdmin.scss'
import { callFetchAccount, callLogOutAccount } from "../../services/api.service";
import { doLoginAction, doLogOutAction } from "../../redux/account/accountSlice";


  const items = [
      {
          label: <Link to='/admin'>Dashboard</Link>,
          key: 'dashboard',
          icon: <AppstoreOutlined />
      },
      {
          label: <span>Manage Users</span>,
          // key: 'user',
          icon: <UserOutlined />,
          children: [
              {
                  label: <Link to='/admin/user'>CRUD</Link>,
                  key: 'crud',
                  icon: <TeamOutlined />,
              },
              {
                  label: 'Files1',
                  key: 'file1',
                  icon: <TeamOutlined />,
              }
          ]
      },
      {
          label: <Link to='/admin/book'>Manage Books</Link>,
          key: 'book',
          icon: <ExceptionOutlined />
      },
      {
          label: <Link to='/admin/order'>Manage Orders</Link>,
          key: 'order',
          icon: <DollarCircleOutlined />
      },
  
  ];
const LayoutAdmin = () => {


    const [activeMenu, setActiveMenu] = useState('dashboard');

    const isAdminRoute = window.location.pathname.startsWith('/admin');
    const user = useSelector(state => state.account.user);

    const [collapsed, setCollapsed] = useState(false);
    const {
      token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
  const navigate = useNavigate()
  const dispatch = useDispatch()

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
          label: <label>Quản lý tài khoản</label>,
          key: 'account',
      },
      {
          label: <label onClick={()=> handleLogout()}>Đăng xuất</label>,

          key: 'logout',
      },
    
    ];
    return (
  
    <Layout  style={{ minHeight: '100vh' }}
            className="layout-admin">
    <Sider 
    theme='light'
    trigger={null} collapsible collapsed={collapsed}
    >
      <div className="demo-logo-vertical" />
      <Menu
        theme="light"
        mode="inline"
        defaultSelectedKeys={['1']}
        
        items={items}
        onClick={(e) => setActiveMenu(e.key)}


      />
    </Sider>
   
    <Layout>
   
      <div className="header-container">
        <div className="header-rightside">
        <Dropdown menu={{ items: itemsDropDown }} trigger={['click']}>
                        <a onClick={(e) => e.preventDefault()}>
                            <Space>
                                Welcome {user?.fullName}
                                <DownOutlined />
                            </Space>
                        </a>
                    </Dropdown>

        </div>
        
      </div>
     
      dashboard
      <Outlet/>
    </Layout>
  <Footer/>
  </Layout>
 
    )
  }
  export default LayoutAdmin;