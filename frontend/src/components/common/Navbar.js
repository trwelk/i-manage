import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import { alpha, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Badge from '@material-ui/core/Badge';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import logo from '../../assets/Logo.png';
import Button from '@material-ui/core/Button';
import { Link, useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: 20
  },
  sectionDesktop: {
    display: 'none',
    marginLeft: 'auto',
    marginRight: 0,
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    }
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  // search: {
  //   position: 'relative',
  //   borderRadius: theme.shape.borderRadius,
  //   backgroundColor: alpha(theme.palette.common.white, 0.15),
  //   '&:hover': {
  //     backgroundColor: alpha(theme.palette.common.white, 0.25),
  //   },
  //   marginLeft: 'auto',
  //   marginRight: 0,
  //   [theme.breakpoints.up('md')]: {
  //     marginRight: theme.spacing(0),
  //     width: 'auto',
  //     display: 'flex'
  //   },
  // },
  // searchIcon: {
  //   padding: theme.spacing(0, 2),
  //   height: '100%',
  //   position: 'absolute',
  //   pointerEvents: 'none',
  //   display: 'flex',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
  // inputRoot: {
  //   color: 'inherit',
  // },
  // inputInput: {
  //   padding: theme.spacing(2, 2, 2, 0),
  //   // vertical padding + font size from searchIcon
  //   paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
  //   transition: theme.transitions.create('width'),
  //   width: '100%',
  //   [theme.breakpoints.up('sm')]: {
  //     width: '40ch',
  //     '&:focus': {
  //       width: '40ch',
  //     },
  //   },
  // },
  logo: {
    maxWidth:70,
    padding: 10
  },
  navbutton: {
      fontSize: 20
  },
  link: {
    textDecoration: 'none',
    '&:visited': {
      color: theme.palette.primary.contrastText
    }
  },
  userMenu: {
    backgroundColor: theme.palette.secondary.main,
    '&:hover': {
      backgroundColor: theme.palette.secondary.dark
    }
  }
}));

export default function Navbar() {
  const classes = useStyles();
  let history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose} className = {classes.userMenu}>
        <Link to="/shop/signUp" className={classes.link}>
          Sign Up
        </Link>
      </MenuItem>
      <MenuItem onClick={handleMenuClose} className = {classes.userMenu}>
        <Link to="/shop" className={classes.link}>
          Login
        </Link>
      </MenuItem>
      <MenuItem onClick={handleMenuClose} className = {classes.userMenu}>
        <Link to="/shop" className={classes.link}>
          Profile
        </Link>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <img src={logo} alt="Logo" className={classes.logo}/>
            <Link to="/shop" className={classes.link}><Button color="secondary" className={classes.navbutton}>
              Home
            </Button></Link>
            <Link to="/shop" className={classes.link}><Button color="secondary" className={classes.navbutton}>
              Products
            </Button></Link>
            <Link to="/shop" className={classes.link}><Button color="secondary" className={classes.navbutton}>
              News
            </Button></Link>
            <Link to="/shop" className={classes.link}><Button color="secondary" className={classes.navbutton}>
              Shop
            </Button></Link>
            <Link to="/shop/contactUs" className={classes.link}><Button color="secondary" className={classes.navbutton}>
              Contact Us
            </Button></Link>
          {/* Uncomment if search is required in navbar */}
          {/* <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div> */}
          <div className={classes.sectionDesktop}>
            <IconButton aria-label="4 items in cart" color="inherit">
              {/* <Badge badgeContent={4} color="secondary"> */}
              <Link to="/shop/cart" className={classes.link}>
                <ShoppingCartIcon className={classes.navbutton}/>
              </Link>
              {/* </Badge> */}
            </IconButton>
            <IconButton aria-label="show 17 new notifications" color="inherit">
              <Badge badgeContent={17} color="secondary">
                <NotificationsIcon className={classes.navbutton}/>
              </Badge>
            </IconButton>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle className={classes.navbutton}/>
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMenu}
    </div>
  );
}