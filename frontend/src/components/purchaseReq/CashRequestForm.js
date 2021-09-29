import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import MenuItem from '@material-ui/core/MenuItem';
import {  createPurchaseReq ,validatePr } from '../../redux/actions/PurchaseReq.actions'
import { fetchSuppliers } from '../../redux/actions/Supplier.actions'
import { fetchProducts } from '../../redux/actions/Product.action'
import { fetchInventoryLocations } from '../../redux/actions/InventoryLocations.actions'

const useStyles = makeStyles((theme) => ({
    dialog: {
        height: "600px",
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
    }
}));


export default function CashRequestForm(props) {
    useEffect(() => {
        fetchProducts(dispatch);
        fetchSuppliers(dispatch);
        fetchInventoryLocations(dispatch);
    }, []);
    const globalState = useSelector((state) => state);
    const dispatch = useDispatch();
    const classes = useStyles();
    const products = globalState.productReducer.products ? globalState.productReducer.products : null
    const suppliers = globalState.productReducer.products ? globalState.supplierReducer.suppliers : null
    const invLocations = globalState.inventoryLocationReducer.inventoryLocations ? globalState.inventoryLocationReducer.inventoryLocations : null
    const productMenuItems = products?.map(product => {
        return (
            <MenuItem value={product.id}> {product.productName} </MenuItem>
        )
    })
    const suppliersMenuItems = suppliers?.map(supplier => {
        return (
            <MenuItem value={supplier.id}> {supplier.supplierName} </MenuItem>
        )
    })
    const invLocationsMenuItems = invLocations?.map(invLocation => {
        return (
            <MenuItem value={invLocation.id}> {invLocation.locationName} </MenuItem>
        )
    })
    const {open , setOpen}= props;
    const [state, setState] = React.useState({
        id: "", description: "", product: "", supplier: null, 
        location: "", requestedDate: "", wantedDeliveryDate: "", quantityOfItems: "", requester:"IFSAPP"
    });
    const [openFeedback, setOpenFeedback] = React.useState({
        openf: false,
        vertical: 'bottom',
        horizontal: 'right',
    });
    const { vertical, horizontal, openf } = openFeedback
    const [error, setError] = React.useState("");
    const [selectedTags, setSelectedTags] = React.useState([]);


    const handleSubmit = () => {
        let err = validatePr(state);
        if(err != null){
            console.log(state)
            setError(err);
        }else{
            console.log('call method')
            createPurchaseReq(state, dispatch);
            setOpen(false);
        }

    };
    const handleClose = () => {
        setOpen(false)
    }

    const handleChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value })
        console.log(state)
    }

    return (
        <div>

            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" >
                <DialogTitle id="form-dialog-title">Suppliers</DialogTitle>
                <div style={{ marginLeft: "20px", color: "red" }}>{error ? error : ""}</div>
                <DialogContent className={classes.dialog}>
                    <form className={classes.root}  autoComplete="off">
                        <div className={classes.textFieldCover}>
                            <TextField className={classes.textField} onChange={handleChange} required label="Id" name="id" variant="outlined" />
                            <TextField className={classes.textField} onChange={handleChange} required style={{ width: "300px" }}
                                name="description" label="Description" variant="outlined" />
                        </div>
                        <div className={classes.textFieldCover} style={{ margin: "5px 0px 18px 0px" }}>
                            <TextField
                                id="standard-select-currency"
                                select
                                label="Supplier"
                                onChange={handleChange}
                                fullWidth
                                name="supplier"
                            >
                               {suppliersMenuItems}
                            </TextField>
                        </div>
                        <div className={classes.textFieldCover} style={{ margin: "5px 0px 18px 0px" }}>
                            <TextField
                                id="standard-select-currency"
                                select
                                label="Product"
                                onChange={handleChange}
                                fullWidth
                                name="product"
                            >
                               {productMenuItems}
                            </TextField>
                        </div>
                        <div className={classes.textFieldCover} style={{ margin: "5px 0px 18px 0px" }}>
                            <TextField
                                id="standard-select-currency"
                                select
                                label="Location"
                                onChange={handleChange}
                                fullWidth
                                name="location"
                            >
                               {invLocationsMenuItems}
                            </TextField>
                        </div>
                        <div className={classes.textFieldCover}>
                            <TextField label="Wanted Delivery Date" name="wantedDeliveryDate" type="date" style={{ minWidth: "220px" }} className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onChange={handleChange}
                            />
                            <TextField label="Requested" name="requestedDate" type="date" style={{ minWidth: "300px" }} className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onChange={handleChange}
                            />
                        </div>
                        <div className={classes.textFieldCover}>
                            <TextField onChange={handleChange} className={classes.textField} required type="number"
                                name="quantityOfItems" label="Number of Items" variant="outlined" />
                        </div>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} color="primary">
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
