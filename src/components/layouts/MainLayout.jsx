import React, { useEffect, useState } from "react";
import HeaderIndex from "./Header/HeaderIndex";
import { Notify } from "react-redux-notify";
import LatestFooter from "./Footer/LatestFooter";
import { connect } from "react-redux";
import { fetchUserDetailsStart } from "../../store/actions/UserAction";
import { useHistory } from 'react-router-dom';
import { AppBar, CssBaseline, Divider, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, makeStyles, Toolbar } from "@material-ui/core";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const MainLayout = (props) => {
  let history = useHistory();

  const [themeState, setThemeState] = useState(false);

  const toggleClass = () => {
    setThemeState(!themeState);
  };

  useEffect(() => {
    props.dispatch(fetchUserDetailsStart());
  }, []);

  useEffect(() => {
    if (!props.profile.loading && props.profile.data.is_email_verified === 0) {
      history.push('/register/verify');
    }
  }, [props.profile]);

  // const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const classes = useStyles();

  return (
    <div className={`${themeState ? "dark-mode" : ""}`} >
      <div className="app-admin-wrap layout-sidebar-large">
        <Notify position="TopRight" />
        <HeaderIndex toggleTheme={toggleClass} />
        <div className="main-content-wrap sidenav-open d-flex flex-column">
          <div className="main-wrap-sec">
            {React.cloneElement(props.children)}
          </div>
          <LatestFooter />
        </div>
      </div>
    </div>
  );
}

const mapStateToPros = (state) => ({
  profile: state.users.profile,
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(
  mapStateToPros, mapDispatchToProps
)(MainLayout);