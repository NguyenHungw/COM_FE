// import axios from "./axios.customize"

import axios from "./axios.customize";

const callFetchAccount = () => {
    
    const URL_BACKEND = '/api/Google/me';

    return axios.get(URL_BACKEND)
}

const cartAPI = (id) => {
    const URL_BACKEND = `api/GioHang/DSGioHangUser`+id;
    return axios.get(URL_BACKEND)
}
const loginNormalAPI = (name,password) =>{
   
    // validateStatus: () => true
    const URL_BACKEND = "/api/TaiKhoan/login";

        
    // Tạo đối tượng dữ liệu để gửi lên API
    const data = {
        email: name,
        password: password
    };
    
    // Gửi dữ liệu dưới dạng JSON
    return axios.post(URL_BACKEND, data, {
        headers: {
            'Content-Type': 'application/json', // Đảm bảo gửi dữ liệu dưới dạng JSON
        }
    });
}
const getInfoAcessAPI = () =>{
    const URL_BACKEND = "/api/Google/me";
    return axios.get(URL_BACKEND);
}
const getloginGoogleAPI = () => {
    const URL_BACKEND = "/api/Google/login-google";
    return axios.get(URL_BACKEND);
 
}

const getProductsAPI = (query) => {
    const URL_BACKEND = `/api/SanPham/DSSanPhamTrangChuTotal?`+query;

return axios.get(URL_BACKEND)
}


const getProductsAdminAPI = (query) => {
    const URL_BACKEND = `/api/SanPham/DSSanPhamAdmin?`+query;

return axios.get(URL_BACKEND)
}
//
const readCookies = async() =>{
    const URL_BACKEND = "api/Google/me";
    return axios.get(URL_BACKEND)
}
const loginUserAPI = (username, password) => {
    const URL_BACKEND = "/api/v1/auth/login";
    const data = {
        username: username,
    
        password: password,
        delay: 1000,

    }
    return axios.post(URL_BACKEND, data)
}


const callLogOutAccount = () => {
    const instance = axios.create({
        baseURL: import.meta.env.VITE_BACKEND_URL,
        withCredentials: true // phải có để gửi cookie
        });
    return instance.post('/api/TaiKhoan/Logout')
}

const callDonVids = () =>{
    const URL_BACKEND = "/api/DonVi/DSDonVi"
    return axios.get(URL_BACKEND)
}
const callLoaiSanPhamds = () =>{
    const URL_BACKEND = "/api/LoaiSanPhami/DSLoaiSP"
    return axios.get(URL_BACKEND)
}

const ThemSanPhamAnhVaGia = (formData) =>{
    const URL_BACKEND = "/api/SanPham/ThemSanPhamAnhVaGia"
    // const data = {
    //     files:files,
    //     TenSanPham:TenSanPham,
    //     LoaiSanPhamID:LoaiSanPhamID,
    //     DonViTinhID:DonViTinhID,
    //     MoTa:MoTa,
    //     SoLuong:SoLuong,
    //     GiaBan:GiaBan,
    //     SalePercent:SalePercent,
    // }
    return axios.post(URL_BACKEND,formData,{
        headers: { "Content-Type": "multipart/form-data" }, //chuyên để gửi form có file đính kèm (upload ảnh, pdf, video...).
    })
}

const callDanhSachSPAdmin_NhieuIMG = (query)=>{
    const URL_BACKEND = `/api/SanPham/DSSanPhamAdminNhieuIMG?`+query
    return axios.get(URL_BACKEND)
}
export {loginUserAPI,callLogOutAccount,getProductsAPI,getloginGoogleAPI,readCookies,getInfoAcessAPI
,loginNormalAPI,cartAPI,callFetchAccount,getProductsAdminAPI,callLoaiSanPhamds,callDonVids,ThemSanPhamAnhVaGia,callDanhSachSPAdmin_NhieuIMG}