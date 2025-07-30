import { Button, Card, Col, Grid, Pagination, Rate, Row, Tabs } from 'antd';
import "./productCart.scss";
import { getProductsAPI } from "../../services/api.service";

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
const ProductCart = () => {
  const [listProduct ,setListProduct] = useState(null)
  const [total,setTotal] = useState(null)
  const [pageSize, setPageSize] = useState(4)
  const [current,setCurrent] = useState(1)
  const [sortQuery, setSortQuery] = useState("sort=-sold");
 
 

    
const fetchProduct = async () => {
  let query=`page=${current}&s=${pageSize}`;
  const res = await getProductsAPI(query);
  if(res&&res?.data){
    setListProduct(res.data);
    console.log('totalrow',res.totalRow)
    setTotal(res.totalRow)
    }
    
  

}
  useEffect(()=>{
    fetchProduct()
    
  },[])
console.log('chếch lít',listProduct)


  const handleOnchangePage = (pagination, filters, sorter, extra) =>{
    if (pagination && pagination.current) {
      if (+pagination.current !== +current) { //current la gia tri page hien tai react dang luu
        setCurrent(+pagination.current) //"5" =>5
      }
    }
    if (pagination && pagination.pageSize) {
      if (+pagination.pageSize !== +pageSize) { //current la gia tri page hien tai react dang luu
        setPageSize(+pagination.pageSize) //"5" =>5
      }
    }
    // if(sorter && sorter.field){
    //   const q = sorter.order === 'ascend' ? `sort=${sorter.field}` : `sort=-${sorter.field}`;
    //   setSortQuery(q);
    // }
  }


  useEffect(()=>{
    console.log('check list product',listProduct)
   fetchProduct();
  },[current])
  console.log('Backend URL:', import.meta.env.VITE_BACKEND_URL); // In ra giá trị của VITE_BACKEND_URL
  return (
    <>
      <div className='customize-row'>
        <div className='header-row-main'>
          <div className='header-row-left'>
          KHUYẾN MÃI SỐC
        </div>
         <div className='header-row-right'>
          <Button className='button-left'>Sản phẩm mới</Button>
          <Button className='button-middle'>Flash Sale
          <div className='time1'>00</div>
          <div className='time1'>00</div>
          <div className='time1'>00</div>

          </Button>
          

        </div>
       
        </div>
        <div className='product-list'>
         {listProduct?.map((item,index)=>{
          
         {/* {item?.value?.map((listProduct,index)=>{ */}
          // console.log('check item filePath',item?.value[index])
          return(
              <div className='product-card' key={`com-${index}`}>
         <div className="column" >
            <div className="wrapper">
              <div className="thumbnail">
              <img src={`${import.meta.env.VITE_BACKEND_URL}${item.filePath}`} alt="thumbnail book" />
           
              </div>
              <div className='text' >{item.tenSanPham} </div>
              <div className='price'>
                  {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item?.giaSauGiam*1000 ?? 0)}
              </div>
               <div className='oldPrice'>
                  {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item?.giaBan*1000 ?? 0)}
                  
              </div>
              <div className='rating'>
                  <Rate value={5} disabled style={{ color: '#ffce3d', fontSize: 10 }} />
                  <span>Đã bán</span>
              </div>
              
            </div>
            {/* <div className='pageination-space'> zxczxc</div> */}
          </div>
          
        </div>
          )
          
        
        })} 
                
 
        
        </div>
        
  {/* <div className="pagination-wrapper" > */}
    <Pagination
    style={{marginTop:20,display:'flex',justifyContent:'center'}}
      current={current}
      // total={hasMore ? (current + 1) * pageSize : current * pageSize}  //total = vitri hien tai 1+1 * 10 = 20 , pagesize = 10 => 20 = 2 trang
      total={total}

      pageSize={pageSize} //page size = 10
      responsive
      onChange={(p,s)=> handleOnchangePage({ current:p, pageSize:s})}
    />
  {/* </div> */}
        
   </div>
 
  
  
    </>
    )
}
export default ProductCart;