import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'

import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';                                                                                                                                                            
import Paper from '@material-ui/core/Paper';
import { fetchInventoryLocations , setSelectedInventoryLocation} from '../../redux/actions/InventoryLocations.actions';


const useStyles = makeStyles((theme) => ({
    button: {
        display: 'block',
        marginTop: theme.spacing(2),
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    container: {
        height: "100px",
        width: "98%",
        margin: "auto",
        marginTop: "10px",
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-around",
        alignItems:'center'
    }
}));


function InvLocationHeaderWithSelector() {
    const classes = useStyles();
    const globalState = useSelector((state) => state);
    const dispatch = useDispatch();
    const [location, setLocation] = React.useState("");
    const [open, setOpen] = React.useState(false);

    const inventoryLocations = globalState.inventoryLocationReducer.inventoryLocations
    console.log(globalState.inventoryLocationReducer.selectedInventory)
    const selectedInventoryLocation = globalState.inventoryLocationReducer.selectedInventory ?
                                        globalState.inventoryLocationReducer.selectedInventory : 
                                            {locationName:"",city:"",country:"",manager:""}

    console.log(selectedInventoryLocation)
    useEffect(() => {
        fetchInventoryLocations(dispatch);
    }, [])

    const handleChange = (event) => {
        let location = event.target.value
        console.log(location)
        setLocation(location);
        dispatch(setSelectedInventoryLocation(event.target.value));
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const selectorMenuItems = inventoryLocations.map( location => {
        return(
            <MenuItem value={location.locationName}>{location.locationName}</MenuItem>
        )
    })
    return (
        <Paper variant="outlined" className={classes.container}>
                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-controlled-open-select-label">Location</InputLabel>
                    <Select
                        labelId="demo-controlled-open-select-label"
                        id="demo-controlled-open-select"
                        open={open}
                        onClose={handleClose}
                        onOpen={handleOpen}
                        value={location}
                        onChange={handleChange}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        {selectorMenuItems}
                    </Select>
                </FormControl>
                <TextField
                    disabled
                    id="outlined-disabled"
                    label="City"
                    defaultValue=""
                    value={selectedInventoryLocation.city}
                    variant="outlined"
                />
                <TextField
                    disabled
                    id="outlined-disabled"
                    label="Country"
                    defaultValue=""
                    value={selectedInventoryLocation.country}
                    variant="outlined"
                />
                <TextField
                    disabled
                    id="outlined-disabled"
                    label="Manager"
                    defaultValue=""
                    value={selectedInventoryLocation.manager}
                    variant="outlined"
                />
        </Paper>

    );
}

export default InvLocationHeaderWithSelector;
