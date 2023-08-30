import React from 'react';
import { Link } from 'react-router-dom';

export default function Header({ isLoggedIn, notifications }) {
  const homePageStyles = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 20px', // Sayfa sağında ve solunda boşluk bırakmak için
  };

  const linkContainerStyles = {
    display: 'flex',
    gap: '10px',
    marginLeft: 'auto',
  };

  const logoStyles = {
    display: 'flex',
    alignItems: 'center',
  };

  const logoTextStyles = {
    color: '#c8232c',
    fontSize: '24px',
    fontFamily: 'latin',
    marginLeft: '10px',
  };

  const linkStyles = {
    color: '#000', // Link metinlerinin siyah renkte olmasını sağlar
    padding: '5px 10px', // Linklere boşluk vermek için
  };

  const loginBoxStyles = {
    border: '1px solid #ccc',
    backgroundColor: '#c8232c',
    borderRadius: '20px', // Giriş yap kutusuna border radius uygular
    padding: '5px 10px', // Giriş yap kutusuna boşluk vermek için
    marginRight: '5px', // Giriş yap kutusunun sağ tarafında boşluk bırakır
  };

  const registerBoxStyles = {
    border: '1px solid #ccc',
    borderRadius: '20px', // Kayıt ol kutusuna border radius uygular
    padding: '5px 10px', // Kayıt ol kutusuna boşluk vermek için
  };

  return (
    <div style={homePageStyles}> {/* Burada HomePage yerine div kullanılıyor */}
      <div className="logo" style={logoStyles}>
        <img src="/img/Pinterest-logo.png" alt="" style={{...logoStyles, ...{width: '50px', height: '50px'}}} />
        <h1 style={logoTextStyles}>Pinterest Clone</h1>
      </div>
      <div className="nav-links" style={linkContainerStyles}>
        <Link to="/about" style={linkStyles}>Hakkında</Link>
        <Link to="/blog" style={linkStyles}>Blog</Link>
        {isLoggedIn ? (
          <>
            <div style={loginBoxStyles}>
              <Link to="/notifications" style={linkStyles}>Bildirimler ({notifications.length})</Link>
            </div>
            <div style={loginBoxStyles}>
              <Link to="/logout" style={linkStyles}>Çıkış Yap</Link>
            </div>
          </>
        ) : (
          <>
            <div style={loginBoxStyles}>
              <Link to="/login" style={linkStyles}>Giriş Yap</Link>
            </div>
            <div style={registerBoxStyles}>
              <Link to="/register" style={linkStyles}>Kayıt Ol</Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
