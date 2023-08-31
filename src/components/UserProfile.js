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
  const [editedFolderName, setEditedFolderName] = useState('');
  const [isEditingFolderName, setIsEditingFolderName] = useState(false);
  const fileInputRef = useRef(null);
  const [imgSrc, setImgSrc] = useState("");


  const [user, setUser] = useState({
  username: 'esmakoybasi',
  bio: 'Biyografi...',
  avatar: '/img/pp.jpg',
  pins: [
    { id: 1, title: '', image: '/img/bg.jpg' },
    { id: 2, title: '', image: '/img/ee.jpg' },
    // ...
  ],
  savedPosts: [
    { id: 1, title: 'Kaydedilen Gönderi Başlık 1', image: '/img/m.jpg' },
    { id: 2, title: 'Kaydedilen Gönderi Başlık 2', image: '/img/m.jpg' },
    // ...
  ]
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
        formData.append('file', selectedFile);
  
        const response = await axios.post('http://localhost:3000', formData);
        console.log("response", response);
        
    }
  };
  
  

  const handleFolderNameEdit = (event, postId) => {
    const updatedSavedPosts = user.savedPosts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          title: editedFolderName
        };
      }
      return post;
    });

    user.savedPosts = updatedSavedPosts;
    setEditedFolderName('');
    setIsEditingFolderName(false);
  };

  return (
    <Layout>
      <CheckAuth />
      <UserProfileWrapper>
        <ProfileImage src={user.avatar} alt="" />
        <ProfileUsername>{user.username}</ProfileUsername>
        <ProfileBio>{user.bio}</ProfileBio>
        <div>
         <input
           type="file"
           accept="image/*"
           style={{ display: "none" }}
           ref={fileInputRef}
           onChange={handleFileSelect}
         />
         
         {imgSrc && (
           <img
             src={imgSrc}
             alt="Selected Image"
             style={{ width: '200px', marginBottom: '10px', borderRadius: '5%' }}
           />
         )}
         
          <button onClick={handleFileSelect}>Fotoğraf Seç</button>
          <button onClick={handleFileUpload}>Yükle</button>
        </div>
        <h3>Pinler</h3>
        <PinsWrapper>
          {user.pins.map(pin => (
            <Pin key={pin.id}>
              <PinImage src={pin.image} alt={pin.title} />
              <p>{pin.title}</p>
            </Pin>
          ))}
        </PinsWrapper>
        <h3>Kaydedilen Gönderiler</h3>
        <SavedPostsWrapper>
          {user.savedPosts.map(post => (
            <SavedPost key={post.id} onClick={() => setIsEditingFolderName(post.id)}>
              {isEditingFolderName === post.id ? (
                <>
                  <EditableFolderName
                    type="text"
                    value={editedFolderName}
                    onChange={e => setEditedFolderName(e.target.value)}
                    onBlur={e => handleFolderNameEdit(e, post.id)}
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
      </UserProfileWrapper>
    </Layout>
  );
};

export default UserProfile;
