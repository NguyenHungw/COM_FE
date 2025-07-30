
import { Button, Input,Form, notification } from 'antd';

import './login.scss'
import { DownOutlined } from '@ant-design/icons';
import { loginNormalAPI, loginUserAPI, readCookies } from '../../services/api.service';
import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { doLoginAction } from '../../redux/account/accountSlice';
import { useDispatch } from 'react-redux';
import { HttpStatusCode } from 'axios';


const Login = () => {
	    const navigate = useNavigate();
		    const dispatch = useDispatch();

  const [form] = Form.useForm();

	const [name,setName] = useState('');
	const [password,setPassword]  = useState('');

	const onFinish = values => {
  console.log('Success:', values);
	}
const onFinishFailed = errorInfo => {
  console.log('Failed:', errorInfo);
};

const containerRef = useRef(null);
// console.log('check ref',containerRef.current.classList)




const loginGoogle = async()=>{
    window.location.href = "https://localhost:2222/api/Google/login-google";
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


// const container = document.getElementById('container');
const handleSignUp = () => {
	 if (containerRef?.current){
		    containerRef.current.classList.add("right-panel-active");

	 }
}
const handleSignIn = () => {
	if (containerRef?.current){
		    containerRef.current.classList.remove("right-panel-active");

	}
}

    return(
        <>
        <div className='login-page'>
<div class="container" id="container" ref={containerRef}>
	<div class="form-container sign-up-container">
		<form action="#">
			<h1>Đăng Ký Tài Khoản</h1>
			<div class="social-container">
				<Button href="#" className="facebook-icon"><i class="fab fa-facebook-f"></i></Button>
				<Button href="#" className="google-icon" onClick={loginGoogle}><i class="fab fa-google-plus-g"></i></Button>
				<Button href="#" className="linkedin-icon"><i class="fab fa-linkedin-in"></i></Button>
			</div>
			<span>or use your email for registration</span>
			<Input type="tel" placeholder="Name" value={name} onChange={(e)=>setName(e.target.value)} />
			<Input type="email" placeholder="Email" />
			<Input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} />
			<Button>Đăng Ký</Button>
		</form>
	</div>
	<div class="form-container sign-in-container">
		  <form>
			<Link to="/" className='back-home'>Quay lại trang chủ</Link>
			<h1>Đăng nhập</h1>
			<div class="social-container">
				<Button href="#" class="social"><i class="fab fa-facebook-f"></i></Button>
				<Button href="#" class="social" onClick={loginGoogle}><i class="fab fa-google-plus-g"></i></Button>
				<Button href="#" class="social"><i class="fab fa-linkedin-in"></i></Button>
			</div>
			<span>or use your account</span>
			<Form.Item
			style={{width:'100%'}}
				  name="username"
				  rules={[{ required: true, message: 'Please input your username!' }]}
				><Input type="tel" name='name' placeholder="Name" value={name} onChange={(e)=>setName(e.target.value)} /></Form.Item>
			
			<Input type="password" name='password' placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} />
			<a href="#">Quên mật khẩu</a>
			
			<Button onClick={handleSubmit} >Đăng Nhập</Button>
		</form>
	</div>
	<div class="overlay-container">
		<div class="overlay">
			<div class="overlay-panel overlay-left">
				<h1>Welcome Back!</h1>
				<p>To keep connected with us please login with your personal info</p>
				<button class="ghost" id="signIn" onClick={handleSignIn} >Sign In</button>
			</div>
			<div class="overlay-panel overlay-right">
				<h1>Bạn chưa có tài khoản ?!</h1>
				<div className='effect-arrow'><DownOutlined style={{ fontSize: '32px' }}/> </div>
				<button class="ghost" id="signUp" onClick={handleSignUp} >Đăng Ký Ngay</button>
			</div>
		</div>
	</div>
</div>
</div>
        </>
    )
};
export default Login;