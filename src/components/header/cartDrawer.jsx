import React, { useEffect, useState } from 'react';
import { Button, Drawer } from 'antd';
import './cart.scss'
import { useSelector } from 'react-redux';
import { cartAPI } from '../../services/api.service';
const CartDrawer = ({ openCart, setOpenCart }) => {
  const [listProduct,setListProduct] = useState(null)
   const user = useSelector(state => state.account.user?.id);
  
   console.log('check user',user)
    // const role = user.role;

   
   
   
     const fetchCartAPI = async (user) =>{
      const res = await cartAPI(user);
      console.log('res',res)
      if(res&&res?.data){
        setListProduct(res?.data)
      }
    }

    useEffect(() => {
  if (user) {
    //  if (!userId) return;
    fetchCartAPI(user);
  }
}, []);


    console.log('listProduct',listProduct)

   
  return (
    <>
   
      <Button type="primary" onClick={openCart}>
        Open
      </Button>
      <Drawer
        title="Giỏ Hàng"
        width={400}
        closable={{ 'aria-label': 'Close Button' }}
        onClose={()=>{setOpenCart(false)}}
        open={openCart}
      >
        {listProduct?.map((item,index)=>{
          return(
            <div className='container-cart'>
          <div className='cart-item' key={index} >
            <div className='cart-img'>
              <img src={`${import.meta.env.VITE_BACKEND_URL}/${item.hinhAnh}`}  />
              zxczx
            </div>
            <div className='cart-rightitem'>
              <div className='item-name'>{item.tenSanPham}</div>
              <div className='item-amount'>{item.gioSoLuong} - {item.tongTien}</div>
            </div>
          </div>
        </div>
          )
        })}
      </Drawer>
    </>
  );
};
export default CartDrawer;