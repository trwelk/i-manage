import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Chip from '@mui/material/Chip';
import { useDispatch } from 'react-redux'
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { addToCart } from '../../../redux/actions/Cart.actions'

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
    background: theme.palette.primary.medium,
    marginBottom: 10,
    minHeight: 100,
    maxHeight: 100
  },
  title: {
    fontSize: 20
  },
  status: {
    fontSize: 50,
    marginLeft:130,
    marginRight: 0
  },
  details: {
    fontSize: 15
  },
  image: {
    maxWidth: 80,
    maxHeight: 80,
    borderRadius: 20
  }
}));

function OrderItem(props) {
  const classes = useStyles();
  const { orderDetails } = props;
  const dispatch = useDispatch();

  const handleReOrder = (e,items) => {
    var newCart = {
          userId: "user123",
          items: orderDetails.items
        }
      addToCart(dispatch,newCart);
  } 

  var itemNames = "";
  const orderDate= new Date(orderDetails.date);
  for(var i =0; i<orderDetails.items.length; i++){
    if(i == orderDetails.items.length-1)
      itemNames = itemNames + orderDetails.items[i].productName;
    else if(i > 3){
      itemNames = itemNames + orderDetails.items[i].productName + ", ...";
      break;
    }
    else
      itemNames = itemNames + orderDetails.items[i].productName + ", ";
  }

  return (
    <div className={classes.root}>
      <Card className={classes.root}>
        <CardContent>
          <Grid container spacing={1}>
            <Grid container item xs={1}>
              <img src={orderDetails.items[0].image} alt="ProdImage" className={classes.image} />
            </Grid>
            <Grid container item xs={9}>
              <Typography variant="h5" component="h2">
                  <Grid container item xs={12} className={classes.title}>
                      {itemNames}
                  </Grid>
                  <Grid container xs={12} className={classes.details}>
                      {orderDetails.items.length} item(s), Total Rs: {orderDetails.total}
                  </Grid>
                  <Grid container xs={12} className={classes.details}>
                      {orderDate.getUTCDate()}/{orderDate.getUTCMonth()}/{orderDate.getUTCFullYear()}
                  </Grid>
              </Typography>
            </Grid>
            <Grid container item xs={2}>
              <Typography variant="h5" component="h2">
                    <Grid container item xs={12} className={classes.status}>
                    {orderDetails.status !== "Completed"  &&
                      <Chip label={orderDetails.status} color="secondary" />
                    }
                    {orderDetails.status === "Completed"  &&
                      <Chip label={orderDetails.status} color="success" />
                    }
                    </Grid>
              </Typography>
                <Grid container item xs={12} className={classes.title}>
                <Button
                  fullWidth
                  variant="contained"
                  color="secondary"
                  className={classes.submit}
                  onClick={handleReOrder}
                >
                  Order Again
                </Button>
                </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
}

export default OrderItem;
