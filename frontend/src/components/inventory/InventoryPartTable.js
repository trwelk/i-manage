import React, { useEffect, useState } from 'react';
import MaterialTable, { MTableToolbar } from 'material-table'
import { useDispatch, useSelector } from 'react-redux'
// import { fetchResearch } from '../../redux/actions/research.action';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import CircularProgress from '@material-ui/core/CircularProgress';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import { AppConstants } from '../../constants/AppConstants';
// import { updateResearch ,createResearch,deleteResearch ,validateResearchObj} from '../../redux/actions/research.action'
import { IconButton } from '@material-ui/core';
// import AdminNavbar from '../views/AdminNavBar';



function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function InventoryPartTable(props) {
    useEffect(() => {
        // fetchResearch(dispatch);
    }, [])
    //*********************************************CONSTANTS************************************************************* */
    const globalState = useSelector((state) => state);
    const dispatch = useDispatch();
    const researchPapers = globalState.inventoryReducer.inventory ? globalState.inventoryReducer.inventory : null
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
        { title: 'ID', field: 'id', editable: false },
        { title: 'Topic', field: 'paperTopic', },
        { title: 'Uploader', field: 'paperUploader' },
        { title: 'Uploader Email', field: 'email' },
        { title: 'Link', field: 'paperLink' },
        {
            title: 'Status', field: 'state',
            lookup: stateLookup
        },
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

    const table = researchPapers ? (
        <MaterialTable style={{ padding: "0px", boxShadow: "0 0 2px 2px black" }}
            title={"Research Papers"}
            columns={columns}
            data={researchPapers}
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
                                // if(err == null){
                                //     createResearch(newData,dispatch)
                                //     resolve();
                                // }
                                // else{
                                //     setError(err)
                                //     setState({...state,open:true})
                                //     reject();
                                // }
                            }, 1000)

                    }),
                onRowDelete: oldData =>
                    new Promise((resolve, reject) => {
                        setTimeout(() => {
                            //setData([...dataDelete]);
                            // deleteResearch(dispatch, oldData.id)
                            resolve()
                        }, 1000)
                }),

                onRowUpdate: (newData, oldData) =>
                    new Promise((resolve, reject) => {
                            setTimeout(() => {
                                // updateResearch(dispatch, newData)
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


export default InventoryPartTable