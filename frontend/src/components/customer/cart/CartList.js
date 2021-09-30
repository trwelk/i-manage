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
    const {cartUpdate, cart} = props;

    const itemUpdate = (itemInfo) => {
      for(var i = 0; i < cart.items.length; i++) {
        if(cart.items[i].productId === itemInfo.id) {
          if(itemInfo.qty>0)
            cart.items[i].qty = itemInfo.qty;
          else
            cart.items.splice(i, 1)
        }
      }
      cartUpdate(cart);
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
        {cart.items.map((cartItem) => {
          if(cartItem.qty > 0){
            return <CartItem 
                    key = {cartItem.productId}
                    cartItem={cartItem} 
                    itemUpdate={itemUpdate}
                    className={classes.root}/>;
          }
          else return null
        })}
      </div>
    );
}

export default CartList;
