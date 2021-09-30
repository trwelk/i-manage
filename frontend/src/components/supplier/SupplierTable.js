import React, { useEffect, useState } from 'react';
import MaterialTable, { MTableToolbar } from 'material-table'
import { useDispatch, useSelector } from 'react-redux'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import CircularProgress from '@material-ui/core/CircularProgress';
import { validateSupplierObj, deleteSupplier, createSupplier, updateSupplier, fetchSuppliers } from '../../redux/actions/Supplier.actions'
import InsertSupplierForm from './InsertSupplierForm';

// import AdminNavbar from '../views/AdminNavBar';



function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function SupplierTable(props) {
    useEffect(() => {
        fetchSuppliers(dispatch);
    }, [])
    //*********************************************CONSTANTS************************************************************* */
    const location = props.location
    const globalState = useSelector((state) => state);
    const dispatch = useDispatch();
    const [formOpen, setFormOpen] = React.useState(false);

    const suppliers = globalState.productReducer.products ? globalState.supplierReducer.suppliers : null
    const [error, setError] = React.useState("")
    const [state, setState] = React.useState({
        open: false,
        vertical: 'bottom',
        horizontal: 'right',
    });
    const { vertical, horizontal, open } = state;
    const { useState } = React;

    const stateLookup = {REQUESTED:"REQUESTED",APPROVED:"APPROVED",DECLINED:"DECLINED"}


    var supplierLookup = {};
    if (suppliers) {
        suppliers.forEach(supplier => {
            supplierLookup[supplier.id] = supplier.supplierName
        })
    }
    //*********************************************Setting columns************************************************************* */

    const columns = [
        { title: 'ID', field: 'id', updatable: false },
        { title: 'Name', field: 'supplierName', },
        { title: 'contactNumber', field: 'contactNumber' },
        { title: 'contactEmail', field: 'contactEmail' },
        { title: 'methodOfContact', field: 'methodOfContact' },
        { title: 'state', field: 'state' , lookup: stateLookup},
        { title: 'rating', field: 'rating' },
        { title: 'contractDate', field: 'contractDate' },
        { title: 'contractExpDate', field: 'contractExpDate' },

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
    const feedBackToast = (<Snackbar
        autoHideDuration={1000}
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        key={vertical + horizontal}
    >
        <Alert severity="error">{error}</Alert>
    </Snackbar>)

    const table = suppliers ? (
        <MaterialTable style={{ padding: "0px", boxShadow: "0 0 2px 2px black" }}
            title={"Suppliers"}
            columns={columns}
            data={suppliers}
            actions={[
                {
                    icon: 'add',
                    tooltip: 'Add Supplier',
                    isFreeAction: true,
                    onClick: (event) => handleFormOpen(true)
                }
            ]}
            editable={{
                onRowDelete: oldData =>
                    new Promise((resolve, reject) => {
                        setTimeout(() => {
                            deleteSupplier(dispatch, oldData.id)
                            resolve()
                        }, 1000)
                    }),

                onRowUpdate: (newData, oldData) =>
                    new Promise((resolve, reject) => {
                        setTimeout(() => {
                            let err = validateSupplierObj(newData);
                            if (err){
                                setError(err);
                                setState({ ...state, open: true });
                                resolve();
                            }
                            else{
                                updateSupplier(dispatch, newData)
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
            <InsertSupplierForm setOpen={handleFormOpen} open={formOpen} />
            <div style={{ padding: "20px", marginTop: "10px" }}>
                {table}
                {feedBackToast}
            </div>
        </div>

    )
}


export default SupplierTable