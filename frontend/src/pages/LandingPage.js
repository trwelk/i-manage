import React from "react";
import Navbar from "../components/common/Navbar";
import LandingCarousel from "../components/customer/landingpage/LandingCarousel";
import { makeStyles } from '@material-ui/core/styles';
import ProductCard from "../components/customer/ProductView/ProductCard";
import { Grid } from "@material-ui/core";
import Image1 from "../assets/Items/1.PNG";
import Image2 from "../assets/Items/2.PNG";
import Image3 from "../assets/Items/3.PNG";
import Image4 from "../assets/Items/4.PNG";
import Typography from '@material-ui/core/Typography';

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
  const products = [
    {
      title: "Uniqeon",
      image: Image1,
      description: "Overview of Item",
      mainDescription: "Main Item Description",
      price: 300,
    },
    {
      title: "Hibiscus Pop",
      image: Image2,
      description: " Overview of Item",
      mainDescription: "Main Item Description",
      price: 450,
    },
    {
      title: "Candy Floss",
      image: Image3,
      description: "Overview of Item",
      mainDescription: "Main Item Description",
      price: 350,
    },
    {
      title: "Mandarin Sting",
      image: Image4,
      description: "Overview of Item",
      mainDescription: "Main Item Description",
      price: 500,
    },
  ];

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
            return (
              <Grid item xs={3} alignContent="stretch">
                <ProductCard values={product} />
              </Grid>
            );
          })}
        </Grid>
      </div>
    </div>
  );
}

export default LandingPage;
