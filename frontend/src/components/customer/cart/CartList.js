import React from 'react'; 
import { makeStyles } from '@material-ui/core/styles';
import CartItem from './CartItem';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Image1 from "../../../assets/Items/1.PNG";
import Image2 from "../../../assets/Items/2.PNG";
import Image3 from "../../../assets/Items/3.PNG";
import Image4 from "../../../assets/Items/4.PNG";

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
