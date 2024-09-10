import { Box, Button, CardHeader } from '@mui/material';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Topbar from '../../components/common/Topbar';
import axios from 'axios';
import Swal from 'sweetalert2';

const CreateUpdateProduct = () => {
  const [productInfo, setProductInfo] = useState({
    name: '',
    title: '',
    description: '',
  });
  const navigate = useNavigate();
  const location = useLocation();
  const { type, product } = location?.state || {};
  const token = localStorage.getItem('token');

  const handleProduct = (e) => {
    e?.preventDefault();
    const { name, value } = e?.target;
    setProductInfo({
      ...productInfo,
      [name]: value,
    });
  };
  const createProduct = async () => {
    try {
      const data = {
        ...productInfo,
      };
      const response = await axios.post(
        'https://hotel.aotrek.net/api/auth/create',
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response?.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Product created!',
          text: 'Your product has been successfully created.',
          showConfirmButton: true,
        });
        navigate('/product/manage');
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Failed to create product.',
        });
      }
    } catch (er) {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: `${er?.message}`,
      });
    }
  };
  const updateProduct = async () => {
    try {
      const data = {
        name: productInfo?.name || product?.name,
        title: productInfo?.title || product?.title,
        description: productInfo?.description || product?.description,
      };
      const response = await axios.put(
        `https://hotel.aotrek.net/api/auth/update/${product?.id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response?.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Product updated!',
          text: 'Your product has been successfully updated.',
          showConfirmButton: true,
        });
        navigate('/product/manage');
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Failed to update product.',
        });
      }
    } catch (er) {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: `${er?.message}`,
      });
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    type === 'EDIT' ? updateProduct() : createProduct();
  };

  return (
    <>
      <Topbar
        title={type === 'EDIT' ? 'Update product' : 'Create new product'}
      />
      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '400px',
          position: 'relative',
          // top: '20px',
          left: '450px',
          fontSize: '1.2rem',
          fontWeight: '500',
          backgroundColor: '#f4f4f4',
          border: '2px solid #eaebef',
          padding: '8px 16px 30px 16px',
          borderRadius: '4px',
          boxShadow: '0px 0px 4px rgb(170,170,170)',
        }}
      >
        <Box mb={2} sx={{ display: 'flex', columnGap: '70px' }}>
          <label htmlFor='name'>Name</label>
          <input
            id='name'
            type='text'
            name='name'
            value={productInfo?.name || product?.name}
            placeholder='Enter product name'
            onChange={handleProduct}
            style={{
              width: '220px',
              height: '33px',
            }}
          />
        </Box>
        <Box mb={2} sx={{ display: 'flex', columnGap: '85px' }}>
          <label htmlFor='title'>Title</label>
          <input
            id='title'
            type='text'
            name='title'
            value={productInfo?.title || product?.title}
            placeholder='Enter product title'
            onChange={handleProduct}
            style={{
              width: '220px',
              height: '33px',
            }}
          />
        </Box>
        <Box mb={2} sx={{ display: 'flex', columnGap: '25px' }}>
          <label htmlFor='description'>Description</label>
          <textarea
            id='description'
            type='area'
            name='description'
            value={productInfo?.description || product?.description}
            placeholder='Enter product description'
            onChange={handleProduct}
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
            justifyItems: 'right',
          }}
        >
          {type === 'EDIT' ? 'Update' : 'Create'}
        </Button>
      </form>
    </>
  );
};
export default CreateUpdateProduct;
