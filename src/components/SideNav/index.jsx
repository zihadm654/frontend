import * as React from 'react';
import { styled, useTheme } from '@material-ui/core/styles';
import MuiDrawer from "@material-ui/core/Drawer"
import CssBaseline from "@material-ui/core/CssBaseline"
import IconButton from "@material-ui/core/IconButton"
import Divider from "@material-ui/core/Divider"
import MuiAppBar from "@material-ui/core/AppBar"
import ToolBar from "@material-ui/core/Toolbar"
import Box from "@material-ui/core/Box"
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';
import ListItemIcon from '@material-ui/core/ListItemIcon';
// import LatestFooter from "../layouts/Footer/LatestFooter"
import { Link } from '@material-ui/core';
import HeaderIndex from "../layouts/Header/HeaderIndex"
import { Image } from 'react-bootstrap';
import './style.css'
// import LatestFooter from '../layouts/Footer/LatestFooter';
// import { useHistory } from 'react-router-dom';
// import { useEffect } from 'react';
// import { connect } from 'react-redux';
// import { fetchUserDetailsStart } from '../../store/actions/UserAction';

const drawerWidth = 80;

const openedMixin = (theme) => ({
   width: drawerWidth,
   transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
   }),
   overflowX: 'hidden',
});

const closedMixin = (theme) => ({
   transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
   }),
   overflowX: 'hidden',
   width: `calc(${theme.spacing(7)} + 1px)`,
   [theme.breakpoints.up('sm')]: {
      width: `calc(${theme.spacing(8)} + 1px)`,
   },
});

// const DrawerHeader = styled('div')(({ theme }) => ({
//    display: 'flex',
//    alignItems: 'center',
//    justifyContent: 'flex-end',
//    padding: theme.spacing(0, 1),
//    // necessary for content to be below app bar
//    ...theme.mixins.toolbar,
// }));

const AppBar = styled(MuiAppBar, {
   shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
   zIndex: theme.zIndex.drawer + 1,
   transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
   }),
   ...(open && {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
         easing: theme.transitions.easing.sharp,
         duration: theme.transitions.duration.enteringScreen,
      }),
   }),
   ...(!open && {
      marginLeft: 180,
      width: `calc(100% - ${180}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
         easing: theme.transitions.easing.sharp,
         duration: theme.transitions.duration.enteringScreen,
      }),
   }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
   ({ theme, open }) => ({
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
      boxSizing: 'border-box',
      background: 'rgb(248,249,250)',
      ...(open && {
         ...openedMixin(theme),
         '& .MuiDrawer-paper': openedMixin(theme),
      }),
      ...(!open && {
         ...closedMixin(theme),
         '& .MuiDrawer-paper': closedMixin(theme),
      }),
   }),
);

function MiniDrawer(props) {
   const [open, setOpen] = React.useState(false);

   const handleDrawerOpen = () => {
      open ? setOpen(prev => !prev) : setOpen(prev => !prev)
   };
   const theme = useTheme();
   // const toggleClass = () => {
   //    setThemeState(!themeState);
   //  };
   return (
      <Box sx={{ display: 'flex' }}>
         <CssBaseline />
         <AppBar position="fixed" open={open}>
            {/* <ToolBar>
               <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={handleDrawerOpen}
                  edge="start"
                  sx={{
                     marginRight: 5,
                     backgroundColor: '#333',
                     ...(open && { display: 'none' }),
                  }}
               >
                  <i className="fas fa-bars"></i>
               </IconButton>
            </ToolBar> */}
            <HeaderIndex handleDrawerOpen={handleDrawerOpen} />
         </AppBar>
         <Drawer variant="permanent" open={open} className="sidenav__drawer">
            {/* <DrawerHeader>
               <IconButton onClick={handleDrawerOpen}>
                  {theme.direction === 'rtl' ? "menu" : "close"}
                  <i className='fas fa-xmark'></i>
               </IconButton>
            </DrawerHeader>
            <Divider /> */}
            <div className="sidebar__img">
               <Image src={!open ? '/assets/images/logo/Logo PNG.png' : '/assets/images/logo/App logo-01.png'} alt="logo" className="sidebar__logo" />
            </div>
            <Divider />
            <List disablePadding className="sidenav__links">
               <Button sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
               }}>
                  <Link href="/home">
                     <ListItemIcon
                        sx={{
                           minWidth: 0,
                           mr: open ? 3 : 'auto',
                        }}
                        className="link"
                     >
                        <i className='fas fa-home'></i>
                     </ListItemIcon>
                     {!open ?
                        <ListItemText primary={"Home"} sx={{ opacity: open ? 1 : 0 }} /> : null}
                  </Link>
               </Button>
               <Button
                  sx={{
                     minHeight: 48,
                     justifyContent: open ? 'initial' : 'center',
                     px: 2.5,
                  }}
               >
                  <Link href="/explore">
                     <ListItemIcon
                        sx={{
                           minWidth: 0,
                           mr: open ? 3 : 'auto',
                           justifyContent: 'center',
                           display: 'flex',
                           alignItems: 'center',
                           padding: '1.5rem'
                        }}
                        className="link"
                     >
                        <i className='fas fa-compass'></i>
                     </ListItemIcon>
                     {!open ?
                        <ListItemText primary={"Explore"} sx={{ opacity: open ? 1 : 0 }} /> : null}
                  </Link>
               </Button>
               <Button
                  sx={{
                     minHeight: 48,
                     justifyContent: open ? 'initial' : 'center',
                     px: 2.5,
                  }}
               >
                  <Link href="/live-tv">
                     <ListItemIcon
                        sx={{
                           minWidth: 0,
                           mr: open ? 3 : 'auto',
                           justifyContent: 'center',
                           display: 'flex',
                           alignItems: 'center'
                        }}
                        className="link"
                     >
                        <i className='fas fa-tv'></i>
                     </ListItemIcon>
                     {!open ?
                        <ListItemText primary={"Live Tv"} sx={{ opacity: open ? 1 : 0 }} /> : null}
                  </Link>
               </Button>
               <Button
                  sx={{
                     minHeight: 48,
                     justifyContent: open ? 'initial' : 'center',
                     px: 2.5,
                  }}
               >
                  <Link href="/notification">
                     <ListItemIcon
                        sx={{
                           minWidth: 0,
                           mr: open ? 3 : 'auto',
                           justifyContent: 'center',
                           display: 'flex',
                           alignItems: 'center'
                        }}
                        className="link"
                     >
                        <i className='fas fa-bell'></i>
                     </ListItemIcon>
                     {!open ? <ListItemText primary={"Notification"} sx={{ opacity: open ? 1 : 0 }} /> : null}
                  </Link>
               </Button>
            </List>
            <Divider />
         </Drawer>
         <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            {/* <DrawerHeader /> */}
            {/* <HeaderIndex /> */}
            {/* <div className="main-content-wrap sidenav-open d-flex flex-column">
               <div className="main-wrap-sec">
                  {React.cloneElement(props.children)}
               </div>
               <LatestFooter />
            </div> */}
         </Box>
      </Box >
   );
}
export default MiniDrawer
// const mapStateToPros = (state) => ({
//    profile: state.users.profile,
// });

// function mapDispatchToProps(dispatch) {
//    return { dispatch };
// }
// export default connect(
//    mapStateToPros,
//    mapDispatchToProps
// )(MiniDrawer);