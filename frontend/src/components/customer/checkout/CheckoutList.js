import React from 'react'; 
import { makeStyles } from '@material-ui/core/styles';
import CheckoutItem from './CheckoutItem';

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
    background: '#aaa',
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
          'img': 'https://www.claires.com/dw/image/v2/BBTK_PRD/on/demandware.static/-/Sites-master-catalog/default/dwac910086/images/hi-res/20559_1.jpg?sw=2000&sh=2000&sm=fit',
          'desc': 'Item',
          'price': 1000
        },
        {
          'img': '../../../assets/ProductImages/img2.jpg',
          'desc': 'Item 2',
          'price': 1000
        },
        {
          'img': '../../../assets/ProductImages/img3.jpg',
          'desc': 'Item 3',
          'price': 1000
        },
        {
          'img': '../../../assets/ProductImages/img3.jpg',
          'desc': 'Item 3',
          'price': 1000
        },
        {
          'img': '../../../assets/ProductImages/img3.jpg',
          'desc': 'Item 3',
          'price': 1000
        },
        {
          'img': '../../../assets/ProductImages/img3.jpg',
          'desc': 'Item 3',
          'price': 1000
        }
      ],
      'qty': [2,5,4,6,7,2],
      'total': 11000,
      'itemCount': 3
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
