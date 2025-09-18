import React, { useEffect, useState } from 'react';
import { Image,Badge, Button, Descriptions, Drawer, Upload } from 'antd';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';

const ViewDetailProduct =(props) =>{

    //xu ly slide
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [fileList, setFileList] = useState([])
    //
    const {setViewDetailProduct,viewDetailProduct,setDataDetailProduct,dataDetailProduct
    } = props
    // console.log("check dataDetailBook>>>",dataDetailProduct)
    const onClose = () => {
        setViewDetailProduct(false);
        setDataDetailProduct(null);
    };


    const handlePreview = async (file) => {
        console.log("check handle Priviu>>",file)
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
      };
      const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
useEffect(()=>{
  if(dataDetailProduct){
    let imgThumnail ={} ,imgSlide = []
    if(dataDetailProduct.filePath){
      imgThumnail = {
        uid: uuidv4(),
        name: dataDetailProduct.filePath,
        status: 'done',
        url: `${import.meta.env.VITE_BACKEND_URL}/upload/${dataDetailProduct.filePath}`,
      }
    }
    if(dataDetailProduct.filePath && dataDetailProduct.filePath.length >0 ){
      dataDetailProduct.filePath.map((item)=>{
        imgSlide.push({
          uid: uuidv4(),
          name: item,
          status: 'done',
          url: `${import.meta.env.VITE_BACKEND_URL}/upload/${item}`,
        })

      })

    }
    setFileList([imgThumnail, ...imgSlide])
  }

},[dataDetailProduct])
    return (
      <>
          <Drawer
                title="Chức năng xem chi tiết"
                width={"50vw"}
                onClose={onClose}
                open={viewDetailProduct}
            >
                <Descriptions
                    title="Thông tin user"
                    bordered
                    column={2}
                >
                    <Descriptions.Item label="Id">{dataDetailProduct?.ID}</Descriptions.Item>
                    <Descriptions.Item label="thumbnail">{dataDetailProduct?.filePath}</Descriptions.Item>
                   
                    <Descriptions.Item label="mainText">{dataDetailProduct?.mainText}</Descriptions.Item>
                    <Descriptions.Item label="category">{dataDetailProduct?.category}</Descriptions.Item>

                    {/* <Descriptions.Item label="Role" span={2}>
                        <Badge status="processing" text={dataDetailBook?.role} />
                    </Descriptions.Item> */}
                    <Descriptions.Item label="Created At">
                        {moment(dataDetailProduct?.createdAt).format('DD-MM-YYYY hh:mm:ss')}
                    </Descriptions.Item>
                    <Descriptions.Item label="Updated At">
                        {moment(dataDetailProduct?.updatedAt).format('DD-MM-YYYY hh:mm:ss')}
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
export default ViewDetailProduct;