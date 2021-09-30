import React, { useEffect } from 'react';
import MaterialTable, { MTableToolbar } from 'material-table'
import { useDispatch, useSelector } from 'react-redux'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import CircularProgress from '@material-ui/core/CircularProgress';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import { validateProductObj ,deleteProduct ,createProduct,updateProduct ,fetchProducts} from '../../redux/actions/Product.action'
import { fetchSuppliers } from '../../redux/actions/Supplier.actions'
import { IconButton } from '@material-ui/core';
import { storageRef } from '../../base';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function ProductTable(props) {
    useEffect(() => {
        fetchProducts(dispatch);
        fetchSuppliers(dispatch);
    }, [])
    //*********************************************CONSTANTS************************************************************* */    
    const globalState = useSelector((state) => state);
    const dispatch = useDispatch();
    const products = globalState.productReducer.products ? globalState.productReducer.products : null
    const suppliers = globalState.productReducer.products ? globalState.supplierReducer.suppliers : null

    const [error, setError] = React.useState("")
    const [state, setState] = React.useState({
        open: false,
        vertical: 'bottom',
        horizontal: 'right',
    });
    const { vertical, horizontal, open } = state;
    const typeLookup = {
        HEADBAND: 'Headband',
        TURBAN:'Turban',
        SCRUNCHIE: 'Scrunchie',
        BANDANA:'Bandana'
    }

    var supplierLookup = {};
    if (suppliers) {
        suppliers.forEach(supplier => {
            supplierLookup[supplier.id] = supplier.supplierName
        })
    }
//*********************************************Setting columns************************************************************* */

    const columns =[
        { title: 'ID', field: 'id' },
        { title: 'Name', field: 'productName', },
        { title: 'Description', field: 'description' },
        { title: 'Type', field: 'type' , lookup:typeLookup},
        { title: 'Supplier', field: 'supplier',  lookup: supplierLookup },
        { title: 'Selling Price', field: 'sellingPrice' },
        { title: 'Buying Price', field: 'buyingPrice' },
        { title: 'Image', field: 'image', render: (rowData) => <ProductImage rowData={rowData} /> },
    ]




//*********************************************Event Handlers************************************************************* */

    const handleClose = () => {
        setState({ ...state, open: false });
    };

    const handleLinkUpdate = (url, rowData) => {
        rowData.rowData.image = url;
        console.log(rowData.rowData);
        updateProduct(dispatch, rowData.rowData);
    }

    const handleUpload = (e,rowData) => {
        const file = e.target.files[0];
        const fileRef = ref(storageRef, file.name);
        uploadBytes(fileRef, file).then((snapshot) => {
            console.log('File uploaded');
            getDownloadURL(ref(storageRef, file.name))
            .then((url) => {
                handleLinkUpdate(url,rowData);
            })
            .catch((error) => {
                // Handle any errors
            });
        });
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

    const ProductImage = (rowData) => {
        return (
        <div>
            <input 
                id="prodImage"
                label="Product Image"
                type="file"
                onChange={(e) => handleUpload(e,rowData)}
                accept=".jpg, .jpeg, .png"
            />
        </div>
    )};        

    const table = products ? (
        <MaterialTable style={{ padding: "0px", boxShadow: "0 0 2px 2px black", backgroundColor: 'rgba(255,255,255,0.7)' }}
            title={"Products"}
            columns={columns}
            data={products}
            detailPanel={[
            {
              icon:'download',
              tooltip: 'Download',
              render: rowData => {
                return (
                  <div> 

                    <a 
                    rel = "noreferrer"
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
                                let err = validateProductObj(newData)
                                 if(err == null){
                                    createProduct(newData,dispatch)
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
                            deleteProduct(dispatch, oldData.id)
                            resolve()
                        }, 1000)
                }),

                onRowUpdate: (newData, oldData) =>
                    new Promise((resolve, reject) => {
                            setTimeout(() => {
                                updateProduct(dispatch, newData)
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


export default ProductTable