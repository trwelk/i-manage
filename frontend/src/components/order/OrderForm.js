import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import { createOrder , validateOrderObj} from '../../redux/actions/Order.actions';
import { useHistory } from "react-router-dom";
import { fetchProducts } from '../../redux/actions/Product.action';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    dialog: {
        height: "600px",
        width: '100%'
    },
    field: {
        marginTop: "45px"
    },
    formControl: {
        width: "-webkit-fill-available"
    },
    buttonIcon: {
        backgroundColor: "rgb(35, 47, 62)"
    },
    textFieldCover: {
        display: "flex",
        flexDirection: "row",
    },
    textField: {
        margin: "10px"
    },
    table: {
        marginTop: '20',
        minWidth: 450,
    },
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
      },
}));


export default function OrderForm() {
    useEffect(() => {
        fetchProducts(dispatch);
    }, [])
    const globalState = useSelector((state) => state);
    const products = globalState.productReducer.products ? globalState.productReducer.products : null
    const [state, setState] = React.useState({
        userId: "", source: "", date: new Date(), items: [], total: 0
    });
    const [orderItems,setOrderItems] = React.useState({
        items: []
    });
    const [orderProduct,setOrderProduct] = React.useState({
        product: "", qty: 0
    });
    let history = useHistory();
    const [error, setError] = React.useState("");
    const dispatch = useDispatch();
    const classes = useStyles();

    const handleClose = () => {
        history.push('/admin/orders');
    };

    const handleSubmit = () => {
        setState(prevState => ({ ...prevState,items: orderItems.items}));
        setState(prevState => ({ ...prevState,total: calcTotal()}));
        let err = validateOrderObj(state);
        console.log(state)
        console.log(err)
        if(err != null){
            setError(err)
        }else{
            createOrder(state, dispatch);
            history.push('/admin/orders');
        }

    };

    const handleChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value })
        console.log(state)
    }

    const handleProductSet = (e) => {
        setOrderProduct({ ...orderProduct, [e.target.name]: e.target.value })
        console.log(orderProduct)
    }

    const handleOrderAdd = (e) => {
        
        const item = {
            product: orderProduct.product,
            qty: orderProduct.qty,
            price: getProdDetails(orderProduct.product).sellingPrice,
            total: getProdDetails(orderProduct.product).sellingPrice * orderProduct.qty
        }
        setOrderItems({
            items: [ ...orderItems.items, item]
        });
        setState(prevState => ({ ...prevState,items: orderItems.items}));
        setState(prevState => ({ ...prevState,total: calcTotal()}));
    }

    const getProdDetails = (prodId) => {
        for(var i = 0; i < products.length; i++)
        {
            if(products[i].id == prodId)
            {
                return products[i]
            }
        }
    }

    const calcTotal = () => {
        var tot = 0;
        for(var i = 0; i < orderItems.items.length; i++)
        {
            tot += orderItems.items[i].total;
        }
        return tot; 
    }

    return (
        <div>
            <Dialog open='true' onClose={handleClose} aria-labelledby="form-dialog-title" >
                <DialogTitle id="form-dialog-title">Orders</DialogTitle>
                <div style={{ marginLeft: "20px", color: "red" }}>{error ? error : ""}</div>
                <DialogContent className={classes.dialog}>
                    <form className={classes.root}  autoComplete="off">
                        <div className={classes.textFieldCover}>
                            <TextField className={classes.textField} onChange={handleChange} required label="User Id" id="userId" name="userId" variant="outlined" />
                            <TextField
                                id="source"
                                select
                                label="Order Source"
                                onChange={handleChange}
                                style = {{width: '170px'}}
                                name="source"
                            >
                                <MenuItem value="Website"> Website </MenuItem>
                                <MenuItem value="Instagram"> Instagram </MenuItem>
                                <MenuItem value="Facebook"> Facebook </MenuItem>
                            </TextField>
                            <Typography className={classes.textField}>Total: {state.total}</Typography>
                        </div>
                        <div className={classes.textFieldCover}>
                            <h3>Item Details</h3>
                        </div>
                        <div className={classes.textFieldCover}>
                        <TextField
                                id="product"
                                select
                                label="Product"
                                onChange={handleProductSet}
                                style = {{width: '200px', marginLeft: '10px'}}
                                name="product"
                            >
                                {products.map((product) => {
                                return <MenuItem value={product.id}> {product.productName} </MenuItem>;
                                })}
                        </TextField>
                        <TextField
                                id="qty"
                                type = "number"
                                label="Quantity"
                                onChange={handleProductSet}
                                style = {{width: '70px', marginLeft: '40px'}}
                                name="qty"
                            />
                            <Button 
                                onClick={handleOrderAdd}
                                color="primary"
                                variant = "outlined"
                                style = {{width: '150px', marginLeft: '40px'}}
                            >
                                Add to order
                            </Button>
                        </div>
                        <div className={classes.textFieldCover} style={{marginTop: '20px'}}>
                        <TableContainer component={Paper}>
                            <Table className={classes.table} aria-label="simple table">
                                <TableHead>
                                <TableRow>
                                    <TableCell className={classes.head}>Product</TableCell>
                                    <TableCell className={classes.head} align="right">Quantity</TableCell>
                                    <TableCell className={classes.head} align="right">Price</TableCell>
                                    <TableCell className={classes.head} align="right">Total</TableCell>
                                </TableRow>
                                </TableHead>
                                <TableBody>
                                {orderItems.items.map((row) => (
                                    <TableRow key={row.name}>
                                    <TableCell component="th" scope="row">
                                        {row.product}
                                    </TableCell>
                                    <TableCell align="right">{row.qty}</TableCell>
                                    <TableCell align="right">{row.price}</TableCell>
                                    <TableCell align="right">{row.total}</TableCell>
                                    </TableRow>
                                ))}
                                </TableBody>
                            </Table>
                            </TableContainer>
                        </div>
                        <div className={classes.textFieldCover}>
                            
                        </div>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} color="primary">
                        Save order
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
