import { Card, Col, Rate, Row, Tabs } from 'antd';
import "./productCart.scss";
import { getProductsAPI } from "../../services/api.service";

import { useEffect, useState } from 'react';
const ProductCart = () => {
  const [listProduct ,setListProduct] = useState(null)



// const chunkData = (data, chunkSize) =>{
//   const result = []
//   for(let i = 0; i <data.length;i+= chunkSize){
//     result.push(data.slice(i,i+chunkSize));
    
//   }
//   return result;
// }

// useEffect(()=>{
//     const initProduct = async()=>{
//       const res = await getProductsAPI(1);
//       if(res && res?.data){
//         const chunkedData = chunkData(res.data,5) //Chia dữ liệu thành các nhóm 5 phần tử
//         const d = chunkedData.map((item => {
//           return{label:item,value:item}
//         }))
//         console.log('check ressult',d)
//         setListProduct(d)
//         // setListProduct(d)
//       }

//     };
//     initProduct();
//   },[])

  useEffect(()=>{
    const initProduct = async()=>{
      const res = await getProductsAPI(1);
      if(res && res?.data){
        const d = res.data.map(item =>{
          return{label:item,value:item}
        })
        setListProduct(d)
      }

    }
    initProduct();
  },[])
  
  
  useEffect(()=>{
    console.log('check list product',listProduct)
    
  },[listProduct])
  console.log('Backend URL:', import.meta.env.VITE_BACKEND_URL); // In ra giá trị của VITE_BACKEND_URL
  return (
    <>
      <div className='customize-row'>
        <div className='header-row-main'>
          <div className='header-row-left'>
          KHUYẾN MÃI SỐC
        </div>
         <div className='header-row-right'>
          KHUYẾN MÃI SỐC
        </div>
       
        </div>
        <div className='product-list'>
         {listProduct?.map((item,index)=>{
          
         {/* {item?.value?.map((listProduct,index)=>{ */}
          console.log('check item filePath',item?.value[index])
          return(
              <div className='product-card'>
         <div className="column" >
            <div className="wrapper">
              <div className="thumbnail">
              <img src={`${import.meta.env.VITE_BACKEND_URL}${item.value.filePath}`} alt="thumbnail book" />
           
              </div>
              <div className='text' >{item.value.tenSanPham} </div>
              <div className='price'>
                  {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item?.value.giaSauGiam*1000 ?? 0)}
              </div>
               <div className='oldPrice'>
                  {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item?.value.giaBan*1000 ?? 0)}
                  
              </div>
              <div className='rating'>
                  <Rate value={5} disabled style={{ color: '#ffce3d', fontSize: 10 }} />
                  <span>Đã bán</span>
              </div>
              
            </div>
          </div>
        </div>
          )
        
        })} 
        </div>
   </div>
    </>
    )
}
export default ProductCart;