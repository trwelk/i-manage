import React, { useEffect } from 'react';
import MaterialTable, { MTableToolbar } from 'material-table'
import { useDispatch, useSelector } from 'react-redux'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import CircularProgress from '@material-ui/core/CircularProgress';
import { fetchOrders ,updateOrder ,deleteOrder} from '../../redux/actions/Order.actions'
import { useHistory } from "react-router-dom";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    detailTable: {
        marginTop: '20',
        minWidth: 450,
    },
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    }
}));

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function OrderTable(props) {
    useEffect(() => {
        fetchOrders(dispatch);
    }, [])
    //*********************************************CONSTANTS************************************************************* */  
    const globalState = useSelector((state) => state);
    const dispatch = useDispatch();
    const orders = globalState.orderReducer.orders ? globalState.orderReducer.orders : null
    const error = "";
    let history = useHistory();
    const [state, setState] = React.useState({
        open: false,
        vertical: 'bottom',
        horizontal: 'right',
    });
    const { vertical, horizontal, open } = state;
    const classes = useStyles();

//*********************************************Setting columns************************************************************* */

    const columns = [
        { title: 'User Id', field: 'userId', editable: 'never'},
        { title: 'Source', field: 'source', editable: 'never' },
        { title: 'Date', field: 'date', editable: 'never' },
        { title: 'Total', field: 'total', editable: 'never' },
        { 
            title: 'Status', 
            field: 'status',
            lookup: {'New': 'New', 'Completed': 'Completed', 'Processing': 'Processing', 'Delivered': 'Delivered'}
        }
    ];

//*********************************************Event Handlers************************************************************* */ 

    const handleOrderAdd = () => {
        history.push('/admin/orders/new');
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

    const table = orders ? (
        <MaterialTable style={{ padding: "0px", boxShadow: "0 0 2px 2px black", backgroundColor: 'rgba(255,255,255,0.7)' }}
            title={"Orders"}
            columns={columns}
            data={orders}
            editable={{
                onRowDelete: oldData =>
                    new Promise((resolve, reject) => {
                        setTimeout(() => {
                            deleteOrder(dispatch, oldData.id)
                            resolve()
                        }, 1000)
                }),
                onRowUpdate: (newData, oldData) =>
                    new Promise((resolve, reject) => {
                            setTimeout(() => {
                                updateOrder(dispatch, newData)
                                resolve();
                            }, 1000)
                    }),
            }}
            options={{
                pageSize: 10,
                exportButton: true,
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
            actions={[
                {
                  icon: 'add',
                  tooltip: 'Add Order',
                  isFreeAction: true,
                  onClick: (event) => handleOrderAdd()
                }
            ]}
            detailPanel={[
                {
                  tooltip: 'Show More',
                  render: rowData => {
                    return (
                    <TableContainer component={Paper}>
                        <Table className={classes.detailTable} aria-label="simple table">
                            <TableHead>
                            <TableRow>
                                <TableCell className={classes.head}>Product</TableCell>
                                <TableCell className={classes.head} align="right">Quantity</TableCell>
                                <TableCell className={classes.head} align="right">Price</TableCell>
                                <TableCell className={classes.head} align="right">Total</TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {rowData.items.map((row) => (
                                <TableRow key={row.name}>
                                <TableCell component="th" scope="row">
                                    {row.productName}
                                </TableCell>
                                <TableCell align="right">{row.qty}</TableCell>
                                <TableCell align="right">{row.price}</TableCell>
                                <TableCell align="right">{row.price * row.qty}</TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                        </TableContainer>
                    )
                  },
                }
            ]}
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


export default OrderTable