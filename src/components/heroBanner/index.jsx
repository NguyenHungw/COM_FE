import ImageGallery from "react-image-gallery";
import './style.scss'
import { Button, Row ,Col, Rate, Divider, Modal} from "antd";
import { useRef } from "react";
import { useState } from "react";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { BsCartPlus } from "react-icons/bs";
import ModalGallery from "./ModalGallery";
// import BookLoader from "./BookLoader";
const HeroBanner = () =>{
  const [isOpenModalGallery, setIsOpenModalGallery] = useState(false);

  const [currentIndex, setCurrentIndex] = useState(0);
  const refGallery = useRef(null);
  
  const handleOnClickImage = () =>{
    //xử lý khi click vào ảnh slide
    setIsOpenModalGallery(true); // mở modal
    console.log("check index",refGallery.current.getCurrentIndex());
    setCurrentIndex(refGallery.current.getCurrentIndex()); //set index hiện tại để truyền xuống modal
    

  }
    const images = [
        {
          original: "https://i0.wp.com/comdo.vn/wp-content/uploads/2024/09/1-7.jpg?w=1920&ssl=1",
          thumbnail: "https://picsum.photos/id/1018/250/150/",
          originalClass: "original-image",
          thumbnailClass: "thumbnail-image"
        },
        {
          original: "https://i0.wp.com/comdo.vn/wp-content/uploads/2024/09/3-6.jpg?w=1920&ssl=1",
          thumbnail: "https://picsum.photos/id/1015/250/150/",
          originalClass: "original-image",
          thumbnailClass: "thumbnail-image"
        },
        {
            original: "https://i0.wp.com/comdo.vn/wp-content/uploads/2024/09/2-6.jpg?w=1920&ssl=1",
            thumbnail: "https://picsum.photos/id/1018/250/150/",
            originalClass: "original-image",
            thumbnailClass: "thumbnail-image"
        } 
     
      ];
    return( 
     
      <div style={{  }}>
        <div className='hero-banner' style={{ padding: "0px",maxWidth: "100%", margin: "0 auto"}}>
  <div className="hero-content-banner" >
          {/* <div style={{ padding: "0px", borderRadius: 5 }}> */}
              { <Row gutter={[0, 0]}>
                  <Col md={24} sm={7} xs={5} className="image-gallery" order={2} >
                      <ImageGallery
                      disableSwipe={false} 
                          ref={refGallery} // chuyền ref để lấy current index trong slide để truyền tới modal
                          items={images}
                          showPlayButton={false} //hide play button
                          showFullscreenButton={false} //hide fullscreen button
                     showThumbnails={false}//tắt thumb bên dưới
                          slideOnThumbnailOver={false}
                          showBullets={true} //hide bullets
                          slideInterval={5000}
                           swipeThreshold={100}        
                           enableSwipe={true}  
                           slideDuration={500} 
                  autoPlay={false} 
                  swipingTransitionDuration={10}
                          showNav={true}
                            onClick={() => {}} // Tắt sự kiện click

                           onSlide={(index) => {
                          console.log("Người dùng vừa kéo/chuyển tới ảnh:", index);
                          setCurrentIndex(index);
                        }}
                         
                
                      />
                  </Col>
         
                  {/* <Col md={3} sm={10} xs={19} order={1}>
                      <div className="hero-content" style={{ height: '100%',width:'230px'}  }>
                      </div>
                      </Col> */}
              </Row> } 
          {/* </div> */}
      </div>
      </div>
      <ModalGallery
     isOpen={isOpenModalGallery}
     setIsOpen={setIsOpenModalGallery}
     currentIndex={currentIndex} // truyền current index xuống modal
     items={images}
     title={"hardcode"}
      />
      </div>
    
    )
}
export default HeroBanner;