import React from 'react';
import ProductCard from '../components/customer/ProductView/ProductCard';
import Navbar from '../components/common/Navbar';
import { Grid } from '@material-ui/core';

const products = [
  {
    "title" : "asdfasdffd",
    "description": " asdfasdfasfdfs",
    "mainDescription": "asdfasdfasdfasdfasdfasdfasfasasfads",
    "price": 200
  },
  {
    "title" : "asdfasdffd",
    "description": " asdfasdfasfdfs",
    "mainDescription": "asdfasdfasdfasdfasdfasdfasfasasfads",
    "price": 200
  },
  {
    "title" : "asdfasdffd",
    "description": " asdfasdfasfdfs",
    "mainDescription": "asdfasdfasdfasdfasdfasdfasfasasfads",
    "price": 200
  },
  {
    "title" : "asdfasdffd",
    "description": " asdfasdfasfdfs",
    "mainDescription": "asdfasdfasdfasdfasdfasdfasfasasfads",
    "price": 200
  },
  {
    "title" : "asdfasdffd",
    "description": " asdfasdfasfdfs",
    "mainDescription": "asdfasdfasdfasdfasdfasdfasfasasfads",
    "price": 200
  },
  {
    "title" : "asdfasdffd",
    "description": " asdfasdfasfdfs",
    "mainDescription": "asdfasdfasdfasdfasdfasdfasfasasfads",
    "price": 200
  },{
    "title" : "asdfasdffd",
    "description": " asdfasdfasfdfs",
    "mainDescription": "asdfasdfasdfasdfasdfasdfasfasasfads",
    "price": 200
  },
  {
    "title" : "asdfasdffd",
    "description": " asdfasdfasfdfs",
    "mainDescription": "asdfasdfasdfasdfasdfasdfasfasasfads",
    "price": 200
  },
  {
    "title" : "asdfasdffd",
    "description": " asdfasdfasfdfs",
    "mainDescription": "asdfasdfasdfasdfasdfasdfasfasasfads",
    "price": 200
  }
]

export default function ProductView(){

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
    </div>
    
  );

}