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
import ProtectedRoute from './components/protectedRoute';
import LayoutAdmin2 from './components/admin/layoutAdmin2';
// import AdminPage from './pages/admin/dashboard/index';



import { useEffect } from "react";
import DashboardAdmin from "./pages/admin/Dashboard/DashboardAdmin";
import SeoPage from "./pages/admin/SEO/SeoPage";
import SanPham from "./pages/admin/SanPhamAdmin/SanPhamTable";
import MyTextEditor from "./components/Quilleditor/MyTextEditor";
import DonViAdmin from "./pages/admin/DonViAdmin/DonViTable";
import LoaiSanPhamAdmin from "./pages/admin/LoaiSanPhamAdmin/LoaiSanTable";
import NhomNguoiDungHome from "./pages/admin/UserAdmin/ManageRoleGroup/NhomNguoiDungHome";
import ChucNangTable from "./pages/admin/UserAdmin/ManageRoleGroup/ChucNangRole/ChucNangTable";
import NhomChucNangTable from "./pages/admin/UserAdmin/ManageRoleGroup/ChucNang/NhomChucNangTable";
import UserTable from "./pages/admin/UserAdmin/ManageUser/UserTable";
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
    // console.log('check get account',res)
    if(res&& res?.data){
      // console.log('check get account',res.data)
      dispatch(dogetAccountAction(res.data))
      dispatch(dogetAccountAction({ user: res.data }));


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
    {
      
      path: "/admin",
      element:(
      <ProtectedRoute>        
      <LayoutAdmin2/>
      </ProtectedRoute> 
      ),
      
      errorElement: <ErrorPage/>,
      children: [
        { 
          // path: "/dashboard",
          index: true,
          element: 
          <ProtectedRoute>
          <DashboardAdmin/>
       
          </ProtectedRoute>,
          
        },
          { 
          path: "donvi",
          index: true,
          element: 
          <ProtectedRoute>
          <DonViAdmin/>
          </ProtectedRoute>,
           errorElement: <ErrorPage/>,
        },
        { 
          path: "manageuser",
          index: true,
          element: 
          <ProtectedRoute>
          <UserTable/>
          </ProtectedRoute>,
           errorElement: <ErrorPage/>,
        },
        { 
          path: "nhomquyen",
          index: true,
          element: 
          <ProtectedRoute>
          <NhomNguoiDungHome/>
          </ProtectedRoute>,
           errorElement: <ErrorPage/>,
        },
         { 
          path: "nhomchucnang",
          index: true,
          element: 
          <ProtectedRoute>
          <NhomChucNangTable/>
          </ProtectedRoute>,
           errorElement: <ErrorPage/>,
        },
          { 
          path: "loaisanpham",
          index: true,
          element: 
          <ProtectedRoute>
          <LoaiSanPhamAdmin/>
          </ProtectedRoute>,
           errorElement: <ErrorPage/>,
        },
         {
      
      path: "seo",
      index:true,
      element: (
          <ProtectedRoute>
            <SeoPage />
          </ProtectedRoute>
        ),
      errorElement: <ErrorPage/>,
     
    },
     {
      
      path: "SanPham",
      index:true,
      element: (
          <ProtectedRoute>
            <SanPham/>
          </ProtectedRoute>
        ),
      errorElement: <ErrorPage/>,
     
    },
     {
      
      path: "message",
      index:true,
      element: (
          <ProtectedRoute>
            <SanPham/>
          </ProtectedRoute>
        ),
      errorElement: <ErrorPage/>,
     
    },
      ],
      
    },
   
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

