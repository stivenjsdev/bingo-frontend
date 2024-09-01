import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "../components/Header";

const Layout = () => {
  const navigate = useNavigate();
  useEffect(() => {
    fetch('http://localhost:4000/api/auth/user', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('AUTH_TOKEN')}`
      }
    })
    .then(response => {
      if (response.status === 200) {
        return response.json()
      }
      throw new Error('Unauthorized');
    })
    .then(data => {
      console.log(data);
    })
    .catch(error => {
      console.error('Error:', error);
      navigate('/auth/login');
    });
  
    
  }, [])
  
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;

