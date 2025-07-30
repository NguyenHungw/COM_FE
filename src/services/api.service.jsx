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
     // ✅ Chấp nhận tất cả status code, không throw lỗi
    validateStatus: () => true
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
const registerUserAPI = (fullname,email,password,phone) => {
    const URL_BACKEND = "/api/v1/user/register";
    const data = {
        fullName:fullname,
        email:email,
        password:password,
        phone:phone
    }
    return axios.post(URL_BACKEND,data)
}
const AddUserAPI = (fullname,password,email,phone) => {
    const URL_BACKEND = "/api/v1/user";
    const data = {
        fullName:fullname,
        
        password:password,
        email:email,
        phone:phone
    }
    return axios.post(URL_BACKEND,data)
}
const getAllUserNoPage = () => {
    const URL_BACKEND = "/api/v1/user";
    return axios.get(URL_BACKEND)

}
const getAllUserYesPage = (query) => {
    const URL_BACKEND = `/api/v1/user?${query}`;
    return axios.get(URL_BACKEND)

}

const callLogOutAccount = () => {
    return axios.post('/api/v1/auth/logout')
}
const deleteUserById = (id)=>{
    return axios.delete('/api/v1/user/'+id)
}
const addListUserBulk = (data)=>{
    return axios.post('/api/v1/user/bulk-create',data)
}
const updateUser = (id,fullname,email,phone) =>{
    const data = {
        _id:id,
        fullName:fullname,
        email:email,
        phone:phone
    }
    return axios.put('/api/v1/user',data)
}
/* API BOOKs */
const getAllBooksYesPage = (query) => {
    const URL_BACKEND = `/api/v1/book?${query}`;
    return axios.get(URL_BACKEND)

}
const getBookCategory = () =>{
    return axios.get('/api/v1/database/category')
}
const uploadImg = (fileImg) => {
    const bodyFormData = new FormData();
    bodyFormData.append('fileImg', fileImg);
    return axios({
        method: 'post',
        url: '/api/v1/file/upload',
        data: bodyFormData,
        headers: {
            "Content-Type": "multipart/form-data",
            "upload-type": "book"
        },
    });
}
const deleteBookById = (id)=>{
    return axios.delete('/api/v1/book/'+id)
}
const AddBookAPI = (thumbnail,slider,mainText,author,price,sold,quantity,category) => {
    const URL_BACKEND = "/api/v1/book";
    const data = {
        thumbnail:thumbnail,
        slider:slider,
        mainText:mainText,
        author:author,
        price:price,
        sold:sold,
        quantity:quantity,
        category:category
    }
    return axios.post(URL_BACKEND,data)
}
const updateBook = (id,thumbnail,slider,mainText,author,price,sold,quantity,category) =>{
    const data = {
        _id:id,
        thumbnail:thumbnail,
        slider:slider,
        mainText:mainText,
        author:author,
        price:price,
        sold:sold,
        quantity:quantity,
        category:category
    }
    return axios.put(`/api/v1/book/${id}`,data)
}

export {loginUserAPI,registerUserAPI,callLogOutAccount,getAllUserNoPage,getAllUserYesPage,deleteUserById,AddUserAPI
,addListUserBulk,updateUser,getAllBooksYesPage,getBookCategory,uploadImg,deleteBookById,AddBookAPI,updateBook,getProductsAPI,getloginGoogleAPI,readCookies,getInfoAcessAPI
,loginNormalAPI,cartAPI,callFetchAccount}