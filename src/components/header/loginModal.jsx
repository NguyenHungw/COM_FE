import React, { useState } from 'react';
import { Button, Col, Divider, Form, Input, Modal, notification, Row } from 'antd';
import './login.scss'
import { loginNormalAPI } from '../../services/api.service';
import { doLoginAction } from '../../redux/account/accountSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const LoginModal = ({isLoginModalOpen,setIsLoginModalOpen}) => {

const navigate = useNavigate();
const dispatch = useDispatch();
const [password,setPassword] = useState('')
const [resgpassword1,setResgpassword1] = useState('')
const [resgpassword2,setResgpassword2] = useState('')

const [name,setName] = useState('')
const [resgname,setResgame] = useState('')


const loginGoogle = async()=>{
window.location.href = `${import.meta.env.VITE_BACKEND_URL}/api/Google/login-google`;
}
const clearState = async()=>{
  setPassword('')
  setResgpassword1('')
  setResgpassword2('')
  setName('')
  setResgame('')
}

const handleSubmit = async()=>{
	try{
		const res = await loginNormalAPI(name,password);
	console.log('subm',name)
	if(res?.data?.status === 1){
		notification.success({
			message:"Đăng nhập",
			description: res.data.message
		})
		localStorage.setItem("access_token",res.data.token)

		dispatch(doLoginAction({
			 email: res.data.email,
				phone: res.data.phone,
				fullName: res.data.fullName,
				role: res.data.role,
				id: res.data.id
			 }))
       setIsLoginModalOpen(false)
       clearState()
		navigate("/")
	}else{
		notification.error({
			message:"Đăng nhập",
			description:"Tài khoản hoặc mật khẩu không chính xác hoặc chưa được kích hoạt"
		})
	}
	
	}catch(error){
		  console.error("Login error:", error);
    const message = error?.response?.data?.message;
	console.log('ccheck mess',message)
    notification.error({
       message: "Đăng nhập thất bại",
      description: message
    });
	}

}




  return (
    <>
      {/* <Button type="primary" onClick={showModal}>
        Open Modal
      </Button> */}
      <Modal
        className='affected-modal'

        title="Login"
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={isLoginModalOpen}
        style={{minWidth:'829px'}}
        footer={null}
        onCancel={()=>{setIsLoginModalOpen(false)}}
      >
     
<Form layout="vertical">
<div class="social-container">
				<Button href="#" class="social"><i class="fab fa-facebook-f"></i></Button>
				<Button href="#" class="social" onClick={loginGoogle}><i class="fab fa-google-plus-g"></i></Button>
				<Button href="#" class="social"><i class="fab fa-linkedin-in"></i></Button>
			</div>
      <div className='main-form'>
        <div className='login-form'>
         <h1>Đăng Nhập</h1>
      <Form.Item label="Tên tài khoản hoặc địa chỉ email*">
        <Input type='name' value={name} onChange={e=> setName(e.target.value)} />
      </Form.Item>
      <Form.Item label="Mật khẩu*">
        <Input.Password type='password' value={password} onChange={e=>setPassword(e.target.value)} />
      </Form.Item>
      <Button type="primary" onClick={handleSubmit}>Đăng Nhập</Button>
        </div>
            
        <div className='register-form'>
        <h1>Đăng Ký</h1>
    <Form.Item label="Tên tài khoản hoặc địa chỉ email*">
        <Input type='name' value={resgname} onChange={e=> setResgame(e.target.value)} />
      </Form.Item>
      <Form.Item label="Mật khẩu*">
        <Input.Password type='resgpassword1' value={resgpassword1} onChange={e=>setResgpassword1(e.target.value)} />
      </Form.Item>
       <Form.Item label="Nhập Lại Mật khẩu*">
        <Input.Password type='resgpassword2' value={resgpassword2} onChange={e=>setResgpassword2(e.target.value)} />
      </Form.Item>
      {resgpassword1 !== resgpassword2 && resgpassword2.length >0 && (
      <div style={{color:'red'}}>Mật khẩu không khớp</div>
      )}
      
      <Button type="primary">Đăng Ký</Button>
      
        </div>
      </div>
</Form>


      </Modal>
    </>
  );
};
export default LoginModal;