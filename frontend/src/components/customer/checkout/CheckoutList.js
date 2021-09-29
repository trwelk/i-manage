import React from 'react'; 
import { makeStyles } from '@material-ui/core/styles';
import CheckoutItem from './CheckoutItem';
import Image1 from "../../../assets/Items/1.PNG";
import Image2 from "../../../assets/Items/2.PNG";
import Image3 from "../../../assets/Items/3.PNG";
import Image4 from "../../../assets/Items/4.PNG";

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
