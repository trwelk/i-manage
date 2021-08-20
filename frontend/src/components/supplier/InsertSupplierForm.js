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
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
// import { fetchWorkshopTags } from '../../redux/actions/WorkshopTag.action';
// import { createWorkshop , validateWorkshopObj} from '../../redux/actions/Wokshop.action';
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
    const [state, setState] = React.useState({ id:"",supplierName: "", note: "", contractDate: null, contractExpDate: null,
        contactNumber: "", contactEmail: "" , currencyCode: "" , rating: "" });
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
    const globalState = useSelector((state) => state);
    // const tags = globalState.workshopTag.workshopTags
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: 48 * 4.5 + 5,
                width: 250,
            },
        },
    };

    useEffect(() => {
        // fetchWorkshopTags(dispatch)
    }, [])
    // Event handlers
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = () => {
        // let err = validateWorkshopObj(state)
        // setError(err)
        // if(error == null){
        //     createWorkshop({ ...state, tags: selectedTags }, dispatch,);
        //     setOpen(false)
        // }

    };

    const handleChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value })
        console.log(state)
    }
    const handleTagChange = (event) => {
        setSelectedTags(event.target.value);
    };


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
                        <div className={classes.textFieldCover}  style={{margin:"5px 0px 18px 0px"}}>
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
