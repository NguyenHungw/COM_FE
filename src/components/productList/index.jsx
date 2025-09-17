import React from 'react';
import Slider from 'react-slick';
import './productList.scss'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const products = [
  { id: 1, name: 'Product 1', image: 'https://localhost:2222/upload/KIKrBTSC_string.jfif' },
  { id: 2, name: 'Product 2', image: 'https://localhost:2222/upload/KIKrBTSC_string.jfif' },
  { id: 3, name: 'Product 3', image: 'https://localhost:2222/upload/KIKrBTSC_string.jfif' },
  { id: 4, name: 'Product 3', image: 'https://localhost:2222/upload/KIKrBTSC_string.jfif' },
  { id: 5, name: 'Product 3', image: 'https://localhost:2222/upload/KIKrBTSC_string.jfif' },

];

const ProductCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
  };

  return (
    <div className='productlist' >
    <div style={{ width: '90%', margin:'0 auto'}}>
      <Slider {...settings}>
        {products.map((product) => (
          <div key={product.id} style={{ padding: '3px' }}>
            <div style={{ width: '160px', margin: '0 auto' }}>
              <img
                src={product.image}
                alt={product.name}
                style={{ width: '241px', height: '241px',objectFit:'cover', borderRadius: '8px' }}
              />
            </div>
            <h3 style={{ textAlign: 'center',marginLeft:55,color:'white' }}>{product.name}</h3>
          </div>
        ))}
      </Slider>
    </div>
    </div>

  );
};

export default ProductCarousel;
