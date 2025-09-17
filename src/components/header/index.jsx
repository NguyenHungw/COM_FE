import './header.scss';
import { useDispatch, useSelector } from 'react-redux';

import React, { useEffect, useState } from 'react';
import { AppstoreOutlined, BoldOutlined, DownOutlined, MailOutlined, MenuOutlined, SearchOutlined, SettingOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import { Menu, Dropdown, Button, Input, Empty, Space, notification } from 'antd';
import { Link, redirect, useNavigate } from 'react-router-dom';
import CartDrawer from './cartDrawer';
import LoginModal from './loginModal';
import { doLogOutAction } from '../../redux/account/accountSlice';
import { callLogOutAccount } from '../../services/api.service';


 
// Tạo Menu từ items
const Header = () => {
  const dispatch = useDispatch();
   const handleLogout = async() =>{
      console.log("Logging out...");
      const res = await callLogOutAccount()
      if(res && res.data){
        
        notification.success({
          message:"Đăng Xuất",
          description:"Đăng xuất thành công"
        })
        dispatch(doLogOutAction())
      }else{
        notification.error({
          message: "Error logout",
          description: JSON.stringify(res.error || "Lỗi không xác định")
      });
      }
  }
  const items = [
  {
    key: '1',
    label: 'My Account',
    disabled: true,
  },
  {
    type: 'divider',
  },
  {
    key: '2',
    label: <Link to="/admin">Dashboard</Link>,
    extra: '⌘P',
  },
    {
    key: '3',
    label: 'Profile',
    extra: '⌘P',
  },
  {
    key: '4',
    label: 'Billing',
    extra: '⌘B',
  },
  {
    key: '5',
    label: 'Settings',
    icon: <SettingOutlined />,
    extra: '⌘S',
  },
  {
    key: '6',
    label: <a onClick={handleLogout}>Đăng Xuất</a>,
    icon: <SettingOutlined />,
    extra: '⌘S',
  },
];
  
  const [current, setCurrent] = useState('');
  const [isSmall, setIsSmall] = useState(false);
  const [openCart,setOpenCart] = useState(false)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
 const rawRole = useSelector(state => state.account?.user?.role);



  useEffect(()=>{
    const handleScoll = () =>{
      if(window.scrollY > 100) {
        setIsSmall(true)

      }else{
        setIsSmall(false)
      }
    };
    window.addEventListener('scroll',handleScoll);
    return () => window.removeEventListener('scroll',handleScoll)

  },[])
 console.log('chếch re đúc',rawRole)

  
  const onClick = e => {
    console.log('click ', e);
    setCurrent(e.key);
  };

  return (
     <header className={isSmall ? 'header small' : 'header'}>
    <div className="header-container">
     <div className='header-content'>
      <nav className="navbar">
        <div className='logo-item'>
          Logo
        </div>
      <ul className="menu">
        <li><Link to="/" className="menu-item">Trang Chủ</Link></li>
        <li><Link to="/introduce" className="menu-item">Giới Thiệu</Link></li>
        <li><Link to="/product" className="menu-item">Sản Phẩm</Link></li>
        <li><Link to="/contact" className="menu-item">Tin Tức</Link></li>
        <li><Link to="/newfeed" className="menu-item">Liên Hệ</Link></li>
      </ul>
      <div className='user-item'>
        <div className='user-item-child'></div>
        {/* <div className='user-item-child'><ShoppingCartOutlined style={{width:50}} /></div>
         */}
         <Button className='user-item-child' onClick={ () => setOpenCart(true)} ><ShoppingCartOutlined style={{ color: 'black', fontSize: '24px' }}/></Button>
           {/* <CartDrawer onClose={() => setOpenCart(false)} /> */}
        {/* <Button className='user-item-child' style={{color:'black'}}><UserOutlined style={{color:'black', alignItems:'center',justifyContent:'center' }}/><Link to="/login">x</Link></Button> */}
        {/* <Button className='user-item-child' onClick={ () => setIsLoginModalOpen(true)}><UserOutlined style={{color:'black', alignItems:'center',justifyContent:'center' }}/></Button> */}
  {rawRole
  ? 
  <Dropdown menu={{ items }  }>
  <Button className='user-item-child'>
      <span style={{ color: 'black' }}>{rawRole}</span>
    {/* <a onClick={e => e.preventDefault()}> */}
        <DownOutlined style={{color:'black'}} />
    {/* </a> */}
     </Button>
  </Dropdown>
  : <Button className='user-item-child' onClick={() => setIsLoginModalOpen(true)}>
      <UserOutlined style={{ color: 'black'}} />
    </Button>
}

      </div>
    </nav>
 </div>
 
    </div>
     <CartDrawer
     openCart={openCart}
     setOpenCart={setOpenCart}
     />
     <LoginModal
     isLoginModalOpen={isLoginModalOpen}
     setIsLoginModalOpen={setIsLoginModalOpen}
     />
    </header>
  );
}

export default Header;
