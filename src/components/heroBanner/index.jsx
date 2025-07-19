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
          original: "https://picsum.photos/id/1018/1000/600/",
          thumbnail: "https://picsum.photos/id/1018/250/150/",
          originalClass: "original-image",
          thumbnailClass: "thumbnail-image"
        },
        {
          original: "https://picsum.photos/id/1015/1000/600/",
          thumbnail: "https://picsum.photos/id/1015/250/150/",
          originalClass: "original-image",
          thumbnailClass: "thumbnail-image"
        },
        {
            original: "https://picsum.photos/id/1018/1000/600/",
            thumbnail: "https://picsum.photos/id/1018/250/150/",
            originalClass: "original-image",
            thumbnailClass: "thumbnail-image"
          },
        {
          original: "https://picsum.photos/id/1019/1000/600/",
          thumbnail: "https://picsum.photos/id/1019/250/150/",
          originalClass: "original-image",
          thumbnailClass: "thumbnail-image"
        },
        {
            original: "https://picsum.photos/id/1018/1000/600/",
            thumbnail: "https://picsum.photos/id/1018/250/150/",
            originalClass: "original-image",
            thumbnailClass: "thumbnail-image"
          },
     
      ];
    return( 
     
      <div style={{ background: '#efefef', padding: "0px 0" }}>
        <div className='hero-banner' style={{ padding: "0px 0" ,maxWidth: 1200, margin: "0 auto"}}>
         
  <div className="hero-content-banner" >
          <div style={{ padding: "0px", background: '#fff', borderRadius: 5 }}>
              { <Row gutter={[0, 0]}>
                  <Col md={21} sm={7} xs={5} className="image-gallery" order={2}>
                      <ImageGallery
                          ref={refGallery} // chuyền ref để lấy current index trong slide để truyền tới modal
                          items={images}
                          showPlayButton={false} //hide play button
                          showFullscreenButton={false} //hide fullscreen button
                          // renderLeftNav={() => <></>} //left arrow === <> </>
                          // renderRightNav={() => <></>}//right arrow === <> </>
                          slideOnThumbnailOver={true}  //onHover => auto scroll images
                          showBullets={true} //hide bullets
                          slideInterval={5000}
                          slideDuration={0}
                        //   infinite = {true}
                        //   lazyLoad={true}
                          autoPlay={true}
                          showNav={true}
                         
                        //   interval={5000}
                          
                          //  onClick={() => handleOnClickImage()}
                      />
                  </Col>
                  {/* <Col md={14} sm={24}>
                       <Col md={0} sm={24} xs={24}>
                          <ImageGallery
                              // ref={refGallery}
                              items={images}
                              showPlayButton={false} //hide play button
                              showFullscreenButton={false} //hide fullscreen button
                              renderLeftNav={() => <></>} //left arrow === <> </>
                              renderRightNav={() => <></>}//right arrow === <> </>
                              
                              
                          />
                          
                      </Col>
                      
                  </Col> */}
                  <Col md={3} sm={10} xs={19} order={1}>
                      <div className="hero-content" style={{ height: '100%',width:'230px'}  }>
                          
                      </div>
                      </Col>
                  
              </Row> } 
             
          </div>
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