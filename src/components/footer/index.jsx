import { Button, Divider } from 'antd';
import { MailOutlined, FacebookFilled, InstagramFilled, PhoneOutlined } from '@ant-design/icons';
import './footer.scss';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Cột 1 - Giới thiệu */}
        <div className="footer-section">
          <h2 className="footer-title">Cốm Làng Vòng</h2>
          <p className="footer-desc">
            Tinh hoa cốm truyền thống Hà Nội – Nguyên liệu sạch, hương vị quê hương, mang đậm nét văn hóa Việt.
          </p>
          <Button type="primary" className="footer-button">Chat Ngay</Button>
        </div>

        {/* Cột 2 - Sản phẩm */}
        <div className="footer-section">
          <h3 className="footer-subtitle">Sản Phẩm</h3>
          <ul>
            <li>Cốm tươi nguyên chất</li>
            <li>Bánh cốm</li>
            <li>Trà cốm</li>
            <li>Quà biếu cốm</li>
          </ul>
        </div>

        {/* Cột 3 - Hỗ trợ */}
        <div className="footer-section">
          <h3 className="footer-subtitle">Hỗ Trợ</h3>
          <ul>
            <li>Hướng dẫn mua hàng</li>
            <li>Chính sách vận chuyển</li>
            <li>Chính sách đổi trả</li>
            <li>Câu hỏi thường gặp</li>
          </ul>
        </div>

        {/* Cột 4 - Đăng ký nhận tin */}
        <div className="footer-section">
          <h3 className="footer-subtitle">Đăng Ký Nhận Tin</h3>
          <p>Nhập email của bạn để nhận thông tin ưu đãi mới nhất</p>
          <div className="footer-input">
            <input type="email" placeholder="Nhập email của bạn" />
            <Button type="primary" icon={<MailOutlined />} />
          </div>
          <div className="footer-socials">
            <FacebookFilled className="social-icon" />
            <InstagramFilled className="social-icon" />
            <PhoneOutlined className="social-icon" />
          </div>
        </div>
      </div>

      {/* Dòng cuối cùng */}
      <Divider style={{ borderColor: 'rgba(255,255,255,0.2)' }} />
      <div className="footer-bottom">
        <p>© 2025 Cốm Làng Vòng. Bảo lưu mọi quyền.</p>
        <p>Giấy chứng nhận ĐKKD số: 0123456789 do Sở KHĐT Hà Nội cấp.</p>
      </div>
    </footer>
  );
};

export default Footer;
