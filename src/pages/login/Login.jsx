import { Box, Button } from '@mui/material';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleLoginInfoChange = (e) => {
    e?.preventDefault();
    const { name, value } = e?.target;
    setLoginInfo({
      ...loginInfo,
      [name]: value,
    });
  };

  const submitFormData = async () => {
    try {
      const data = {
        ...loginInfo,
      };
      const response = await axios.post(
        'https://hotel.aotrek.net/api/auth/login',
        data
      );
      if (response?.status === 200) {
        localStorage.setItem('token', response?.data?.user?.token);
        navigate('/product/manage');
      }
    } catch (er) {
      // console.log('error', er);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    submitFormData();
  };

  return (
    <Box
      sx={{
        bgcolor: '#bcbcbc',
        height: '100vh',
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          top: '400px',
          left: '600px',
          fontSize: '1.3rem',
          fontWeight: '500',
        }}
      >
        <Box mb={2} sx={{ display: 'flex', columnGap: '70px' }}>
          <label htmlFor='email'>Email</label>
          <input
            id='email'
            type='text'
            name='email'
            value={loginInfo?.email}
            placeholder='Enter email'
            onChange={handleLoginInfoChange}
            style={{
              width: '220px',
            }}
          />
        </Box>
        <Box mb={2} sx={{ display: 'flex', columnGap: '30px' }}>
          <label htmlFor='password'>Password</label>
          <input
            id='password'
            type='password'
            name='password'
            value={loginInfo?.password}
            placeholder='Enter password'
            onChange={handleLoginInfoChange}
            style={{
              width: '220px',
            }}
          />
        </Box>
        <Button
          variant='contained'
          size='small'
          color='primary'
          type='submit'
          sx={{
            width: '80px',
            alignItems: 'center',
          }}
        >
          Login
        </Button>
      </form>
    </Box>
  );
};

export default Login;
