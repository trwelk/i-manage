import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Navbar from "../components/common/Navbar";
import CartList from "../components/customer/cart/CartList";
import CartTotal from "../components/customer/cart/CartTotal";
import Grid from "@material-ui/core/Grid";
import Typography from '@material-ui/core/Typography';
import Image1 from "../assets/Items/2.PNG";
import Image2 from "../assets/Items/2.PNG";
import Image3 from "../assets/Items/3.PNG";
import Image4 from "../assets/Items/4.PNG";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    height: '100vh'
  },
  cartItems: {
    height: '70vh',
    overflowY:'auto',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  title: {
    fontSize: 20,
    textAlign: 'left',
    color: theme.palette.primary.contrastText,
    marginBottom: 10,
    marginLeft: 40
  }
}));

var cart = {
  'userId': '123',
  'items': [{
      'img': Image1,
      'desc': 'Uniqeon',
      'price': 300,
      'qty': 1
    },
    {
      'img': Image2,
      'desc': 'Hibiscus Pop',
      'price': 450,
      'qty': 2
    },
    {
      'img': Image3,
      'desc': 'Candy Floss',
      'price': 350,
      'qty': 3
    },
    {
      'img': Image4,
      'desc': 'Mandarin Sting',
      'price': 500,
      'qty': 2
    }
  ]
}

function Cart() {
  const classes = useStyles();
  const [data, setData] = useState(cart);

  const calcTotal = (items) => {
    var final = 0;
    for(var i = 0; i < items.length; i++) {
      final = final + (items[i].qty * items[i].price);
    }
    return final;
  }

  const calcCount = (items) => {
    var count = 0;
    for(var i = 0; i < items.length; i++) {
      if(items[i].qty > 0)
        count = count + 1
    }
    return count;
  }

  const [total,setTotal] = useState(
    {
      "count": cart.items.length,
      "total": calcTotal(cart.items)
    }
  );

  const cartUpdate = (childData) => {
    setData(childData);
    setTotal({
      "count": calcCount(childData.items),
      "total": calcTotal(childData.items)
    })
  }

  return (
    <div className={classes.root}>
      <Navbar/>
      <Typography className={classes.title}>Your cart: {calcCount(data.items)} items</Typography>
      <Grid container spacing={3}>
        <Grid item xs={8} className={classes.cartItems}>
            <CartList cartUpdate={cartUpdate} cart={data}/>
        </Grid>
        <Grid item xs={3} className={classes.cartItems}>
            <CartTotal total={total}/>
        </Grid>
      </Grid>

    </div>
  );
}

export default Cart;
