import React from 'react'; 
import { makeStyles } from '@material-ui/core/styles';
import OrderItem from './OrderItem';

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
    background: theme.palette.primary.medium,
    marginBottom: 10
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 10,
  },
  pos: {
    marginBottom: 12,
  },
}));

function OrderList(props) {
    const classes = useStyles();
    const {orders} = props;
  
    return (
      <div>
        {orders.map((orderItem) => {
          return <OrderItem orderDetails={orderItem} className={classes.root}/>;
        })}
      </div>
    );
}

export default OrderList;
