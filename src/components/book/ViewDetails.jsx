import ImageGallery from "react-image-gallery";
import './style.scss'
import { Button, Row ,Col, Rate, Divider, Modal} from "antd";
import { useRef } from "react";
import { useState } from "react";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { BsCartPlus } from "react-icons/bs";
import ModalGallery from "./ModalGallery";
import BookLoader from "./BookLoader";
const ViewDetails = () =>{
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
          {
            original: "https://picsum.photos/id/1015/1000/600/",
            thumbnail: "https://picsum.photos/id/1015/250/150/",
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
            {
              original: "https://picsum.photos/id/1015/1000/600/",
              thumbnail: "https://picsum.photos/id/1015/250/150/",
              originalClass: "original-image",
              thumbnailClass: "thumbnail-image"
            },
      ];
    return( 
      // <div className="view-detail-book" style={{width:'1440px',margin:'0 auto'}}>
      // <Row gutter={[20, 20]} >
      //    <ImageGallery
      //      //ref={refGallery}
      //     items={images}
      //     showPlayButton={false} //hide play button
      //     showFullscreenButton={false} //hide fullscreen button
      //     renderLeftNav={() => <></>} //left arrow === <> </>
      //     renderRightNav={() => <></>}//right arrow === <> </>
      //     slideOnThumbnailOver={true}  //onHover => auto scroll images
      //     onClick={() => handleOnClickImage()}
      //     />

      //   <div className="detail-info-book">
                
      //     <p>Tác giả:</p>
      //     <p>Đánh Giá:</p>
      //     <p>Vận Chuyển:</p>
      //     <p>Số Lượng:</p>
      //     <Button>Thêm vào giỏ hàng</Button>
      //     <Button>Mua Ngay</Button>
            
      //     </div>
      //     </Row>
         
      // </div>
      <div style={{ background: '#efefef', padding: "20px 0" }}>
      <div className='view-detail-book' style={{ maxWidth: 1440, margin: '0 auto', minHeight: "calc(100vh - 150px)" }}>
          <div style={{ padding: "20px", background: '#fff', borderRadius: 5 }}>
              { <Row gutter={[20, 20]}>
                  <Col md={10} sm={0} xs={0}>
                      <ImageGallery
                          ref={refGallery} // chuyền ref để lấy current index trong slide để truyền tới modal
                          items={images}
                          showPlayButton={false} //hide play button
                          showFullscreenButton={false} //hide fullscreen button
                          renderLeftNav={() => <></>} //left arrow === <> </>
                          renderRightNav={() => <></>}//right arrow === <> </>
                          slideOnThumbnailOver={true}  //onHover => auto scroll images
                          slideInterval={0}
                          slideDuration={0}
                          infinite = {false}
                          lazyLoad={false}
                          autoPlay={false}
                          showNav={true}
                          
                          onClick={() => handleOnClickImage()}
                      />
                  </Col>
                  <Col md={14} sm={24}>
                      <Col md={0} sm={24} xs={24}>
                          <ImageGallery
                              // ref={refGallery}
                              items={images}
                              showPlayButton={false} //hide play button
                              showFullscreenButton={false} //hide fullscreen button
                              renderLeftNav={() => <></>} //left arrow === <> </>
                              renderRightNav={() => <></>}//right arrow === <> </>
                              showThumbnails={false}
                          />
                      </Col>
                      <Col span={24}>
                          <div className='author'>Tác giả: <a href='#'>Jo Hemmings</a> </div>
                          <div className='title'>How Psychology Works - Hiểu Hết Về Tâm Lý Học</div>
                          <div className='rating'>
                              <Rate value={5} disabled style={{ color: '#ffce3d', fontSize: 12 }} />
                              <span className='sold'>
                                  <Divider type="vertical" />
                                  Đã bán 6969</span>
                          </div>
                          <div className='price'>
                              <span className='currency'>
                                  {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(696966666)}
                              </span>
                          </div>
                          <div className='delivery'>
                              <div>
                                  <span className='delivery-left'>Vận chuyển</span>
                                  <span className='delivery-right'>Miễn phí vận chuyển</span>
                              </div>
                          </div>
                          <div className='quantity'>
                              <span className='delivery-left'>Số lượng</span>
                              <span className='delivery-right'>
                                  <button ><MinusOutlined /></button>
                                  <input defaultValue={1} />
                                  <button><PlusOutlined /></button>
                              </span>
                          </div>
                          <div className='buy'>
                              <button className='cart'>
                                  <BsCartPlus className='icon-cart' />
                                  <span>Thêm vào giỏ hàng</span>
                              </button>
                              <button className='now'>Mua ngay</button>
                          </div>
                      </Col>
                  </Col>
              </Row> } :  <BookLoader/>
             
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
export default ViewDetails