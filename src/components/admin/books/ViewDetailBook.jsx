import React, { useEffect, useState } from 'react';
import { Image,Badge, Button, Descriptions, Drawer, Upload } from 'antd';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';

const ViewDetailBook =(props) =>{

    //xu ly slide
    const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [fileList, setFileList] = useState([
    
  ])
    //
    const {setIsUpdateBookModal,updateBookModal,setDataUpdate,dataUpdate,viewDetailBook,setDataDetailBook,dataDetailBook,
        setdataDetailBook,setViewDetailBook
    } = props
    console.log("check dataDetailBook>>>",dataDetailBook)
    const onClose = () => {
        setViewDetailBook(false);
        setDataDetailBook(null);
    };


    const handlePreview = async (file) => {
        console.log("check handle Priviu>>",file)
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
      };
      const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
useEffect(()=>{
  if(dataDetailBook){
    let imgThumnail ={} ,imgSlide = []
    if(dataDetailBook.thumbnail){
      imgThumnail = {
        uid: uuidv4(),
        name: dataDetailBook.thumbnail,
        status: 'done',
        url: `${import.meta.env.VITE_BACKEND_URL}/images/book/${dataDetailBook.thumbnail}`,
      }

    }
    if(dataDetailBook.slider && dataDetailBook.slider.length >0 ){
      dataDetailBook.slider.map((item)=>{
        imgSlide.push({
          uid: uuidv4(),
          name: item,
          status: 'done',
          url: `${import.meta.env.VITE_BACKEND_URL}/images/book/${item}`,
        })

      })

    }
    setFileList([imgThumnail, ...imgSlide])
  }

},[dataDetailBook])
    return (
      <>
          <Drawer
                title="Chức năng xem chi tiết"
                width={"50vw"}
                onClose={onClose}
                open={viewDetailBook}
            >
                <Descriptions
                    title="Thông tin user"
                    bordered
                    column={2}
                >
                    <Descriptions.Item label="Id">{dataDetailBook?._id}</Descriptions.Item>
                    <Descriptions.Item label="thumbnail">{dataDetailBook?.thumbnail}</Descriptions.Item>
                   
                    <Descriptions.Item label="mainText">{dataDetailBook?.mainText}</Descriptions.Item>
                    <Descriptions.Item label="category">{dataDetailBook?.category}</Descriptions.Item>

                    {/* <Descriptions.Item label="Role" span={2}>
                        <Badge status="processing" text={dataDetailBook?.role} />
                    </Descriptions.Item> */}
                    <Descriptions.Item label="Created At">
                        {moment(dataDetailBook?.createdAt).format('DD-MM-YYYY hh:mm:ss')}
                    </Descriptions.Item>
                    <Descriptions.Item label="Updated At">
                        {moment(dataDetailBook?.updatedAt).format('DD-MM-YYYY hh:mm:ss')}
                    </Descriptions.Item>
                    {/* <Descriptions.Item label="slider">{dataDetailBook?.slider}</Descriptions.Item> */}
                    
                </Descriptions>
               
      <Upload
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        showUploadList = {{
            showRemoveIcon:false
        }}
      >
      
      </Upload>
      {previewImage && (
        <Image
          wrapperStyle={{
            display: 'none',
          }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(''),
          }}
          src={previewImage}
        />
      )}
            </Drawer>
        
      </>
    );
}
export default ViewDetailBook;