import React, { useState } from 'react';
import validator from 'validator';
import axios from 'axios';
import Layout from './layout';

axios.defaults.withCredentials = true;

export default function UserRegister() {
  const apiURL = process.env.REACT_APP_API_URL;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const pageStyles = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
  };

  const formContainerStyles = {
    width: '300px',
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '5px',
    textAlign: 'center',
  };
  const logoStyles = {
    width: '60px',
    height: '60px',
    marginBottom: '40px',
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
    alignItems: 'center',
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

    if (password.trim().length < 8) {
      console.log('Şifre en az 8 karakter olmalıdır');
      return;
    }

    axios
      .post(`${apiURL}/userRegister`, { name, email, password })
      .then((response) => {
        // Kayıt işlemi başarılı
      })
      .catch((error) => {
        console.log('Kayıt olurken bir hata oluştu:', error);
      });
  };

  return (
    <Layout>
      <div style={pageStyles}>
        <div style={formContainerStyles}>
          <img src="/img/Pinterest-logo.png" alt="Pinterest Logo" style={logoStyles} />
          <h2>Kayıt Ol</h2>
          <form style={formStyles} onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Ad Soyad"
              style={inputStyles}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
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
              Kayıt Ol
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}
