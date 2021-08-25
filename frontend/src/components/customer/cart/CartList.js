import React from 'react'; 
import { makeStyles } from '@material-ui/core/styles';
import CartItem from './CartItem';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

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
        <Card className={classes.root}>
        <CardContent>
          <Grid container spacing={0}>
            <Grid item xs={4}>
            <Typography variant="h5" component="h2">
                    Item
                </Typography>
            </Grid>
            <Grid item xs={2}>
                <Typography variant="h5" component="h2">
                    Price
                </Typography>
            </Grid>
            <Grid item xs={2}>
                <Typography variant="h5" component="h2">
                    Qty
                </Typography>
            </Grid>
            <Grid item xs={2}>
                <Typography variant="h5" component="h2">
                    Total
                </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
        {cart.products.map((cartItem) => {
          return <CartItem itemDetails={cartItem} qty={cart.qty[cart.products.indexOf(cartItem)]} className={classes.root}/>;
        })}
      </div>
    );
}

export default CartList;
