import React from 'react';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const products = [
  { id: 1, name: 'Product 1', image: 'https://localhost:2222/upload/KIKrBTSC_string.jfif' },
  { id: 2, name: 'Product 2', image: 'https://localhost:2222/upload/KIKrBTSC_string.jfif' },
  { id: 3, name: 'Product 3', image: 'https://localhost:2222/upload/KIKrBTSC_string.jfif' },
];

const ProductCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  return (
    <div style={{ width: '40%', margin: '0 auto' }}>
      <Slider {...settings}>
        {products.map((product) => (
          <div key={product.id} style={{ padding: '10px' }}>
            <div style={{ width: '150px', margin: '0 auto' }}>
              <img
                src={product.image}
                alt={product.name}
                style={{ width: '100%', height: '200px',objectFit:'cover', borderRadius: '8px' }}
              />
            </div>
            <h3 style={{ textAlign: 'center' }}>{product.name}</h3>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ProductCarousel;
