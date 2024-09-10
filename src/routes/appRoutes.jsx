import HomePage from '../pages/home/HomePage';
import GridView from '@mui/icons-material/GridView';
import KeyboardDoubleArrowRight from '@mui/icons-material/KeyboardDoubleArrowRight';
import ProductPageLayout from '../pages/product/ProductPageLayout';
import ProductList from '../pages/product/ProductList';
import CreateUpdateProduct from '../pages/product/CreateUpdateProduct';
import DeleteProduct from '../pages/product/DeleteProduct';

const appRoutes = [
  {
    index: true,
    element: <HomePage />,
    state: 'home',
  },
  {
    path: '/product',
    element: <ProductPageLayout />,
    state: 'product',
    sidebarProps: {
      displayText: 'Products',
      icon: <GridView />,
    },
    child: [
      {
        path: '/product/manage',
        element: <ProductList />,
        state: 'product.list',
        sidebarProps: {
          displayText: 'All Products',
          icon: <KeyboardDoubleArrowRight />,
        },
      },
      {
        path: '/product/create',
        element: <CreateUpdateProduct />,
        state: 'product.create',
      },
      {
        path: '/product/update',
        element: <CreateUpdateProduct />,
        state: 'product.update',
      },
      {
        path: '/product/delete',
        element: <DeleteProduct />,
        state: 'product.update',
      },
    ],
  },
];

export default appRoutes;
