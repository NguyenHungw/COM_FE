import './header.scss';
import React, { useEffect, useState } from 'react';
import { AppstoreOutlined, BoldOutlined, MailOutlined, MenuOutlined, SearchOutlined, SettingOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import { Menu, Dropdown, Button, Input } from 'antd';
import { Link } from 'react-router-dom';
import CartDrawer from './cartDrawer';

// Tạo Menu từ items


const Header = () => {
  const [current, setCurrent] = useState('');
  const [isSmall, setIsSmall] = useState(false);
  const [openCart,setOpenCart] = useState(false)
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
        <Button className='user-item-child' style={{color:'black'}} ><UserOutlined style={{color:'black', alignItems:'center',justifyContent:'center' }} /> <Link to="/login"> Đăng Nhập  </Link></Button>
      </div>
    </nav>
 </div>
 
    </div>
     <CartDrawer
     openCart={openCart}
     setOpenCart={setOpenCart}
     />

    </header>
    
  );
}

export default Header;
