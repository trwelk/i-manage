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

function CartList() {
    const classes = useStyles();
    const cart = {
      'userId': '123',
      'products': [{
          'img': Image1,
          'desc': 'Uniqeon',
          'price': 300
        },
        {
          'img': Image2,
          'desc': 'Hibiscus Pop',
          'price': 450
        },
        {
          'img': Image3,
          'desc': 'Candy Floss',
          'price': 350
        },
        {
          'img': Image4,
          'desc': 'Mandarin Sting',
          'price': 500
        }
      ],
      'qty': [2,2,1,3],
      'total': 3350,
      'itemCount': 4
    }
  
    return (
      <div>
        {cart.products.map((cartItem) => {
          return <CheckoutItem itemDetails={cartItem} qty={cart.qty[cart.products.indexOf(cartItem)]} className={classes.root}/>;
        })}
      </div>
    );
}

export default CartList;
