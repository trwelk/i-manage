import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    background: "#aaa",
    marginBottom: 10
  },
  grid: {
    marginTop: '10',
    marginBottom: '10'
  },
  text: {
    fontSize: 15
  },
  hr: {
    width: '100%'
  },
  titles: {
    fontSize: 15,
    textAlign: 'left'
  },
  checkout: {
    marginTop: 10,
    width: '100%',
    backgroundColor: '#ff8b80',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#c85b53',
      boxShadow: 'none'
    }
  },
}));

function CartTotal() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Card className={classes.root}>
        <CardContent>
          <Grid container spacing={1}  className={classes.grid}>
            <Grid item xs={6}>
            <Typography variant="h5" component="h2" className={classes.titles}>
                    Subtotal (x items)
            </Typography>
            </Grid>
            <Grid item xs={6}>
            <Typography variant="h5" component="h2" className={classes.text}>
                    Rs. xxx
            </Typography>
            </Grid>
            <Grid item xs={6}>
            <Typography variant="h5" component="h2" className={classes.titles}>
                    Delivery
            </Typography>
            </Grid>
            <Grid item xs={6}>
            <Typography variant="h5" component="h2" className={classes.text}>
                    Rs. xxx
            </Typography>
            </Grid>
            <hr className={classes.hr} />
            <Grid item xs={6}>
            <Typography variant="h5" component="h2" className={classes.titles}>
                    Total
            </Typography>
            </Grid>
            <Grid item xs={6}>
            <Typography variant="h5" component="h2" className={classes.text}>
                    Rs. xxx
            </Typography>
            </Grid>
            <Grid item xs={12}>
            <Button variant="outlined" size="large" className={classes.checkout}>
              Checkout
            </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
}

export default CartTotal;
