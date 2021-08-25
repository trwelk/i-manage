import React from 'react';
import Carousel from 'react-material-ui-carousel'
import { Paper } from '@material-ui/core'
import Image1 from '../../../assets/carousel/1.PNG';
import Image2 from '../../../assets/carousel/2.PNG';
import Image3 from '../../../assets/carousel/3.PNG';
import Image4 from '../../../assets/carousel/4.PNG';
import Image5 from '../../../assets/carousel/5.PNG';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
      height: '300px',
      backgroundColor: 'rgba(255,255,255,0.1)'
    },
    carouselItem: {
        backgroundColor: 'rgba(255,255,255,0.1)'
    },
    carouselImage: {
        height: '100%'
    }
}));

function LandingCarousel(props)
{
    const classes = useStyles();
    var items = [
        {
            name: "",
            image: Image5
        },
        {
            name: "Kaleido",
            image: Image1
        },
        {
            name: "DaySky Cloudie",
            image: Image2
        },{
            name: "NightSky Cloudie",
            image: Image3
        },{
            name: "Rainbow in the Clouds",
            image: Image4
        },
    ]

    return (
        <Carousel className={classes.root}> 
            {
                items.map( (item, i) => <Item key={i} item={item} /> )
            }
        </Carousel>
    )
}

function Item(props)
{
    const classes = useStyles();
    return (
        <Paper className={classes.carouselItem}>
            <img src={props.item.image} className={classes.carouselImage}/>
        </Paper>
    )
}

export default LandingCarousel