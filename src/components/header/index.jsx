import './header.scss';
import React, { useState } from 'react';
import { AppstoreOutlined, BoldOutlined, MailOutlined, MenuOutlined, SearchOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu, Dropdown, Button, Input } from 'antd';

// Tạo Menu từ items
const menu = (
  <Menu>
    {/* <Menu.SubMenu key="sub1" icon={<SettingOutlined />} title="Navigation Three - Submenu"> */}
      <Menu.ItemGroup title="Item 1">
        <Menu.Item key="setting:1">Option 1</Menu.Item>
        <Menu.Item key="setting:2">Option 2</Menu.Item>
        <Menu.Item key="setting:3">Option 3</Menu.Item>
        <Menu.Item key="setting:4">Option 4</Menu.Item>
        <Menu.Item key="setting:5">Option 5</Menu.Item>
        <Menu.Item key="setting:6">Option 6</Menu.Item>
        <Menu.Item key="setting:7">Option 7</Menu.Item>
        <Menu.Item key="setting:8">Option 8</Menu.Item>

      </Menu.ItemGroup>
    {/* </Menu.SubMenu> */}
  </Menu>
);

const Header = () => {
  const [current, setCurrent] = useState('');
  
  const onClick = e => {
    console.log('click ', e);
    setCurrent(e.key);
  };

  return (
    <div className="header-container">
      <div className='header-content'>
       <div className='header-content-left'>
         <div className="header-logo">
          Test Logo
        </div>
        <div className="header-menu">
            <Dropdown overlay={menu} trigger={['click']}>
        <Button className="header-button" type="primary">
          <MenuOutlined style={{ marginRight: 8 }} />
          DANH MỤC SẢN PHẨM
        </Button> 
      </Dropdown>
          </div>
        </div>
        <div className="header-content-middle">
<div className="header-search">
   
            <Input style={{width:650,height:40,fontSize:15,color:'black',fontStyle:'italic',fontWeight:'bold' }} placeholder=' Nhập Tên Sản Phẩm Cần Tìm'  prefix={<SearchOutlined/>}></Input>
            </div>
        </div>
        <div className="header-content-right">
            <div className="header-user">
              <Button type="primary" className="header-button">
                <MailOutlined style={{ marginRight: 8 }} />
                Đăng Nhập
                  </Button>
              </div>
          
              </div>
        </div>
              
    
    </div>
  );
}

export default Header;
