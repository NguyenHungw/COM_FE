import { Button, Checkbox, Col, Divider, Drawer, InputNumber, Pagination, Rate, Row, Tabs } from "antd";
import { Form } from 'antd';
import { useEffect, useState } from "react";
import { getAllBooksYesPage, getBookCategory } from "../../services/api.service";
 import './home.scss';
import { useNavigate } from "react-router-dom";
import HeroBanner from "../heroBanner";
import ProductCart from "../productCart";
import ProductList from "../productList";
import Guarantee from "../guarantee";

const Home = () => {
  return (
    <>
     <HeroBanner />
       <Guarantee/>
    <ProductCart />
  
    <ProductList />
    </>
   
    
  )
}

export default Home;