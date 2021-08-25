import React from 'react';
import Carousel from 'react-material-ui-carousel'
import { Paper, Button } from '@material-ui/core'
import Image1 from '../../../assets/carousel/1.PNG';
import Image2 from '../../../assets/carousel/2.PNG';
import Image3 from '../../../assets/carousel/3.PNG';
import Image4 from '../../../assets/carousel/4.PNG';
import Image5 from '../../../assets/carousel/5.PNG';

function LandingCarousel(props)
{
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
        <Carousel>
            {
                items.map( (item, i) => <Item key={i} item={item} /> )
            }
        </Carousel>
    )
}

function Item(props)
{
    return (
        <Paper>
            <h2>{props.item.name}</h2>
            <img src={props.item.image}/>
        </Paper>
    )
}

export default LandingCarousel