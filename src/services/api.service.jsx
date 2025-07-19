// import axios from "./axios.customize"

import axios from "./axios.customize";


const getProductsAPI = (query) => {
    const URL_BACKEND = `/api/SanPham/DSSanPhamTrangChu?page=`+query;

return axios.get(URL_BACKEND)
}
//

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
const callFetchAccount = () => {
    return axios.get('/api/v1/auth/account')
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

export {loginUserAPI,registerUserAPI,callFetchAccount,callLogOutAccount,getAllUserNoPage,getAllUserYesPage,deleteUserById,AddUserAPI
,addListUserBulk,updateUser,getAllBooksYesPage,getBookCategory,uploadImg,deleteBookById,AddBookAPI,updateBook,getProductsAPI}