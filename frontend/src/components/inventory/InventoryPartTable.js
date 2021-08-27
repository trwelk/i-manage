import React, { useEffect, useState } from 'react';
import MaterialTable, { MTableToolbar } from 'material-table'
import { useDispatch, useSelector } from 'react-redux'
import { fetchInventories, validateInvItemObj,  updateInventory, deleteInventory, createInventory } from '../../redux/actions/Inventory.actions';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import CircularProgress from '@material-ui/core/CircularProgress';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import { AppConstants } from '../../constants/AppConstants';
import { IconButton } from '@material-ui/core';
import { alpha } from '@material-ui/core/styles'
import { fetchProducts } from '../../redux/actions/Product.action';
// import AdminNavbar from '../views/AdminNavBar';



function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function InventoryPartTable(props) {
    const { useState } = React;
    useEffect(() => {
        fetchInventories(dispatch);
        fetchProducts(dispatch)
    }, [])
    //*********************************************CONSTANTS************************************************************* */
    const location = props.location
    const globalState = useSelector((state) => state);
    const dispatch = useDispatch();
    var inventoryItems = globalState.inventoryReducer.inventory ? globalState.inventoryReducer.inventory : null
    const products = globalState.productReducer.products ? globalState.productReducer.products : null
    const locations = globalState.inventoryLocationReducer.inventoryLocations ? globalState.inventoryLocationReducer.inventoryLocations : null
    const selectedLocation = globalState.inventoryLocationReducer.selectedInventory ? globalState.inventoryLocationReducer.selectedInventory : null
    if(inventoryItems && selectedLocation){
        console.log(inventoryItems,selectedLocation)
        inventoryItems = inventoryItems.filter( inv => inv.location === selectedLocation.id)

    }
    var locationLookup = {};
    if (locations){
        locations.forEach(location => {
            locationLookup[location.id] = location.locationName
        });
    }
    var productLookup = {};
    if (products) {
        products.forEach(product => {
            productLookup[product.id] = product.productName
        })
    }

    const displayData = inventoryItems.map(iItem => {
        return (
            {
                id: iItem.id,
                location: iItem.location,
                product: iItem.product,
                quantity: iItem.quantity,
                price: products.filter(product => product.id === iItem.product)[0] ?
                    products.filter(product => product.id === iItem.product)[0].sellingPrice : 0
            }
        )
    })
    const [error, setError] = React.useState("")
    const [state, setState] = React.useState({
        open: false,
        vertical: 'bottom',
        horizontal: 'right',
    });
    const { vertical, horizontal, open } = state;


    //*********************************************Setting columns************************************************************* */
    const columns = [
        { title: 'ID', field: 'id' },
        { title: 'Location', field: 'location', lookup: locationLookup },
        { title: 'Product', field: 'product', lookup: productLookup },
        { title: 'price', field: 'price' },
        { title: 'Quantity', field: 'quantity' }
    ];


    //*********************************************Event Handlers************************************************************* */

    const handleClick = (newState) => () => {
        setState({ open: true, ...newState });
    };

    const handleClose = () => {
        setState({ ...state, open: false });
    };



    //--------------------------------------------------------UI-ELEMENTS-------------------------------------------------------------     
    const feedBackToast = (<Snackbar
        autoHideDuration={1000}
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        key={vertical + horizontal}
    >
        <Alert severity="error">{error}</Alert>
    </Snackbar>)

    const table = inventoryItems ? (
        <MaterialTable style={{ padding: "0px", boxShadow: "0 0 2px 2px black", backgroundColor: 'rgba(255,255,255,0.7)' }}
            title={"Inventory Items"}
            columns={columns}
            data={displayData}
            editable={{
                onRowAdd: newData =>
                    new Promise((resolve, reject) => {

                        setTimeout(() => {
                            let err = validateInvItemObj(newData)
                            if (err == null) {
                                createInventory(newData, dispatch)
                                resolve();
                            }
                            else {
                                setError(err)
                                setState({ ...state, open: true })
                                reject();
                            }
                        }, 1000)

                    }),
                onRowDelete: oldData =>
                    new Promise((resolve, reject) => {
                        setTimeout(() => {
                            deleteInventory(dispatch, oldData.id)
                            resolve()
                        }, 1000)
                    }),

                onRowUpdate: (newData, oldData) =>
                    new Promise((resolve, reject) => {
                        setTimeout(() => {
                            updateInventory(dispatch, newData)
                            resolve();
                        }, 1000)
                    }),
            }}
            options={{
                pageSize: 10,
                exportButton: true,
                filtering: true,
                headerStyle: {
                    backgroundColor: 'rgb(35 47 62) ',
                    color: '#FFF',
                    borderBottom: '1px solid #333',
                    width: '100px',
                    /* height: 100px; */
                    boxShadow: "0 10px 5px -2px #888"
                }
            }}
            components={{
                Toolbar: props => (
                    <div>
                        <MTableToolbar {...props} />
                    </div>
                ),
            }}
        />
    ) : (<div><CircularProgress style={{ marginTop: "200px" }} /></div>)


    return (
        <div>
            <div style={{ padding: "20px", marginTop: "10px" }}>
                {table}
                {feedBackToast}
            </div>
        </div>

    )
}


export default InventoryPartTable