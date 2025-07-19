import { Button, Divider } from 'antd';
import './footer.scss'

const Footer = () => {
    return (
        <div className="footer">
        <div className="footer-container">
            <div className="footer-content-1">
                <h1>Footer Section</h1>
                <p>This is the footer content.</p>
                <Button type="primary" style={{border:"10px"}} className="footer-button">
                    Chat ngay

                    </Button>
                </div>
                <div className="footer-content-2">
                    <h1>Sản Phẩm</h1>
                    <ul>
                    <li>Cốm tươi nguyên chất</li>
                    <li>Cốm tươi nguyên chất</li>
                    <li>Cốm tươi nguyên chất</li>
                    <li>Cốm tươi nguyên chất</li>
                    </ul>
                </div>
                <div className="footer-content-3">
                    <h1>Hỗ Trợ</h1>
                    <ul>
                    <li>Hướng dẫn mua hàng</li>
                    <li>Chính sách vận chuyển</li>
                    <li>Chính sách đổi trả</li>
                    <li>Câu hỏi thường gặp</li>
                    </ul>
                </div>
                <div className="footer-content-4">
                    <h1>Đăng Ký Nhận Tin</h1>
                    <p>Nhập email của bạn để nhận thông tin mới nhất</p>
                    <div className="footer-input">
                    <input type="email" placeholder="Nhập email của bạn" />
                    <Button type="primary" className="footer-button">
                        </Button>
                        </div>
                </div>
                

        </div>
          <div className='footer-divider'>
                    <Divider style={{ padding: 0, borderColor: 'gray' }}/>
                    
                    <p className='footer-text'>© 2023 Cốm Làng Vòng. Bảo lưu mọi quyền.</p>
                    <p className='footer-text'>Giấy chứng nhận ĐKKD số: 0123456789 do Sở KHĐT Hà Nội cấp.</p>

                    </div>
        </div>
      
        
    )
}
export default Footer;