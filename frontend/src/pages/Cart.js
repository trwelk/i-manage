import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Navbar from "../components/common/Navbar";
import CartList from "../components/customer/cart/CartList";
import CartTotal from "../components/customer/cart/CartTotal";
import Grid from "@material-ui/core/Grid";
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  cartItems: {
    maxHeight: 700,
    overflowY:'auto',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  title: {
    fontSize: 20,
    textAlign: 'left',
    color: '#fff',
    marginBottom: 10,
    marginLeft: 40
  }
}));

function Cart() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Navbar />
      <Typography className={classes.title}>Your cart: x items</Typography>
      <Grid container spacing={3}>
        <Grid item xs={8} className={classes.cartItems}>
            <CartList/>
        </Grid>
        <Grid item xs={3} className={classes.cartItems}>
            <CartTotal/>
        </Grid>
      </Grid>

    </div>
  );
}

export default Cart;
