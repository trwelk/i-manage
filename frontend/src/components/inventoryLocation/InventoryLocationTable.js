import React, { useEffect, useState } from 'react';
import MaterialTable, { MTableToolbar } from 'material-table'
import { useDispatch, useSelector } from 'react-redux'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import CircularProgress from '@material-ui/core/CircularProgress';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import { AppConstants } from '../../constants/AppConstants';
import { deleteLocation ,createLocation,updateLocation ,fetchInventoryLocations} from '../../redux/actions/InventoryLocations.actions'
import { IconButton } from '@material-ui/core';
// import AdminNavbar from '../views/AdminNavBar';



function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function InventoryLocationTable(props) {
    useEffect(() => {
        fetchInventoryLocations(dispatch);
    }, [])
    //*********************************************CONSTANTS************************************************************* */
    const location = props.location     
    const globalState = useSelector((state) => state);
    const dispatch = useDispatch();
    const locations = globalState.inventoryLocationReducer.inventoryLocations ? globalState.inventoryLocationReducer.inventoryLocations : null
    const [error, setError] = React.useState("")
    const [state, setState] = React.useState({
        open: false,
        vertical: 'bottom',
        horizontal: 'right',
    });
    const { vertical, horizontal, open } = state;
    const { useState } = React;
    const stateLookup = {
        requested: AppConstants.STATE_REQUESTED,
        approved: AppConstants.STATE_APPROVED,
        declined: AppConstants.STATE_DECLINED
    }

//*********************************************Setting columns************************************************************* */

    const [columns, setColumns] = useState([
        { title: 'ID', field: 'id' },
        { title: 'Name', field: 'locationName', },
        { title: 'Description', field: 'locationDescription' },
        { title: 'Address', field: 'address' },
        { title: 'City', field: 'city' },
        { title: 'Country', field: 'country' },
        { title: 'Manager', field: 'manager' }
        ]);




//*********************************************Event Handlers************************************************************* */

    const handleClick = (newState) => () => {
        setState({ open: true, ...newState });
    };

    const handleClose = () => {
        setState({ ...state, open: false });
    };



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

    const table = locations ? (
        <MaterialTable style={{ padding: "0px", boxShadow: "0 0 2px 2px black" }}
            title={"locations"}
            columns={columns}
            data={locations}
            detailPanel={[
            {
              icon:'download',
              tooltip: 'Download',
              render: rowData => {
                return (
                  <div> 

                    <a 
                    href={rowData.paperLink} 
                    target="_blank"download>
                                              <IconButton>
                          <CloudDownloadIcon/>
                      </IconButton>download</a>
                  </div>

                    
                )
              },
            },
          ]}
            editable={{
                onRowAdd: newData =>
                    new Promise((resolve, reject) => {
                            setTimeout(() => {
                                // let err = validateResearchObj(newData)
                                let err = null;
                                if(err == null){
                                    createLocation(newData,dispatch)
                                    resolve();
                                }
                                else{
                                    setError(err)
                                    setState({...state,open:true})
                                    reject();
                                }
                            }, 1000)

                    }),
                onRowDelete: oldData =>
                    new Promise((resolve, reject) => {
                        setTimeout(() => {
                            deleteLocation(dispatch, oldData.id)
                            resolve()
                        }, 1000)
                }),

                onRowUpdate: (newData, oldData) =>
                    new Promise((resolve, reject) => {
                            setTimeout(() => {
                                updateLocation(dispatch, newData)
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
        <div style={{ padding: "20px",marginTop:"10px" }}>
            {table}
            {feedBackToast}
        </div>
        </div>

    )
}


export default InventoryLocationTable