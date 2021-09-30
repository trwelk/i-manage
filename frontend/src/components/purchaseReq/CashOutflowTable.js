import React, { useEffect, useState } from 'react';
import MaterialTable, { MTableToolbar } from 'material-table'
import { useDispatch, useSelector } from 'react-redux'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import CircularProgress from '@material-ui/core/CircularProgress';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import { AppConstants } from '../../constants/AppConstants';
import {  deletePurchaseReq , updatePurchaseReq ,fetchPurchaseReqs , validatePr } from '../../redux/actions/PurchaseReq.actions'
import CashRequestForm from './CashRequestForm';
// import AdminNavbar from '../views/AdminNavBar';



function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function CashOutflowTable(props) {
    useEffect(() => {
        fetchPurchaseReqs(dispatch);
    }, [])
    //*********************************************CONSTANTS************************************************************* */
    const location = props.location  
    const { useState } = React;   
    const globalState = useSelector((state) => state);
    const dispatch = useDispatch();
    const purchaseReqs = globalState.purchaseReq.purchaseReqs ? globalState.purchaseReq.purchaseReqs : null
    const products = globalState.productReducer.products ? globalState.productReducer.products : null
    const suppliers = globalState.productReducer.products ? globalState.supplierReducer.suppliers : null
    const invLocations = globalState.inventoryLocationReducer.inventoryLocations ? globalState.inventoryLocationReducer.inventoryLocations : null
 
    var supplierLookup = {};
    if (suppliers) {
        suppliers.forEach(supplier => {
            supplierLookup[supplier.id] = supplier.supplierName
        })
    }

    var productLookup = {};
    if (products) {
        products.forEach(product => {
            productLookup[product.id] = product.productName
        })
    }

    var locationLookup = {};
    if (invLocations) {
        invLocations.forEach(invLocation => {
            locationLookup[invLocation.id] = invLocation.locationName
        })
    }
    const [error, setError] = React.useState("")
    const [state, setState] = React.useState({
        open: false,
        vertical: 'bottom',
        horizontal: 'right',
    });
    const { vertical, horizontal, open } = state;
    const [formOpen, setFormOpen] = React.useState(false);

    const stateLookup = {REQUESTED:"REQUESTED",APPROVED:"APPROVED",DECLINED:"DECLINED"}


//*********************************************Setting columns************************************************************* */

    const columns =[
        { title: 'ID', field: 'id' },
        { title: 'Description', field: 'description', },
        { title: 'product', field: 'product' , lookup: productLookup },
        { title: 'Supplier', field: 'supplier', lookup: supplierLookup },
        { title: 'requester', field: 'requester' },
        { title: 'location', field: 'location' , lookup: locationLookup},
        { title: 'state', field: 'state' , lookup: stateLookup },
        { title: 'quantityOfItems', field: 'quantityOfItems' },
        { title: 'dateResolved', field: 'dateResolved' }
    ]




//*********************************************Event Handlers************************************************************* */

    const handleClick = (newState) => () => {
        setState({ open: true, ...newState });
    };

    const handleClose = () => {
        setState({ ...state, open: false });
    };

    const handleFormOpen = (val) => {
        setFormOpen(val)
    }

    //--------------------------------------------------------UI-ELEMENTS-------------------------------------------------------------     
    const feedBackToast =  (<Snackbar 
        autoHideDuration={1000}
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        key={vertical + horizontal}
        >
          <Alert severity="error">{error}</Alert>
        </Snackbar>)

    const table = purchaseReqs ? (
        <MaterialTable style={{ padding: "0px", boxShadow: "0 0 2px 2px black" }}
            title={"PR" }
            columns={columns}
            data={purchaseReqs}        
            actions={[
                {
                icon: 'add',
                tooltip: 'Add Request',
                isFreeAction: true,
                onClick: (event) => handleFormOpen(true)
                }
            ]}
            editable={{
                onRowDelete: oldData =>
                    new Promise((resolve, reject) => {
                        setTimeout(() => {
                            deletePurchaseReq(dispatch, oldData.id)
                            resolve()
                        }, 1000)
                }),

                onRowUpdate: (newData, oldData) =>
                    new Promise((resolve, reject) => {
                            setTimeout(() => {
                                let err = validatePr(newData);
                                if (err){
                                    setError(err);
                                    setState({ ...state, open: true });
                                    resolve();
                                }
                                else{
                                updatePurchaseReq(dispatch, newData)
                                resolve();
                                }
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
            <CashRequestForm setOpen={handleFormOpen} open={formOpen}/>
        <div style={{ padding: "20px",marginTop:"10px" }}>
            {table}
            {feedBackToast}
        </div>
        </div>

    )
}


export default CashOutflowTable