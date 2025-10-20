import React, { Children, useState } from 'react';
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
import { Affix, Breadcrumb, Button, Dropdown, Layout, Menu, notification, Select, Slider, Space, theme } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { callLogOutAccount } from '../../services/api.service';
import { doLogOutAction } from '../../redux/account/accountSlice';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import './layoutAdmin2.scss'
import Sidebar from './SidebarAdmin/Sidebar';
import HeaderAdmin from './HeaderAdmin/HeaderAdmin';
import Footer from '../footer';
import FooterAdmin from './FooterAdmin/Footer';
const { Header, Sider, Content } = Layout;



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



const LayoutAdmin2 = () => {
 
  const isAdminRoute = window.location.pathname.startsWith('/admin');

  const user = useSelector(state => state.account.user.role);
   
  const navigate = useNavigate()
  const dispatch = useDispatch()

 
   

  return (
   <Layout style={{ minHeight: "100vh" }}>
      {/* Sidebar bên trái */}
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        trigger={null}
        width={250}
        theme="light"
      >
       <Affix offsetTop={0}>

        <Sidebar />
        </Affix>
      </Sider>
      

      {/* Phần bên phải (Header + Content) */}
      <Layout>
        {/* <Affix offsetTop={0}> */}
          <Header style={{ background: "#fff", padding: 0 ,zIndex:1}}>
            <HeaderAdmin />
          </Header>
        {/* </Affix> */}

        <Content style={{borderRadius:10 , margin: "24px 16px", padding: 24, background: "#fff"}}>
        {/* middle */}
          <Outlet/>
                    {/* <Outlet/> */}

        </Content>
        <FooterAdmin/>
      </Layout>
    </Layout>
  );
};
export default LayoutAdmin2;