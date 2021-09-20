import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Navbar from "../components/common/Navbar";
import CartList from "../components/customer/cart/CartList";
import CartTotal from "../components/customer/cart/CartTotal";
import Grid from "@material-ui/core/Grid";
import Typography from '@material-ui/core/Typography';
import { useDispatch, useSelector } from 'react-redux'
import { fetchCart } from '../redux/actions/Cart.actions'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    height: '100vh'
  },
  cartItems: {
    height: '70vh',
    overflowY:'auto',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  title: {
    fontSize: 20,
    textAlign: 'left',
    color: theme.palette.primary.contrastText,
    marginBottom: 10,
    marginLeft: 40
  }
}));

function Cart() {
  const dispatch = useDispatch();
  useEffect(() => {
    fetchCart(dispatch, 'user123');
  },[]);
  var globalState = useSelector((state) => state);
  const { cart, isLoading } = globalState.cartReducer ? globalState.cartReducer : null
  const classes = useStyles();
  const [data, setData] = useState(cart);

  const calcTotal = (items) => {
    var final = 0;
    for(var i = 0; i < items.length; i++) {
      final = final + (items[i].qty * items[i].price);
    }
    return final;
  }

  const calcCount = (items) => {
    var count = 0;
    for(var i = 0; i < items.length; i++) {
      if(items[i].qty > 0)
        count = count + 1
    }
    return count;
  }

  const cartUpdate = (childData) => {
    setData(childData);
    setTotal({
      "count": calcCount(childData.items),
      "total": calcTotal(childData.items)
    })
  }

  const [total,setTotal] = useState();

  if(isLoading){
    return (
      <div className={classes.root}>
        <Navbar/>
        <Typography variant="h5" component="h2">
                    Loading Cart ...
        </Typography>
      </div>
    );
  }
  else{
    if(total == null){
      console.log("setting total");
      setTotal({
        "count": cart.items.length,
        "total": calcTotal(cart.items)
      });
    }
    if(data == null){
      setData(cart);
    }
    return (
      <div className={classes.root}>
        <Navbar/>
        <Typography className={classes.title}>Your cart: {calcCount(cart.items)} items</Typography>
        <Grid container spacing={3}>
          <Grid item xs={8} className={classes.cartItems}>
              <CartList cartUpdate={cartUpdate} cart={data}/>
          </Grid>
          <Grid item xs={3} className={classes.cartItems}>
              <CartTotal total={total}/>
          </Grid>
        </Grid>
  
      </div>
    );
  }
}

export default Cart;
