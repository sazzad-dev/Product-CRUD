import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import axios from 'axios';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const DeleteProduct = () => {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();

  const location = useLocation();
  const { product } = location?.state || {};
  const token = localStorage.getItem('token');

  const handleClose = () => {
    setIsOpen(false);
    navigate('/product/manage');
  };

  const deleteProduct = async () => {
    try {
      const response = await axios.delete(
        `https://hotel.aotrek.net/api/auth/delete/${product?.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response?.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Product deleted!',
          text: 'Your product has been successfully deleted.',
          showConfirmButton: true,
        });
        navigate('/product/manage');
        setIsOpen(false);
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
        text: `${er.message}`,
      });
    }
  };

  const handleDelete = (e) => {
    e.preventDefault();
    deleteProduct();
  };

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle>Delete Product</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete <b>{product.name}</b>?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant='outlined' color='grey[500]'>
          Cancel
        </Button>
        <Button onClick={handleDelete} variant='contained' color='error'>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default DeleteProduct;
