import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
} from "react-router-dom";
// import { Outlet } from "react-router-dom";
import './styles/global.scss'

import Header from './components/header';
import Footer from './components/footer';
import ErrorPage from './components/ErrorPage';
import Home from "./components/home";
// import Contact from "./pages/contact";
import Newfeed from "./pages/newsfeed";
import Introduce from "./pages/introduce";
import Contact from "./pages/contact";
import Product from "./pages/product";
import Login from "./pages/login";
import { useDispatch } from "react-redux";
import { callFetchAccount } from "./services/api.service";
import { dogetAccountAction } from "./redux/account/accountSlice";
import { useEffect } from "react";
// import Home from "./components/home";

const Layout = () =>{
  return (
    <div className='layout-app'>      
    <Header/>
    <Outlet/>
    <Footer/>
    </div>
  )
}

export default function App() {
  const dispatch = useDispatch();
  const getAccount = async()=>{
    if(window.location.pathname==='/login') return;
    const res = await callFetchAccount()
    console.log('check get account',res)
    if(res&& res?.data){
      // console.log('check get account',res.data)
      dispatch(dogetAccountAction(res.data))
    }
  }
  useEffect(()=>{
    getAccount();
  },[])
    const router = createBrowserRouter([
    {
      
      path: "/",
      element: <Layout/>,
      errorElement: <ErrorPage/>,
      children: [
       { index: true, element: <Home/> },

        {
          path: "contact",
          element: <Contact />,
        },
        {
          path: "introduce",
          element: <Introduce/>,
        },
         {
          path: "product",
          element: <Product />,
        },
        // {
        //   path: "book/:slug",
        //   element: <BookPage />,
        // },
        {
          path: "newfeed",
          element: <Newfeed />,
        }
      ],
  
    },
    // {
      
    //   path: "/admin",
    //   element: <ProtectedRoute><LayoutAdmin/></ProtectedRoute> ,
    //   errorElement: <ErrorPage/>,
    //   children: [
    //     { 
    //       index: true,element: 
    //       <ProtectedRoute>
    //       <AdminPage /> 
    //       </ProtectedRoute>,
          
    //     },

    //     {
    //       path: "user",
    //       element:  <ManageUserPage/> ,
    //       // <ProtectedRoute>
    //       // <ManageUserPage /> 
    //       // </ProtectedRoute>,
    //     },
    //     {
    //       path: "book",
    //       element: <ManageBookPage />,
    //     }
    //   ],
  
    // },
    {
      path: "/login",
      element: <Login/>,
      
  
    },
    // {
    //   path: "/register",
    //   element: <RegisterPage/>,
      
  
    // },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

