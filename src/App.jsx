import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
} from "react-router-dom";
// import { Outlet } from "react-router-dom";

import Header from './components/header';
import Footer from './components/footer';
import ErrorPage from './components/ErrorPage';
import Home from "./components/home";
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
    const router = createBrowserRouter([
    {
      
      path: "/",
      element: <Layout/>,
      errorElement: <ErrorPage/>,
      children: [
       { index: true, element: <Home/> },

        // {
        //   path: "contact",
        //   element: <Contact />,
        // },
        // {
        //   path: "book/:slug",
        //   element: <BookPage />,
        // },
        // {
        //   path: "test",
        //   element: <PreviousValueTracker />,
        // }
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
    // {
    //   path: "/login",
    //   element: <LoginPage/>,
      
  
    // },
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

