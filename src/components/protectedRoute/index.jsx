import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import NotPermitted from "./NotPermitted";
import { useEffect, useState } from "react";
import { dogetAccountAction } from "../../redux/account/accountSlice";
import Loading from "../loading";

const RoleBaseRoute = (props) => {
    const isAdminRoute = window.location.pathname.startsWith('/admin');
    const user = useSelector(state => state.account.user);
    const userRole = user.role;
    console.log("check role pttroute",userRole)

    if (isAdminRoute && userRole === 'ADMIN') {
        return (<>{props.children}</>)
    } else {
        return (<NotPermitted />)
    }
}

const ProtectedRoute = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    console.log('running ProtectedRoute');
    //thêm thời gian đợi vì khi f5 lại trang redux chưa kịp gán data nên phải đợi nó gán xong
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false); // Cập nhật trạng thái sau vài giây
        }, 100); // Thời gian chờ là 3 giây, có thể thay đổi theo ý bạn

        // Xóa timer khi component unmount
        return () => clearTimeout(timer);
    }, []);


    console.log("check props protected",props)
    const isAuthenticated = useSelector(state => state.account.isAuthenticated)


    if (isLoading) {
        //nếu đang loading thì trả vể compoent
        return <div><Loading/></div>;
    }

    console.log("isAuthenticated:", isAuthenticated); // Kiểm tra giá trị

    return (
        <>
            {isAuthenticated === true ?
                <>
                    <RoleBaseRoute>
                        {props.children}
                    </RoleBaseRoute>
                </>
                :
                <Navigate to='/' replace />
            }
        </>
    )
}

export default ProtectedRoute;

