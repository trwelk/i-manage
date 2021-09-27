import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

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
  details: {
    fontSize: 15
  },
  image: {
    maxWidth: 80,
    maxHeight: 80,
    borderRadius: 20
  }
}));

function CheckoutItem(props) {
  const classes = useStyles();
  const { itemDetails, qty } = props;

  return (
    <div className={classes.root}>
      <Card className={classes.root}>
        <CardContent>
          <Grid container spacing={3}>
            <Grid container item xs={3}>
              <img src={itemDetails.img} alt="ProdImage" className={classes.image} />
            </Grid>
            <Grid container item xs={9}>
            <Typography variant="h5" component="h2">
                    <Grid container item xs={12} className={classes.title}>
                        {itemDetails.desc}
                    </Grid>
                    <Grid container xs={12} className={classes.details}>
                        Quantity: {qty} Total: {qty * itemDetails.price}
                    </Grid>
                </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
}

export default CheckoutItem;
