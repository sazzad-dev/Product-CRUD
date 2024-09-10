import { ListItemButton, ListItemIcon } from '@mui/material';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import colorConfigs from '../../configs/colorConfigs';

const SidebarItem = ({ item }) => {
  const { appState } = useSelector((state) => state.appState);

  return item.sidebarProps && item.path ? (
    <ListItemButton
      component={Link}
      to={item.path}
      sx={{
        '&: hover': {
          backgroundColor:
            appState === item.state
              ? colorConfigs.sidebar.activeHoverBg
              : colorConfigs.sidebar.hoverBg,
        },
        backgroundColor:
          appState === item.state ? colorConfigs.sidebar.activeBg : 'unset',
        paddingY: '8px',
        paddingX: '12px',
        marginX: '50px',

        color:
          appState === item.state ? colorConfigs.sidebar.activeColor : 'unset',
      }}
    >
      <ListItemIcon
        sx={{
          color:
            appState === item.state
              ? colorConfigs.sidebar.activeColor
              : colorConfigs.sidebar.color,
        }}
      >
        {item.sidebarProps.icon && item.sidebarProps.icon}
      </ListItemIcon>
      {item.sidebarProps.displayText}
    </ListItemButton>
  ) : null;
};

export default SidebarItem;
