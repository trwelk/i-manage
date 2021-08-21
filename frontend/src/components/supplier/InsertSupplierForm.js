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
import { createSupplier } from '../../redux/actions/Supplier.actions';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

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


export default function InsertSupplierForm() {
    const [open, setOpen] = React.useState(false);
    const [state, setState] = React.useState({
        id: "", supplierName: "", note: "", contractDate: null, contractExpDate: null,
        contactNumber: "", contactEmail: "", currencyCode: "", rating: "", methodOfContact: ""
    });
    const [openFeedback, setOpenFeedback] = React.useState({
        openf: false,
        vertical: 'bottom',
        horizontal: 'right',
    });
    const { vertical, horizontal, openf } = openFeedback
    const [error, setError] = React.useState("");
    const [selectedTags, setSelectedTags] = React.useState([]);
    const dispatch = useDispatch();
    const classes = useStyles();



    // Event handlers
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = () => {
        createSupplier(state, dispatch);
        setOpen(false);
    };

    const handleChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value })
        console.log(state)
    }

    return (
        <div>
            <Button
                variant="contained"
                color="primary"
                size="large"
                className={classes.buttonIcon}
                startIcon={<ShoppingCartIcon />}
                onClick={handleClickOpen}
            >
                Add workshop
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" >
                <DialogTitle id="form-dialog-title">Workshops</DialogTitle>
                <div style={{ marginLeft: "20px", color: "red" }}>{error ? error : ""}</div>
                <DialogContent className={classes.dialog}>
                    <form className={classes.root} noValidate autoComplete="off">
                        <div className={classes.textFieldCover}>
                            <TextField className={classes.textField} onChange={handleChange} required label="Id" name="id" variant="outlined" />
                            <TextField className={classes.textField} onChange={handleChange} required style={{ width: "300px" }}
                                name="supplierName" label="Supplier Name" variant="outlined" />
                        </div>
                        <div className={classes.textFieldCover}>
                            <TextField className={classes.textField} onChange={handleChange} required label="Currency Code"
                                name="currencyCode" variant="outlined" />
                            <TextField className={classes.textField} onChange={handleChange} style={{ width: "300px" }}
                                name="rating" label="Rating" type="number" variant="outlined" />
                        </div>
                        <div className={classes.textFieldCover}>
                            <TextField className={classes.textField} variant="outlined" fullWidth multiline rows={4} required label="Note"
                                name="note" />
                        </div>
                        <div className={classes.textFieldCover}>
                            <TextField label="Contract Date" name="contractDate" type="date" style={{ minWidth: "220px" }} className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onChange={handleChange}
                            />
                            <TextField label="Contract Expiry" name="contractExpDate" type="date" style={{ minWidth: "300px" }} className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onChange={handleChange}
                            />
                        </div>
                        <div className={classes.textFieldCover}>
                            <TextField onChange={handleChange} className={classes.textField} required type="number"
                                name="contactNumber" label="contact Number" variant="outlined" />
                            <TextField onChange={handleChange} className={classes.textField} required type="email"
                                name="contactEmail" style={{ width: "300px" }} label="Email" variant="outlined" />
                        </div>
                        <div className={classes.textFieldCover} style={{ margin: "5px 0px 18px 0px" }}>
                            <TextField
                                id="standard-select-currency"
                                select
                                label="Method Of Contact"
                                onChange={handleChange}
                                fullWidth
                                name="methodOfContact"
                            >
                                <MenuItem value="EMAIL"> Email </MenuItem>
                                <MenuItem value="PHONE"> Phone </MenuItem>
                            </TextField>
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
