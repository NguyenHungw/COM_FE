import Sider from "antd/es/layout/Sider";
import { useState } from "react";
import { Breadcrumb, Button, Dropdown, Layout, Menu, notification, Select, Space, theme } from 'antd';

import {
  ProductOutlined,
  UploadOutlined,
  UserOutlined
} from '@ant-design/icons';
import Header from "../../header";
import { callLogOutAccount } from "../../../services/api.service";
import { doLogOutAction } from "../../../redux/account/accountSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Content } from "antd/es/layout/layout";

const SidebarAdmin = (props) => {
  

    const [collapsed, setCollapsed] = useState(false);
    console.log('check prop side bar',props.user)

    return(
         <Layout style={{ minHeight: "100vh" }}>
      {/* Sidebar cố định */}
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        width={250}
        style={{
          position: "fixed",   // cố định
          left: 0,
          top: 0,
          bottom: 0,
          overflow: "auto",    // cuộn riêng trong sidebar
          height: "100vh",
          background:'white'
        }}
      
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="white"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            { key: "1", icon: <UserOutlined />, label: <Link to="">Dashboard</Link>},
            {
              key: "2",
              icon: <ProductOutlined />,
              label: "Quản lý Sản Phẩm",
              children: [
                { key: "2-1", label: <Link to="/admin/sanpham">Sản Phẩm</Link> },
                { key: "2-2", label:  <Link to="/admin/donvi">Đơn Vị</Link>   },
                { key: "2-3", label: <Link to="/admin/loaisanpham">Loại Sản Phẩm</Link> },
              ],
            },
            { 
              key: "3",
              icon: <UploadOutlined />, 
              label: "Người dùng & Quyền hạn",
               children: [
                { key: "3-1", label:  <Link to="/admin/user">Người Dùng</Link> },
                { key: "3-2", label: <Link to="/admin/nhomquyen">Nhóm Quyền</Link> },
                { key: "3-3", label: <Link to="/admin/nhomchucnang">Nhóm Chức Năng</Link> },
              ],
              },
            { 
              key: "4", 
              icon: <UploadOutlined />, 
              label: "Cài đặt" ,
               children: [
                { key: "4-1", label: <Link to="/admin/api">API Key</Link> },
                { key: "4-2", label: <Link to="/admin/cauhinhhethong">Cấu Hình Hệ Thống</Link> }
              ],
              },
              { 
              key: "5", 
              icon: <UploadOutlined />, 
              label: "SEO & Hiển Thị" ,
               children: [
                { key: "4-1", label: <Link to="/admin/seo">Seo</Link> },
                { key: "4-2", label: <Link to="/admin/banner">Cấu Hình Hệ Thống</Link> }
              ],
              },
              { 
              key: "5", 
              icon: <UploadOutlined />, 
              label: <Link to="/admin/message">Quản lý tin nhắn</Link> ,
              },

          ]}
        />
      </Sider>

    
    </Layout>
  );
};


export default SidebarAdmin