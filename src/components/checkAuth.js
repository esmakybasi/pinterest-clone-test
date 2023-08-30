import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CheckAuth = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // isLoggedIn anahtarını localStorage'den alın
    const isLoggedIn = localStorage.getItem('isLoggedIn');

    if (!isLoggedIn) {
      // login sayfasına yönlendir
      navigate("/login")
    }
  }, []);

  return null;
};

export default CheckAuth;
