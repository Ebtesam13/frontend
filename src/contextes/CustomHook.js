import { useState, useEffect } from 'react';

const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = () => {
      setIsLoggedIn(localStorage.getItem('accessToken') !== null);
    };

    // Initial check
    checkLoginStatus();

    // Add event listener for local storage changes
    window.addEventListener('storage', checkLoginStatus);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener('storage', checkLoginStatus);
    };
  }, []);

  const login = (token) => {
    localStorage.setItem('accessToken', token);
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    setIsLoggedIn(false);
  };

  return { isLoggedIn, login, logout };
};

export default useAuth;
