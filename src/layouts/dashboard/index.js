import React, { useState } from 'react';
import clsx from 'clsx';
import {
  makeStyles,
  useTheme,
  Collapse,
  Box,
  MenuItem,
  Badge,
  Avatar,
  withStyles,
  Menu,
  Drawer,
  AppBar,
  Toolbar,
  List,
  CssBaseline,
  Divider,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@material-ui/core';
//Icons
import CategoryOutlinedIcon from '@material-ui/icons/CategoryOutlined';
import DashboardOutlinedIcon from '@material-ui/icons/DashboardOutlined';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import NotificationsNoneOutlinedIcon from '@material-ui/icons/NotificationsNoneOutlined';
import MenuIcon from '@material-ui/icons/Menu';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import PeopleAltOutlinedIcon from '@material-ui/icons/PeopleAltOutlined';
import StorefrontOutlinedIcon from '@material-ui/icons/StorefrontOutlined';
import { useHistory } from 'react-router-dom';
// import WhiteLogo from "../../assets/logos/whiteLogo.svg";
import AvatarImg from '../../assets/avatar.png';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/reducers/auth';

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex'
  },
  appBar: {
    boxShadow: 'none',
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: 36
  },
  hide: {
    display: 'none'
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap'
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1
    }
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: theme.spacing(0, 1),
    height: 60,
    ...theme.mixins.toolbar
  },
  toolbar2: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#3f51b5',
    padding: theme.spacing(0, 1),
    height: 60
    // ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  }
}));

const Layout = ({ children }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const theme = useTheme();
  const [open, setOpen] = useState(true);
  const [collapseOpen, setCollapseOpen] = useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const openw = Boolean(anchorEl);
  const history = useHistory();
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosee = () => {
    setAnchorEl(null);
  };
  const [selectedIndex, setSelectedIndex] = useState('');
  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };
  const handleOpen = () => {
    setCollapseOpen(!collapseOpen);
  };
  const StyledMenuItem = withStyles((theme) => ({
    root: {}
  }))(MenuItem);
  const StyledMenu = withStyles({
    paper: {
      border: '1px solid #d3d4d5'
    }
  })((props) => (
    <Menu
      elevation={0}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center'
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center'
      }}
      {...props}
    />
  ));
  return (
    <div className={classes.root}>
      <AppBar
        id='appBar'
        position='fixed'
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open
        })}
      >
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            onClick={handleDrawerOpen}
            edge='start'
            className={clsx(classes.menuButton, {
              [classes.hide]: open
            })}
          >
            <MenuIcon />
          </IconButton>
          <Box>
            {/* <img
              src={WhiteLogo}
              alt="no-image"
              className={clsx(classes.menuButton, {
                [classes.hide]: open,
              })}
            /> */}
          </Box>
          <Box display='flex' marginLeft='auto'>
            <MenuItem aria-label='show 4 new mails' color='inherit'>
              <Badge>
                <NotificationsNoneOutlinedIcon />
              </Badge>
            </MenuItem>
            <MenuItem aria-label='show 11 new notifications' color='inherit'>
              <Badge>
                <SettingsOutlinedIcon />
              </Badge>
            </MenuItem>
            <IconButton
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleMenu}
              color='inherit'
            >
              <Avatar alt='Remy Sharp' src={AvatarImg} />
            </IconButton>
            <Menu
              id='menu-appbar'
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              open={openw}
              onClose={handleClosee}
            >
              <MenuItem onClick={handleClosee}>Profile</MenuItem>
              <MenuItem onClick={handleClosee}>My account</MenuItem>
              <MenuItem onClick={() => dispatch(logout())}>Logout</MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        variant='permanent'
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open
          })
        }}
      >
        <div className={classes.toolbar2}>
          <IconButton onClick={handleDrawerClose}>
            <MenuIcon />
          </IconButton>
          <Box>
            {/* <img src={WhiteLogo} alt="no-image" className="logo" /> */}
          </Box>
        </div>

        <Divider />
        <List
          component='nav'
          aria-label='main mailbox folders'
          className='listSidebar'
        >
          <ListItem
            button
            selected={
              selectedIndex === 0 || location.pathname === '/dashboard/main'
            }
            onClick={(event) => {
              handleListItemClick(event, 0);
              history.push('/dashboard/main');
            }}
          >
            <ListItemIcon>
              <DashboardOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary='Dashboard' />
          </ListItem>
          <ListItem
            button
            selected={
              selectedIndex === 1 || location.pathname === '/dashboard/test1'
            }
            // onClick={(event) => {
            //   handleListItemClick(event, 1);
            //   history.push('/dashboard/product');
            // }}
          >
            <ListItemIcon>
              <CategoryOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary='Menu item 1' />
          </ListItem>
          <ListItem button onClick={handleOpen}>
            <ListItemIcon>
              <SettingsOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary='Settings' />
            {collapseOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={collapseOpen} timeout='auto' unmountOnExit>
            <List component='div' disablePadding>
              <ListItem
                selected={
                  selectedIndex === 2 ||
                  location.pathname === '/dashboard/test2'
                }
                button
                className={classes.nested}
                onClick={(event) => {
                  handleListItemClick(event, 2);
                  history.push('/dashboard/test2');
                }}
              >
                <ListItemIcon>
                  <StorefrontOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary='drop down 1' />
              </ListItem>
            </List>
          </Collapse>
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  );
};
export default Layout;
