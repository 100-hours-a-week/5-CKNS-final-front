import {Image, Space} from "antd";
import {
    CameraFilled,
    RotateLeftOutlined,
    RotateRightOutlined,
    SwapOutlined, UndoOutlined,
    ZoomInOutlined,
    ZoomOutOutlined
} from "@ant-design/icons";
import React, {useState} from "react";
import axiosInstance from "../../utils/axiosInstance";
import axios from "axios";
import styled from "styled-components";


const ProfileImageComponent = ({profileImagePath}) => {
    const [showConfirmModal,setShowConfirmModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    const handleImageChange = (event) => {
        const image = event.target.files[0];
        if (image) {
            setSelectedImage(image);
            setPreviewUrl(URL.createObjectURL(image));
        }
    };


    const handleImageUpload = async (event) => {
        if (!selectedImage) {
            alert("Please select a image to upload.");
            return;
        }

        try {
            const preSignedUrl = await getPreSignedUrl(selectedImage.name);
            if (preSignedUrl) {
                await uploadImage(preSignedUrl, selectedImage);
                setShowConfirmModal(false); // Close the modal after successful upload
                setSelectedImage(null); // Reset the file state
                setPreviewUrl(null);
                window.location.reload(); // Reload to update the profile image
            }
        } catch (error) {
            console.error('Error during image upload:', error);
            alert('An error occurred during the image upload.');
        }
    };

    const getPreSignedUrl = async (fileName) => {
        try {
            const response = await axiosInstance.get(`/api/user/profile/preSignedUrl/${fileName}`);
            return response.data.data; // Assuming the pre-signed URL is in `data`
        } catch (error) {
            console.error('Error fetching pre-signed URL:', error);
            alert('Failed to fetch the pre-signed URL.');
            throw error; // Re-throw the error to be caught in the calling function
        }
    };

    const uploadImage = async (preSignedUrl, file) => {
        try {
            const response = await axios.put(preSignedUrl, file, {
                headers: {
                    'Content-Type': file.type, // Set the content type of the file
                },
            });

            if (response.status === 200) {
                // console.log('Image uploaded successfully');
                window.location.reload();
            } else {
                throw new Error(`Upload failed with status: ${response.status}`);
            }
        } catch (error) {
            console.error('Error uploading image:', error);
            alert('An error occurred while uploading the image.');
            throw error; // Re-throw the error to handle it if needed in the calling function
        }
    };

    return (
        <ContentBox>
            <ProfileImageCropper>
            {showConfirmModal && (
                <ModalOverlay onClick={() => {
                    setPreviewUrl(null);
                    setSelectedImage(null);
                    setShowConfirmModal(false);
                }}>
                    <ModalContainer onClick={(e) => e.stopPropagation()}>
                        <ModalTitle>프로필 사진 변경</ModalTitle>
                        <label htmlFor="imageInput">
                            <ThumbnailWrapper>
                                <ThumbnailImage src={previewUrl? previewUrl : profileImagePath? profileImagePath : "https://placehold.co/200x200?text=?" } alt="Selected thumbnail" />
                            </ThumbnailWrapper>
                        </label>
                        <ModalMessage>
                            <input id="imageInput" type="file" onChange={handleImageChange} style={{ display: 'none' }} />
                        </ModalMessage>
                        <SubmitButton onClick={handleImageUpload} disabled={!selectedImage}>
                            Upload Image
                        </SubmitButton>
                    </ModalContainer>
                </ModalOverlay>
            )}
        <Image
            width={200}
            height={200}
            src={profileImagePath} alt="프로필 이미지"
            preview={{mask: <></>,
                toolbarRender : (
                    __,
                    {
                        image: {url},
                        transform : {scale},
                        actions : {onFlipY,onFlipX,onRotateRight,onRotateLeft,onZoomIn,onZoomOut,onReset},
                    }
                ) => (
                    <ToolbarWrapper>
                        <Space size={12} className="toolbar-wrapper">
                            <SwapOutlined rotate={90} onClick={onFlipY} />
                            <SwapOutlined onClick={onFlipX} />
                            <RotateLeftOutlined onClick={onRotateLeft} />
                            <RotateRightOutlined onClick={onRotateRight} />
                            <ZoomOutOutlined disabled={scale === 1} onClick={onZoomOut} />
                            <ZoomInOutlined disabled={scale === 50} onClick={onZoomIn} />
                            <UndoOutlined onClick={onReset} />
                        </Space>
                    </ToolbarWrapper>
                )
            }}
            placeholder={
                <Image
                    width={200}
                    height={200}
                    src={"https://placehold.co/200x200?text=?"}
                    alt = "default"
                />
            }
            fallback={"https://placehold.co/200x200?text=?"}
        />
        </ProfileImageCropper>
        <ImageChangeButton>
            <CameraFilled onClick={()=>{setShowConfirmModal(true)}} />
        </ImageChangeButton>
        </ContentBox>
    )
}

const ContentBox = styled.div`
    width: 200px;
    height: 200px;
    margin-top: 40px;
    position: relative;
`

const ProfileImageCropper = styled.div`
    width: 200px;
    height: 200px;
    position: relative;
    overflow: hidden;
    border-radius: 50%;
`


const ToolbarWrapper = styled.div`
  position: fixed;
  bottom: 32px;
  inset-inline-start: 50%;
  padding: 0px 24px;
  color: #fff;
  font-size: 20px;
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 100px;
  transform: translateX(-50%);
  
  .anticon {
    padding: 12px;
    cursor: pointer;

    &[disabled] {
      cursor: not-allowed;
      opacity: 0.3;
    }

    &:hover {
      opacity: 0.3;
    }
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  text-align: center;
  position: relative;
  max-width: 800px;
`;
const ModalTitle = styled.h1`
  font-size: 18px;
    font-weight: bold;
  margin-top: 10px;
  margin-bottom: 20px;
  color: #333;
`;

const ModalMessage = styled.p`
  font-size: 16px;
  color: #555;
  margin-bottom: 20px;
  line-height: 1.5;
`;

const SubmitButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  color: white;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const ThumbnailWrapper = styled.div`
  margin: 10px 0;
`;

const ThumbnailImage = styled.img`
  max-width: 300px;
  max-height: 300px;
  border-radius: 5px;
    box-shadow: 10px 1px 10px rgba(0, 0, 0, 0.3);
  object-fit: cover;
    
    &:hover{
        filter: brightness(90%);
        //filter: grayscale(1.0);
        //scale: 150%;
        //transition: filter 0.5s;
        
    }
`;

const ImageChangeButton = styled.div`
    position: absolute;
    bottom: 15px;
    right: 15px; 
    background-color: lightgray;
    width: 40px;
    height: 40px;
    border-radius: 50%; /* Make the button round */
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover {
        filter: brightness(90%);
    }
    
`
export default ProfileImageComponent