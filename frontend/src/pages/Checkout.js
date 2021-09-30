import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from '@material-ui/core/Typography';
import Navbar from "../components/common/Navbar";
import CheckoutList from "../components/customer/checkout/CheckoutList";
import Grid from "@material-ui/core/Grid";
import PaymentForm from "../components/customer/checkout/PaymentForm";
import { useDispatch, useSelector } from 'react-redux';
import { fetchCart } from '../redux/actions/Cart.actions';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    height: '100vh'
  },
  checkoutList: {
    maxHeight: 400,
    overflowY:'auto',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  paymentForm: {
    maxHeight: 500,
    overflowY:'auto',
    marginLeft: 'auto',
    marginRight: 'auto',
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  title: {
    fontSize: 20,
    textAlign: 'left',
    color: theme.palette.primary.contrastText,
    marginBottom: 10,
    marginLeft: 40
  }
}));

function Checkout() {
  const classes = useStyles();
  const dispatch = useDispatch();
  useEffect(() => {
    fetchCart(dispatch, 'user123');
  },[]);
  var globalState = useSelector((state) => state);
  const { cart, isLoading } = globalState.cartReducer ? globalState.cartReducer : null
  const [total,setTotal] = useState();

  const calcTotal = (items) => {
    var final = 0;
    for(var i = 0; i < items.length; i++) {
      final = final + (items[i].qty * items[i].price);
    }
    return final;
  }

  if(isLoading){
    fetchCart(dispatch, 'user123');
    return (
      <div className={classes.root}>
        <Navbar/>
        <Typography variant="h5" component="h2">
                    Loading Cart ...
        </Typography>
      </div>
    );
  }
  else if(cart == null){
    return (
      <div className={classes.root}>
        <Navbar/>
        <Typography variant="h5" component="h2">
                    Cart is Empty
        </Typography>
      </div>
    );
  }
  else {
    if(total == null){
      setTotal(calcTotal(cart.items));
    }
    return (
      <div className={classes.root}>
        <Navbar/>
        <Grid container spacing={2}>
          <Grid item xs={4} className={classes.checkoutList}>
              <CheckoutList cart={cart}/>
          </Grid>
          <Grid item xs={4} className={classes.paymentForm}>
              <PaymentForm total={total} cart = {cart}/>
          </Grid>
        </Grid>
  
      </div>
    );
  }
}

export default Checkout;
