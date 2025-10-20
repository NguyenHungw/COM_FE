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
const XoaSPAnhGia = (id)=>{
    const URL_BACKEND=`/api/SanPham/XoaSanPhamAnhGia`+id
    return axios.delete(URL_BACKEND,id)
}

const callDanhSachSPAdmin_NhieuIMG = (query)=>{
    const URL_BACKEND = `/api/SanPham/DSSanPhamAdminNhieuIMG?`+query
    return axios.get(URL_BACKEND)
}
const DoiViTriHinhAnh = (payload) => {
    const URL_BACKEND=`/api/SamPhamImage/DoiNhieuViTri`
    return axios.put(URL_BACKEND,payload)
}
const UploadIMG = (formData) =>{
    const URL_BACKEND =`/api/SamPhamImage/ThemHinhAnhSP`
      return axios.post(URL_BACKEND,formData,{
        headers: { "Content-Type": "multipart/form-data" }, //chuyên để gửi form có file đính kèm (upload ảnh, pdf, video...).
    })

}
const RemoveIMG =(id)=>{
    const URL_BACKEND = `/api/SamPhamImage/XoaHinhAnh?id=`+id
    return axios.delete(URL_BACKEND,id)
}
const UpdateIMG =(formData)=>{
    const URL_BACKEND = `/api/SamPhamImage/SuaIMG`
     return axios.put(URL_BACKEND,formData,{
        headers: { "Content-Type": "multipart/form-data" }, //chuyên để gửi form có file đính kèm (upload ảnh, pdf, video...).
    })

}
const ChiTietIMG = (id) =>{
    const URL_BACKEND = `/api/SamPhamImage/ChiTietHinhAnhSP?id=`+id
    return axios.get(URL_BACKEND)
}
const SuaSP = (id,tenSanPham,loaiSanPhamID,donViTinhID,moTa,soLuong) =>{
    const URL_BACKEND =`/api/SanPham/SuaSanPham`
    const data = {
        id:id,
        tenSanPham:tenSanPham,
        loaiSanPhamID:loaiSanPhamID,
        donViTinhID:donViTinhID,
        moTa:moTa,
        soLuong:soLuong
    }
    return axios.put(URL_BACKEND,data)
}
const SuaGiaSP = (sanPhamID, giaBan, salePercent) => {
  const URL_BACKEND = `/api/SanPham/SuaGiaSanPham`
  const data = {
    sanPhamID, giaBan, salePercent
  }
  return axios.put(URL_BACKEND, data,{
    headers: {"Content-Type": "application/json"}
  })
}
const CallDanhSachDonViPage = (query)=>{
    const URL_BACKEND = `/api/DonVi/DSDonViPage?`+query
    return axios.get(URL_BACKEND)
}
const ThemDonVi = (tenDonVi,mota)=>{
    const URL_BACKEND = `/api/DonVi/ThemDonVi`
    const data = {
        tenDonVi,mota
    }
    return axios.post(URL_BACKEND,data)
}
const SuaDonVi = (donViTinhID,tenDonVi,mota)=>{
    const URL_BACKEND = `/api/DonVi/SuaDonVi`
    const data = {
        donViTinhID,tenDonVi,mota
    }
    return axios.put(URL_BACKEND,data)
}
const XoaDonVi = (id) => {
    const URL_BACKEND = `/api/DonVi/XoaDonVi?id=`+id
    return axios.delete(URL_BACKEND)
}
// loai san pham 

const CallDanhSachSanPhamPage = (query)=>{
    const URL_BACKEND = `/api/LoaiSanPhami/DSLoaiSPPage?`+query
    return axios.get(URL_BACKEND)
}
const ThemLoaiSanPham = (tenLoaiSanPham,moTaLoaiSP,trangThai)=>{
    const URL_BACKEND = `/api/LoaiSanPhami/ThemLSP`
    const data = {
        tenLoaiSanPham,moTaLoaiSP,trangThai
    }
    return axios.post(URL_BACKEND,data)
}
const SuaLoaiSanPham = (loaiSanPhamID,tenLoaiSanPham,moTaLoaiSP,trangThai)=>{
    const URL_BACKEND = `/api/LoaiSanPhami/SuaLSP`
    const data = {
        loaiSanPhamID,tenLoaiSanPham,moTaLoaiSP,trangThai
    }
    return axios.put(URL_BACKEND,data)
}
const XoaLoaiSanPham = (id) => {
    const URL_BACKEND = `/api/LoaiSanPhami/XoaLSP?id=`+id
    return axios.delete(URL_BACKEND)
}
const DanhSachNhomQuyen = (query) => {
    const URL_BACKEND=`/api/NND/DanhSachNNDPage?`+query
    return axios.get(URL_BACKEND)

}
const DanhSachChucNang = (query) => {
    const URL_BACKEND = `/api/ChucNang/DSChucNangPage?`+query
    return axios.get(URL_BACKEND)
}
const ChiTietNND = (query) => {
    const URL_BACKEND = `/api/NND/ChiTietNNDPage?`+query
    return axios.get(URL_BACKEND)
}
const SuaCNCN = (id,chucNangID,nndid,xem,them,sua,xoa) => {
    const data = {
        idChucNangCuaNND: id,
        chucNang: chucNangID,
        nndid: nndid,
        xem: xem,
        them: them,
        sua: sua,
        xoa: xoa
                }
    const URL_BACKEND = `/api/ChucNangCuaNND/SuaCNCN`
    return axios.put(URL_BACKEND,data)
}
const ThemNND = (tenNND,ghiChu) =>{
    const data = {
        tenNND:tenNND,
        ghiChu:ghiChu

    }
    const URL_BACKEND = `/api/NND/ThemNND`
    return axios.post(URL_BACKEND,data)
}
const XoaNND = (id) => {
    const URL_BACKEND = `/api/NND/DeleteNND?id=`+id
    return axios.delete(URL_BACKEND)
}
const SuaNND = (formData) => {

    const URL_BACKEND =`/api/NND/SuaNND`
    return axios.put(URL_BACKEND,formData)
}
const DanhSachNhomChucNang = (query) => {
    const URL_BACKEND = `api/ChucNang/DSChucNangPage?`+query
    return axios.get(URL_BACKEND)

}
const ThemNhomChucNang = (name) => {
    const URL_BACKEND = `/api/ChucNang/ThemChucNang?namecn=`+name
    return axios.post(URL_BACKEND)
}
const SuaNhomChucNang = (chucNangid,tenChucNang) => {
    const data ={chucNangid,tenChucNang}
    const URL_BACKEND =`/api/ChucNang/SuaChucNang`
    return axios.put (URL_BACKEND,data)
}
const XoaNhomChucNang = (id) => {
    const URL_BACKEND =`/api/ChucNang/XoaChucNang?id=`+id
    return axios.delete(URL_BACKEND)
}
const DanhSachChucNangChuaCo = (query) => {
    const URL_BACKEND =`/api/ChucNang/DSChucNangChuaCo?`+query
    return axios.get(URL_BACKEND)
}
const ThemCNcuaNND = (cn,id) => {
    const data ={
        nndid: id,
        chucNang: cn,
        xem: false,
        them: false,
        sua: false,
        xoa: false
    }
    const URL_BACKEND =`/api/ChucNangCuaNND/ThemChucNangCuaNND`
    return axios.post(URL_BACKEND,data)
}
const XoaCNcuaNND = (idNND,idCN) => {
    const URL_BACKEND = `/api/ChucNangCuaNND/XoaCNcuaNND?idNND=`+idNND+`&idCN=`+idCN
    return axios.delete(URL_BACKEND)
}
const DanhSachUser = (query) => {
    const URL_BACKEND =`/api/TK/DanhSachUser?`+query
    return axios.get(URL_BACKEND)
}
const DanhSachNND = () => {
    const URL_BACKEND =`/api/NND/DanhSachNND?page=1`
    return axios.get(URL_BACKEND)
}
const UpdateUser = (userID,tenNND,phone,isActive,fullName,email,address)=>{
    const URL_BACKEND = `api/TK/SuaUser`
    const data ={
        userID: userID,
        fullName: fullName,
        email: email,
        phone: phone,
        address: address,
        isActive: isActive,
        idnnd: tenNND
    }
        return axios.put(URL_BACKEND,data)
}
const getAllMessage = (query) => {
    const URL_BACKEND =`/api/chat/GetAllTinNhan?`+query
    return axios.get(URL_BACKEND)
}
const getAllMessageRoom = (query) => {
     const URL_BACKEND =`/api/chat/LichSuTinNhan?`+query
    return axios.get(URL_BACKEND)
}
const sendMessGR = (roomID,fromUserID,message) =>{
    const URL_BACKEND =`/api/chat/sendGR`
     const data = {
    roomID,
    fromUserID,
    message,
    sentAt: new Date().toISOString()

  };
    return axios.post(URL_BACKEND,data)
}
const createRoom = (id) =>{
    const URL_BACKEND = `/api/chat/CreateRoom?UserID=`+id
    return axios.post(URL_BACKEND)
}
export {loginUserAPI,callLogOutAccount,getProductsAPI,getloginGoogleAPI,readCookies,getInfoAcessAPI
,loginNormalAPI,cartAPI,callFetchAccount,getProductsAdminAPI,callLoaiSanPhamds,callDonVids,ThemSanPhamAnhVaGia,callDanhSachSPAdmin_NhieuIMG
,XoaSPAnhGia,DoiViTriHinhAnh,UploadIMG,RemoveIMG,UpdateIMG,ChiTietIMG,SuaSP,SuaGiaSP,CallDanhSachDonViPage,ThemDonVi,SuaDonVi,XoaDonVi
,CallDanhSachSanPhamPage,ThemLoaiSanPham,SuaLoaiSanPham,XoaLoaiSanPham,DanhSachNhomQuyen,DanhSachChucNang,ChiTietNND,SuaCNCN ,ThemNND
,XoaNND,SuaNND,DanhSachNhomChucNang,ThemNhomChucNang,SuaNhomChucNang,XoaNhomChucNang,DanhSachChucNangChuaCo,ThemCNcuaNND,XoaCNcuaNND
,DanhSachUser,DanhSachNND,UpdateUser,getAllMessage,getAllMessageRoom,sendMessGR,createRoom
}