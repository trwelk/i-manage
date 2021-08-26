import React from 'react';
import ProductCard from '../components/customer/ProductView/ProductCard';
import Navbar from '../components/common/Navbar';
import { Grid } from '@material-ui/core';
import Image1 from '../assets/Items/1.PNG'
import Image2 from '../assets/Items/2.PNG'
import Image3 from '../assets/Items/3.PNG'
import Image4 from '../assets/Items/4.PNG'
import Image5 from '../assets/Items/5.PNG'
import Image6 from '../assets/Items/6.PNG'
import Image7 from '../assets/Items/7.PNG'
import Image8 from '../assets/Items/8.PNG'


const products = [
  {
    "title" : "Uniqeon",
    "image":Image1,
    "description": "Overview of Item",
    "mainDescription": "Main Item Description",
    "price": 300
  },
  {
    "title" : "Hibiscus Pop",
    "image":Image2,
    "description": " Overview of Item",
    "mainDescription": "Main Item Description",
    "price": 450
  },
  {
    "title" : "Candy Floss",
    "image":Image3,
    "description": "Overview of Item",
    "mainDescription": "Main Item Description",
    "price": 350
  },
  {
    "title" : "Mandarin Sting",
    "image":Image4,
    "description": "Overview of Item",
    "mainDescription": "Main Item Description",
    "price": 500
  },
  {
    "title" : "Sunshine Smile",
    "image":Image5,
    "description": "Overview of Item",
    "mainDescription": "Main Item Description",
    "price": 480
  },
  {
    "title" : "Eco Minty",
    "image":Image6,
    "description": "Overview of Item",
    "mainDescription": "Main Item Description",
    "price": 500
  },{
    "title" : "Blue Forest",
    "image":Image7,
    "description": "Overview of Item",
    "mainDescription": "Main Item Description",
    "price": 480
  },
  {
    "title" : "Grape Goodness",
    "image":Image8,
    "description": "Overview of Item",
    "mainDescription": "Main Item Description",
    "price": 400
  },
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