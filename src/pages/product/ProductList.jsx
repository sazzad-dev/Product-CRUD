import React, { useCallback, useEffect, useState } from 'react';
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  IconButton,
  Box,
  DialogActions,
  Stack,
  LinearProgress,
} from '@mui/material';
import { Edit, Delete, Add } from '@mui/icons-material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Topbar from '../../components/common/Topbar';

const ProductList = () => {
  const [products, setProducts] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleCreateUpdateProduct = (type, product) => {
    if (type === 'CREATE') {
      navigate('/product/create');
    } else {
      navigate('/product/update', { state: { type, product } });
    }
  };

  const handleDeleteProduct = (product) => {
    navigate('/product/delete', { state: { product } });
  };

  const getProductList = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        'https://hotel.aotrek.net/api/auth/manage',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response?.data?.success === true) {
        setProducts(response?.data?.categories);
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  useEffect(() => {
    getProductList();
  }, [getProductList]);

  return (
    <Container maxWidth='auto'>
      <Topbar title='Product List' />
      <Box
        sx={{
          backgroundColor: 'white',
          border: '1px solid',
          borderColor: 'grey.300',
          padding: '8px 16px 30px 16px',
          borderRadius: '4px',
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Box mb={2}>
          <DialogActions>
            <Button
              variant='contained'
              color='primary'
              onClick={() => handleCreateUpdateProduct('CREATE')}
            >
              <Add /> Create Product
            </Button>
          </DialogActions>
        </Box>

        <TableContainer component={Paper} sx={{ width: '100%' }}>
          <Table size='small'>
            <TableHead>
              <TableRow>
                <TableCell align='center' sx={{ fontWeight: 'bold' }}>
                  Product Name
                </TableCell>
                <TableCell align='center' sx={{ fontWeight: 'bold' }}>
                  Product Title
                </TableCell>
                <TableCell align='center' sx={{ fontWeight: 'bold' }}>
                  Description
                </TableCell>
                <TableCell align='center' sx={{ fontWeight: 'bold' }}>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            {isLoading ? (
              <Stack
                sx={{
                  width: '50%',
                  height: '250px',
                  color: 'grey.500',
                  position: 'relative',
                  top: '100px',
                  left: '350px',
                }}
              >
                Loading...
                <LinearProgress color='secondary' />
              </Stack>
            ) : (
              <TableBody>
                {products?.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell align='center'>{product.name}</TableCell>
                    <TableCell align='center'>{product.title}</TableCell>
                    <TableCell align='center'>{product.description}</TableCell>
                    <TableCell align='center'>
                      <IconButton
                        onClick={() =>
                          handleCreateUpdateProduct('EDIT', product)
                        }
                      >
                        <Edit color='success' />
                      </IconButton>
                      <IconButton onClick={() => handleDeleteProduct(product)}>
                        <Delete color='error' />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            )}
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
};

export default ProductList;
