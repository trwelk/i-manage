import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Navbar from "../components/common/Navbar";
import CheckoutList from "../components/customer/checkout/CheckoutList";
import Grid from "@material-ui/core/Grid";
import PaymentForm from "../components/customer/checkout/PaymentForm";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
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

  return (
    <div className={classes.root}>
      <Navbar/>
      <Grid container spacing={1}>
        <Grid item xs={4} className={classes.checkoutList}>
            <CheckoutList/>
        </Grid>
        <Grid item xs={6} className={classes.paymentForm}>
            <PaymentForm/>
        </Grid>
      </Grid>

    </div>
  );
}

export default Checkout;
