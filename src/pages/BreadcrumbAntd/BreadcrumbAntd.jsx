import { Breadcrumb } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import '../BreadcrumbAntd/breadcrumb.scss';
import 'antd/dist/reset.css'; // nếu dùng AntD v5 trở lên

const breadcrumbNameMap = {
  '/': 'TRANG CHỦ',
  '/contact': 'THỰC ĐƠN',
};

const BreadcrumbAntd =() => {
  const location = useLocation();
  console.log('check loc',location)
  const pathSnippets = location.pathname.split('/').filter(i => i);
  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
    return (
      <Breadcrumb.Item key={url}>
        <Link to={url}>{breadcrumbNameMap[url] || url.toUpperCase()}</Link>
      </Breadcrumb.Item>
    );
  });

  const breadcrumbItems = [
    <Breadcrumb.Item key="home">
      <Link to="/">{breadcrumbNameMap['/']}</Link>
    </Breadcrumb.Item>,
  ].concat(extraBreadcrumbItems);

  return (
    <div className="breadcrumb-container">
      <Breadcrumb separator=" / ">{breadcrumbItems}</Breadcrumb>
    </div>
  );
}

export default BreadcrumbAntd;
