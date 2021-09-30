import React from 'react'; 
import { makeStyles } from '@material-ui/core/styles';
import CheckoutItem from './CheckoutItem';

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

function CartList(props) {
    const classes = useStyles();
    const {cart} = props;
  
    return (
      <div>
        {cart.items.map((cartItem) => {
          return <CheckoutItem itemDetails={cartItem} qty={cartItem.qty} className={classes.root}/>;
        })}
      </div>
    );
}

export default CartList;
