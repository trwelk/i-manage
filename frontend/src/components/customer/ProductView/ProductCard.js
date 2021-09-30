import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux'
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import { fetchCart, addToCart  } from '../../../redux/actions/Cart.actions'

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    backgroundColor:theme.palette.secondary.dark,
    boxShadow: '3px 3px #ffbdaf',
    margin: 20,
    borderRadius: 15
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  cardText: {
    color: theme.palette.primary.contrastText
  }
}));

export default function ProductCard(props) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const {values} = props;
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleAddToCart = () => {
    var newCart = {
          userId: "user123",
          items: [
            {
              id: values.id,
              productName: values.productName,
              qty: 1,
              price: values.sellingPrice
            }
          ]
        }
      addToCart(dispatch,newCart);
  } 

  return (
    <Card className={classes.root}>
      <CardHeader
        className={classes.cardText}
        title={values.productName}
      />
      <CardMedia
        className={classes.media}
        image={values.image}
        title={values.productName}
      />
      <CardContent>
        <Typography variant="body2" component="p" className={classes.cardText}>
          Price : {values.sellingPrice}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton 
          aria-label="add to cart" 
          onClick={handleAddToCart}
          className={classes.cardText}
        >
          <AddShoppingCartIcon />
        </IconButton>
        <IconButton 
          aria-label="Share" 
          className={classes.cardText}
        >
          <ShareIcon />
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          },classes.cardText)}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph className={classes.cardText}>
          {values.description}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}