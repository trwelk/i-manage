import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux'
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import { fetchCart, updateCart, createCart  } from '../../../redux/actions/Cart.actions'

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    backgroundColor: theme.palette.secondary.dark
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function ProductCard(props) {
  const dispatch = useDispatch();
  useEffect(() => {
    fetchCart(dispatch, 'user123');
  }, [])
  const classes = useStyles();
  var globalState = useSelector((state) => state);
  var cart = globalState.cartReducer.cart ? globalState.cartReducer.cart : null
  const [state, setState] = React.useState(cart);
  const {values} = props;
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleAddToCart = () => {
    cart = globalState.cartReducer.cart ? globalState.cartReducer.cart : null
    console.log(cart);
    setState(cart);
    if(state == "" || state == null){
      console.log("Adding new cart");
      var newCart = {
        userId: "user123",
        items: [
          {
            productId: values.title,
            qty: 1,
            price: values.price,
            total: values.price
          }
        ],
        total: values.price,
        itemCount: 1
      }
      console.log(newCart);
      createCart(newCart,dispatch);
      setState(newCart);
    } else {
      var cartItems = state.items;
      cartItems.push({
          productId: values.title,
          qty: 1,
          price: values.price,
          total: values.price
      })
      var newTotal = state.total + values.price;
      setState(prevState => ({ ...prevState,items: cartItems}));
      setState(prevState => ({ ...prevState,total: newTotal}));
      console.log(state);
    }
  } 

  return (
    <Card className={classes.root}>
      <CardHeader
        title={values.title}
      />
      <CardMedia
        className={classes.media}
        image={values.image}
        title={values.title}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {values.description}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          Price : {values.price}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to cart" onClick={handleAddToCart}>
          <AddShoppingCartIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>
          {values.mainDescription}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}