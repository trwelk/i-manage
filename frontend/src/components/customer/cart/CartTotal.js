import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.primary.medium,
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
    width: '100%',
    border: '1px solid black'
  },
  titles: {
    fontSize: 15,
    textAlign: 'left'
  },
  checkout: {
    marginTop: 10,
    width: '100%',
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.primary.contrastText,
    '&:hover': {
      backgroundColor: theme.palette.secondary.dark,
      boxShadow: 'none'
    }
  },
  link: {
    color: theme.palette.primary.contrastText,
    textDecoration: 'none',
    '&:visited': {
      color: theme.palette.primary.contrastText,
    }
  }
}));

function CartTotal(props) {
  const classes = useStyles();
  const {total} = props

  return (
    <div className={classes.root}>
      <Card className={classes.root}>
        <CardContent>
          <Grid container spacing={1}  className={classes.grid}>
            <Grid item xs={6}>
            <Typography variant="h5" component="h2" className={classes.titles}>
                    Subtotal ({total.count} items)
            </Typography>
            </Grid>
            <Grid item xs={6}>
            <Typography variant="h5" component="h2" className={classes.text}>
                Rs. {total.total} 
            </Typography>
            </Grid>
            <Grid item xs={6}>
            <Typography variant="h5" component="h2" className={classes.titles}>
                    Delivery
            </Typography>
            </Grid>
            <Grid item xs={6}>
            <Typography variant="h5" component="h2" className={classes.text}>
                    Rs. 150
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
                    Rs. {total.total + 150}
            </Typography>
            </Grid>
            <Grid item xs={12}>
            <Link to="/shop/checkout" className={classes.link}>
            <Button variant="outlined" size="large" className={classes.checkout}>
                Checkout
            </Button>
            </Link>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
}

export default CartTotal;
