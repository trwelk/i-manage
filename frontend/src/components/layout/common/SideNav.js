import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import CasinoIcon from '@material-ui/icons/Casino';
import { Link } from 'react-router-dom'
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import StoreIcon from '@material-ui/icons/Store';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import AssignmentIcon from '@material-ui/icons/Assignment';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        marginBottom: '100px'
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
        width: "50px",
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
    link: {
        textDecoration: 'none',
        color:"black"
    },
    itemIcon:{
        minWidth:"35px"
    }
}));

export default function SideNav() {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const supplierMenu = (
        <div>
            <Link className={classes.link} to="/admin/suppliers/insights">
                <ListItem button>
                    <ListItemIcon className={classes.itemIcon} >
                        <CasinoIcon />
                    </ListItemIcon>
                    <ListItemText primary="Supplier Insights" />
                </ListItem>
            </Link>
            <Link className={classes.link} to="/admin/suppliers/manage">
                <ListItem button>
                    <ListItemIcon className={classes.itemIcon}>
                        <EmojiPeopleIcon />
                    </ListItemIcon>
                    <ListItemText primary="Supplier Management" />
                </ListItem>
            </Link>
        </div>
    )

    const locationMenu = (
        <div>
            <Link className={classes.link} to="/admin/locations">
                <ListItem button>
                    <ListItemIcon className={classes.itemIcon}>
                        <LocationCityIcon />
                    </ListItemIcon>
                    <ListItemText primary="Location Management" />
                </ListItem>
            </Link>
        </div>
    )

    const inventoryMenu = (
        <div>
            <Link className={classes.link} to="/admin/inventory">
                <ListItem button>
                    <ListItemIcon className={classes.itemIcon}>
                        <StoreIcon />
                    </ListItemIcon>
                    <ListItemText primary="Inventory Management" />
                </ListItem>
            </Link>
        </div>
    )

    const cashflowMenu = (
        <div>
            <Link className={classes.link} to="/admin/cashflow/insights">
                <ListItem button>
                    <ListItemIcon className={classes.itemIcon}>
                        <StoreIcon />
                    </ListItemIcon>
                    <ListItemText primary="Financial Insights" />
                </ListItem>
            </Link>
        </div>
    )

    
    const productMenu = (
        <div>
            <Link className={classes.link} to="/admin/products">
                <ListItem button>
                    <ListItemIcon className={classes.itemIcon}>
                        <AddShoppingCartIcon />
                    </ListItemIcon>
                    <ListItemText primary="Product Management" />
                </ListItem>
            </Link>
        </div>
    )

    const orderMenu = (
        <div>
            <Link className={classes.link} to="/admin/orders">
                <ListItem button>
                    <ListItemIcon className={classes.itemIcon}>
                        <AssignmentIcon />
                    </ListItemIcon>
                    <ListItemText primary="Order Management" />
                </ListItem>
            </Link>
        </div>
    )

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, {
                            [classes.hide]: open,
                        })}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        I-Manage
          </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                className={clsx(classes.drawer, {
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                })}
                classes={{
                    paper: clsx({
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                    }),
                }}
            >
                <div className={classes.toolbar}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </div>
                <Divider />
                {cashflowMenu}
                {supplierMenu}
                {productMenu}
                {inventoryMenu}
                {locationMenu}
                {orderMenu}
                <Divider />
                <List>
                    {['All mail', 'Trash', 'Spam'].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemIcon className={classes.itemIcon}>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        </div>
    );
}
