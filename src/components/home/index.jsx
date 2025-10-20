import { Button, Checkbox, Col, Divider, Drawer, InputNumber, Pagination, Rate, Row, Tabs } from "antd";
import { Form } from 'antd';
import { useEffect, useState } from "react";

 import './home.scss';
import { useNavigate } from "react-router-dom";
import HeroBanner from "../heroBanner";
import ProductCart from "../productCart";
import ProductList from "../productList";
import Guarantee from "../guarantee";
import ChatBubble from "../ChatBubble/ChatBubble";
import { useSelector } from "react-redux";

const Home = () => {
       const rawRole = useSelector(state => state.account);
       console.log('check raw',rawRole)
  
  return (

    
    <div className="home-layout">
  {rawRole?.user?.role === "User" && <ChatBubble />}

        

     <HeroBanner />
       <Guarantee/>
    {/* <ProductCart /> */}
  
    <ProductList />
    </div>
   
    
  )
}

export default Home;