import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from "@material-ui/core/IconButton";
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
    background: theme.palette.primary.medium,
    marginBottom: 10,
    minHeight: 150,
    maxHeight: 150
  },
  text: {
    marginTop: '20%',
    marginBottom: '20%'
  },
  image: {
    maxWidth: 120,
    maxHeight: 120,
    borderRadius: 20
  },
  icon: {
      fontSize: 25
  }
}));

function CartItem(props) {
  const classes = useStyles();
  const { cartItem, itemUpdate } = props;
  const [state, setState] = React.useState(cartItem.qty);

  const handleQuantityAdd = () => {
    setState(state+1);
    itemUpdate({
      "id": cartItem.desc,
      "qty": state+1
    });
  }

  const handleQuantitySubtract = () => {
    setState(state-1);
    itemUpdate({
      "id": cartItem.desc,
      "qty": state-1
    });
  }

  const handleDelete = () => {
    itemUpdate({
      "id": cartItem.desc,
      "qty": 0
    });
  }

  return (
    <div className={classes.root}>
      <Card className={classes.root}>
        <CardContent>
          <Grid container spacing={0}>
            <Grid item xs={2}>
              <img src={cartItem.img} alt="ProdImage" className={classes.image} />
            </Grid>
            <Grid item xs={2}>
            <Typography variant="h5" component="h2" className={classes.text}>
                    {cartItem.desc}
                </Typography>
            </Grid>
            <Grid item xs={2}>
                <Typography variant="h5" component="h2" className={classes.text}>
                    {cartItem.price}
                </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant="h5" component="h2" className={classes.text}>
                    <IconButton color="inherit" onClick={handleQuantitySubtract}>
                      <RemoveIcon className={classes.icon}/> 
                    </IconButton>
                        {state} 
                    <IconButton color="inherit" onClick={handleQuantityAdd}>
                      <AddIcon className={classes.icon}/> 
                    </IconButton>
              </Typography>
            </Grid>
            <Grid item xs={2}>
                <Typography variant="h5" component="h2" className={classes.text}>
                    {cartItem.price * state}
                </Typography>
            </Grid>
            <Grid item xs={2}>
            <IconButton color="inherit" className={classes.text} onClick={handleDelete}>
                <DeleteIcon className={classes.icon}/>
            </IconButton>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
}

export default CartItem;
