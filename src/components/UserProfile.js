import React, { useState, useRef } from 'react';
import Layout from './layout';
import styled from 'styled-components';
import CheckAuth from './checkAuth';
import axios from 'axios';

const UserProfileWrapper = styled.div`
  text-align: center;
  margin: 20px;
`;

const ProfileImage = styled.img`
  width: 200px;
  height: auto;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 10px;
`;

const ProfileUsername = styled.h2`
  font-size: 24px;
  margin-bottom: 10px;
`;

const ProfileBio = styled.p`
  font-size: 16px;
  margin-bottom: 20px;
`;

const PinsWrapper = styled.div`
  margin-bottom: 20px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
`;

const Pin = styled.div`
  margin: 10px;
`;

const PinImage = styled.img`
  width: 200px;
  height: auto;
  margin-bottom: 10px;
  border-radius: 5%;
`;

const SavedPostsWrapper = styled.div`
  margin-bottom: 20px;
`;

const SavedPost = styled.div`
  margin: 10px;
  cursor: pointer;
`;

const SavedPostImage = styled.img`
  width: 200px;
  height: auto;
  margin-bottom: 10px;
  border-radius: 10%;
`;

const EditableFolderName = styled.input`
  border: none;
  background: none;
  font-size: 16px;
  padding: 5px;
  margin-bottom: 5px;
`;

const UserProfile = () => {
  const apiURL = process.env.REACT_APP_API_URL;
  const [editedFolderName, setEditedFolderName] = useState('');
  const [isEditingFolderName, setIsEditingFolderName] = useState(false);
  const fileInputRef = useRef(null);
  const [imgSrc, setImgSrc] = useState("");


  const [userInfo, setUserInfo] = useState();
    axios.get(`${apiURL}/userInfo/esmakoybasi` )
      .then((response) => {
        // Kayıt işlemi başarılı
       const responseData = response.data;
       setUserInfo(responseData.data)

      })
      .catch((error) => {
        console.log('Kayıt olurken bir hata oluştu:', error);
      });

  


  const handleFileSelect = () => {
    fileInputRef.current.click(); // kulanıcı bir dosya seçti
    
    if(fileInputRef.current.files.length === 1){ //eğer kullanıcı bir dosya gerçekten seçmiş ise files.length 1 olur bunu kontrol eder.
      const file = fileInputRef.current.files[0];
      setImgSrc(URL.createObjectURL(file));
    }
   
    console.log("bbb",fileInputRef.current.files);
    console.log("bbb",fileInputRef.current.files.length);
  };

  const handleFileUpload = async (event) => {
    const selectedFile = fileInputRef.current.files[0];
    
    if (selectedFile) {
      const formData = new FormData();
        formData.append('profileImage', selectedFile);
  
     axios.post('http://localhost:3050/upload', formData).then((result) => {

     console.log("result", result)

     }).catch((error)=>{
      console.error("fileUpload Error", error)
     })
        
        
    }
  };
  
  

  const handleFolderNameEdit = (event, postId) => {
    const updatedSavedPosts = userInfo.savedPosts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          title: editedFolderName
        };
      }
      return post;
    });

    userInfo.savedPosts = updatedSavedPosts;
    setEditedFolderName('');
    setIsEditingFolderName(false);
  };

  return (
    <Layout>
      <CheckAuth />

      <UserProfileWrapper>
        {userInfo ? (
          <>
            <ProfileImage src={userInfo.avatar} alt="" />
            <ProfileUsername>{userInfo.username}</ProfileUsername>
            <ProfileBio>{userInfo.bio}</ProfileBio>
            <div>
              <input
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                ref={fileInputRef}
                onChange={handleFileSelect}
              />
      
              {imgSrc && (
                // eslint-disable-next-line jsx-a11y/img-redundant-alt
                <img
                  src={imgSrc}
                  alt="Selected Image"
                  style={{
                    width: "200px",
                    marginBottom: "10px",
                    borderRadius: "5%",
                  }}
                />
              )}
      
              <button onClick={handleFileSelect}>Fotoğraf Seç</button>
              <button onClick={handleFileUpload}>Yükle</button>
            </div>
            <h3>Pinler</h3>
            <PinsWrapper>
              {userInfo.pins.map((pin) => (
                <Pin key={pin.id}>
                  <PinImage src={pin.image} alt={pin.title} />
                  <p>{pin.title}</p>
                </Pin>
              ))}
            </PinsWrapper>
            <h3>Kaydedilen Gönderiler</h3>
            <SavedPostsWrapper>
              {userInfo.savedPosts.map((post) => (
                <SavedPost
                  key={post.id}
                  onClick={() => setIsEditingFolderName(post.id)}
                >
                  {isEditingFolderName === post.id ? (
                    <>
                      <EditableFolderName
                        type="text"
                        value={editedFolderName}
                        onChange={(e) => setEditedFolderName(e.target.value)}
                        onBlur={(e) => handleFolderNameEdit(e, post.id)}
                        autoFocus
                      />
                    </>
                  ) : (
                    <>
                      <SavedPostImage src={post.image} alt={post.title} />
                      <p>{post.title}</p>
                    </>
                  )}
                </SavedPost>
              ))}
            </SavedPostsWrapper>
          </>
        ) : (
          <p>Veri yok</p>
        )}
      </UserProfileWrapper>
      
    </Layout>
  );
};

export default UserProfile;
