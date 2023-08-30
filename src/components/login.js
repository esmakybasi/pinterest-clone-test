import React, { useState } from 'react';
import Header from './header';
import axios from 'axios';
import validator from 'validator';

const LoginPage = () => {
  const apiURL = process.env.REACT_APP_API_URL;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const logoStyles = {
    width: '50px',
    height: '50px',
    marginBottom: '50px',
  };

  const inputStyles = {
    width: '100%',
    marginBottom: '10px',
    padding: '10px',
    borderRadius: '3px',
    border: '1px solid #ccc',
  };

  const formStyles = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    padding: '0 20px',
    boxSizing: 'border-box',
    maxWidth: '300px', // Maksimum genişlik 400 piksel
    margin: '0 auto', // Yatayda otomatik hizalama
  };

  const buttonStyles = {
    width: '100%',
    backgroundColor: 'transparent',
    color: '#c8232c',
    padding: '10px',
    borderRadius: '3px',
    border: '2px solid #c8232c',
    cursor: 'pointer',
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validator.isEmail(email)) {
      console.log('Geçerli bir e-posta adresi girin');
      return;
    }

    if (password.trim() === '') {
      console.log('Şifre alanı boş bırakılamaz');
      return;
    }

    // Giriş işlemini gerçekleştir
    axios
      .post(`${apiURL}/login`, { email, password })
      .then((response) => {
        // Giriş başarılı ise localStorage'e isLoggedIn anahtarını true olarak kaydedin
        localStorage.setItem('isLoggedIn', true);
        
      })
      .catch((error) => {
        alert('Giriş yaparken bir hata oluştu');
        console.log('Giriş yaparken bir hata oluştu:', error);
      });
  };

  return (
    <div >
    <Header/>
   
    <form style={formStyles} onSubmit={handleSubmit}>
      <img src="/img/Pinterest-logo.png" alt="Pinterest Logo" style={logoStyles} />
      <input
        type="email"
        placeholder="E-posta"
        style={inputStyles}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Şifre"
        style={inputStyles}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit" style={buttonStyles}>
        Giriş Yap
      </button>
    </form>
    </div>
  );
};

export default LoginPage;
