import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Navbar from "../components/common/Navbar";
import OrderList from "../components/customer/orderHistory/OrderList";
import Grid from "@material-ui/core/Grid";
import Typography from '@material-ui/core/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders } from '../redux/actions/Order.actions'

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

function OrderHistory() {
    const dispatch = useDispatch();
    useEffect(() => {
        fetchOrders(dispatch);
    },[]);
    var globalState = useSelector((state) => state);
    const { orders } = globalState.orderReducer ? globalState.orderReducer : null
    const classes = useStyles();

    return (
        <div className={classes.root}>
        <Navbar/>
        <Typography className={classes.title}>Your order History</Typography>
        <Grid container spacing={3}>
            <Grid item xs={11} className={classes.cartItems}>
                <OrderList orders={orders}/>
            </Grid>
        </Grid>

        </div>
    );
}

export default OrderHistory;
