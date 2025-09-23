import React, { useEffect, useState } from 'react';
import { Image,Badge, Button, Descriptions, Drawer, Upload } from 'antd';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';

const ViewDetailLoaiSanPham =(props) =>{

    //xu ly slide
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [fileList, setFileList] = useState([])
    //
    const {setViewDetailDonVi,viewDetailDonVi,setDataDetailDonVi,dataDetailDonVi
    } = props
    // console.log("check dataDetailBook>>>",dataDetailDonVi)
    const onClose = () => {
        setViewDetailDonVi(false);
        setDataDetailDonVi(null);
    };


    const handlePreview = async (file) => {
        console.log("check handle Priviu>>",file)
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
      };
      const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
useEffect(()=>{
  if(dataDetailDonVi){
console.log('dataDetailDonVi filePath',dataDetailDonVi
)

  }
  
  if(dataDetailDonVi){
    let imgThumnail ={} ,imgSlide = []
    // if(dataDetailDonVi.anhChinh){
    //   imgThumnail = {
    //     uid: uuidv4(),
    //     name: dataDetailDonVi.anhChinh,
    //     status: 'done',
    //     url: `${import.meta.env.VITE_BACKEND_URL}${dataDetailDonVi.anhChinh}`,
    //   }
    // }
    if(dataDetailDonVi.danhSachAnh && dataDetailDonVi.danhSachAnh.length >0 ){
      dataDetailDonVi.danhSachAnh.map((item)=>{
        imgSlide.push({
          uid: uuidv4(),
          name: item.indexOrder,
          status: 'done',
          url: `${import.meta.env.VITE_BACKEND_URL}${item.filePath}`,
        })

      })

    }
    // setFileList([imgThumnail, ...imgSlide])
        setFileList([...imgSlide])

  }

},[dataDetailDonVi])
    return (
      <>
          <Drawer
                title="Chức năng xem chi tiết"
                width={"50vw"}
                onClose={onClose}
                open={viewDetailDonVi}
            >
                <Descriptions
                    title="Thông tin user"
                    bordered
                    column={2}
                >
                    <Descriptions.Item label="Id">{dataDetailDonVi?.id}</Descriptions.Item>
                    <Descriptions.Item label="thumbnail">{dataDetailDonVi?.anhChinh}</Descriptions.Item>
                   
                    <Descriptions.Item label="mainText">{dataDetailDonVi?.donViTinhID}</Descriptions.Item>
                    <Descriptions.Item label="category">{dataDetailDonVi?.giaBan}</Descriptions.Item>

                    {/* <Descriptions.Item label="Role" span={2}>
                        <Badge status="processing" text={dataDetailBook?.role} />
                    </Descriptions.Item> */}
                    <Descriptions.Item label="Created At">
                        {moment(dataDetailDonVi?.ngayBatDau).format('DD-MM-YYYY hh:mm:ss')}
                    </Descriptions.Item>
                    {/* <Descriptions.Item label="Updated At">
                        {moment(dataDetailDonVi?.updatedAt).format('DD-MM-YYYY hh:mm:ss')}
                    </Descriptions.Item> */}
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
export default ViewDetailLoaiSanPham;