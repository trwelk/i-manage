import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import ProductCard from '../components/customer/ProductView/ProductCard';
import Navbar from '../components/common/Navbar';
import { Grid } from '@material-ui/core';
import { fetchProducts } from '../redux/actions/Product.action';
import Footer from "../components/common/Footer";

export default function ProductView(){
  const dispatch = useDispatch();
  useEffect(() => {
    fetchProducts(dispatch);
  }, []);
  var globalState = useSelector((state) => state);
  const { products } = globalState.productReducer ? globalState.productReducer : null

  return (
    <div style={{ flexGrow: 1}}>
        <Navbar/>
        <Grid  style={{ marginLeft: '10'}} container spacing = {1}>
        {products.map((product) => {
          return (
          <Grid item xs={3}>
          <ProductCard values={product}/>
          </Grid>);
        })}
        </Grid>
        <Footer />
    </div>
    
  );

}