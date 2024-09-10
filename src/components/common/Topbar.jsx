import { AppBar, Toolbar, Typography } from '@mui/material';
import colorConfigs from '../../configs/colorConfigs';
import sizeConfigs from '../../configs/sizeConfigs';

const Topbar = ({ title }) => {
  return (
    <AppBar
      position='fixed'
      sx={{
        maxWidth: 'auto',
        // width: `calc(100% - ${sizeConfigs.sidebar.width} )`,
        ml: sizeConfigs.sidebar.width,
        boxShadow: '1px',
        borderRadius: '5px',
        backgroundColor: colorConfigs.topbar.bg,
        color: colorConfigs.topbar.color,
        top: '10px',
        left: '50px',
        right: '20px',
        height: '50px',
        justifyContent: 'center',
        // padding: "8px 16px",
      }}
    >
      <Toolbar>
        <Typography variant='h6'>{title}</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
