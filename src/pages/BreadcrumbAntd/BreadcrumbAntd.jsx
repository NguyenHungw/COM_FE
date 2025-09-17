import { Breadcrumb } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import '../BreadcrumbAntd/breadcrumb.scss';
import 'antd/dist/reset.css'; // nếu dùng AntD v5 trở lên

// Định nghĩa một object để map đường dẫn URL -> tên hiển thị
const breadcrumbNameMap = {
  '/': 'TRANG CHỦ',       // Khi ở "/", hiển thị "TRANG CHỦ"
  '/contact': 'THỰC ĐƠN', // Khi ở "/contact", hiển thị "THỰC ĐƠN"
};

// Tạo component BreadcrumbAntd
const BreadcrumbAntd = () => {
  // Hook useLocation() lấy thông tin location hiện tại (path, search, hash,...)
  const location = useLocation();
  console.log('check loc', location) // In ra location để debug

  // Cắt pathname thành từng phần (bỏ dấu "/") rồi lọc bỏ chuỗi rỗng
  // VD: "/contact/info" => ["contact", "info"]
  const pathSnippets = location.pathname.split('/').filter(i => i);

  // Tạo danh sách các breadcrumb item từ pathSnippets
  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    // Ghép dần path theo index để tạo link
    // VD: ["contact","info"] -> "/contact" và "/contact/info"
    const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;

    // Trả về một Breadcrumb.Item chứa Link
    return (
      <Breadcrumb.Item key={url}>
        {/* Nếu url có trong breadcrumbNameMap thì lấy tên, không thì hiển thị url viết hoa */}
        <Link to={url}>{breadcrumbNameMap[url] || url.toUpperCase()}</Link>
      </Breadcrumb.Item>
    );
  });

  // Khởi tạo breadcrumb mặc định (luôn có TRANG CHỦ ở đầu)
  const breadcrumbItems = [
    <Breadcrumb.Item key="home">
      <Link to="/">{breadcrumbNameMap['/']}</Link>
    </Breadcrumb.Item>,
  ].concat(extraBreadcrumbItems); // Nối thêm các item phụ phía sau

  // Render ra giao diện breadcrumb
  return (
    <div className="breadcrumb-container">
      {/* separator=" / " là ký tự phân cách giữa các item */}
      <Breadcrumb separator=" / ">{breadcrumbItems}</Breadcrumb>
    </div>
  );
};


export default BreadcrumbAntd;
