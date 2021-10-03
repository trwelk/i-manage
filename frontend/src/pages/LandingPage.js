import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Navbar from "../components/common/Navbar";
import LandingCarousel from "../components/customer/landingpage/LandingCarousel";
import { makeStyles } from '@material-ui/core/styles';
import ProductCard from "../components/customer/ProductView/ProductCard";
import { Grid } from "@material-ui/core";
import Typography from '@material-ui/core/Typography';
import { fetchProducts } from '../redux/actions/Product.action';
import Footer from "../components/common/Footer";

const useStyles = makeStyles((theme) => ({
    card : {
        marginLeft : '200',
        marginRight: '200'
    },
    title: {
      marginTop: 20,
      color: theme.palette.primary.contrastText,
      fontFamily: 'Noto Sans JP',
      marginBottom: 20,
      textShadow: '3px 2px #c85b53'
    }
}));

function LandingPage() {
  const classes = useStyles();
  const dispatch = useDispatch();
  useEffect(() => {
    fetchProducts(dispatch);
  }, []);
  var globalState = useSelector((state) => state);
  const { products } = globalState.productReducer ? globalState.productReducer : null

  return (
    <div style={{ flexGrow: 1 }}>
      <Navbar />
      <LandingCarousel />
      <Typography variant="h4" color="textSecondary" component="p" className={classes.title}>
          <u>Popular Items</u>
      </Typography>
      <div>
        <Grid className = {classes.card} alignContent="stretch" container spacing={2} justifyContent='center'>
          {products.map((product) => {
            if(products.findIndex(obj => obj.id==product.id) < 4){
              return (
                <Grid item xs={3} alignContent="stretch">
                  <ProductCard values={product} />
                </Grid>
              );
            }
            else
              return (<div />);
          })}
        </Grid>
      </div>
      <Footer />
    </div>
  );
}

export default LandingPage;
