import React, { useEffect, useState } from 'react';
import SuppliersAddedPerMonth from '../components/supplier/SuppliersAddedPerMonth';
import SuppliersCutoffPerMonth from '../components/supplier/SuppliersCutoffPerMonth';
import SuppliersState from '../components/supplier/SuppliersState';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { useDispatch, useSelector } from 'react-redux'
import { fetchSuppliers } from '../redux/actions/Supplier.actions'
import { AppConstants } from '../constants/AppConstants';
import InsightsImage from '../assets/images/icon_insights.png'
import App from '../App';

const useStyles = makeStyles((theme) => ({
    rowDiv: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly"
    },
    chartCover: {
        width: "35%",
        marginBottom: "30px"
    },
    chartFullCover: {
        width: "90%",
        marginBottom: "30px"
    },
    statCardCover: {
        width: "35%",
        height: "100px",
        marginBottom: "30px",
        marginTop: "30px",
        display: "flex"
    },
    imgCover: {
        height: "100%",
        width: "40%"
    },
    statText: {
        height: "100%",
        width: "60%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
    }

}));

function SupplierInsights() {
    useEffect(() => {
        fetchSuppliers(dispatch);
    }, [])
    const dispatch = useDispatch();
    const classes = useStyles();
    const globalState = useSelector((state) => state);
    const suppliers = globalState.supplierReducer.suppliers
    let supplierCount = 0;
    let bestSupplier = {rating:0};

    suppliers?.forEach(supplier => {
        if(supplier.state === AppConstants.STATE_APPROVED)
        supplierCount++;
        if(supplier.rating > bestSupplier.rating)
            bestSupplier = supplier
    });
    return (
        <div  className="fullwidth">
            <div className={classes.rowDiv}>
                <Paper className={classes.statCardCover} variant="outlined">
                    <div className={classes.imgCover}>
                        <img src={InsightsImage} />
                    </div>
                    <div className={classes.statText}>
                        <div>
                            <h3 style={{ margin: "0px" }}>Total Number of suppliers</h3>
                        </div>
                        {supplierCount}
                    </div>
                </Paper>
                <Paper className={classes.statCardCover} variant="outlined">
                    <div className={classes.imgCover}>
                        <img src={InsightsImage} />
                    </div>
                    <div className={classes.statText}>
                        <div>
                            <h3 style={{ margin: "0px" }}>Best Supplier</h3>
                        </div>
                        {bestSupplier.supplierName}
                    </div>
                </Paper>
            </div>
            <div className={classes.rowDiv}>
                <Paper className={classes.chartCover} variant="outlined">
                    <SuppliersCutoffPerMonth />
                </Paper>
                <Paper className={classes.chartCover} variant="outlined">
                    <SuppliersState />
                </Paper>
            </div>
            <div className={classes.rowDiv}>
                <Paper className={classes.chartFullCover} variant="outlined">
                    <SuppliersAddedPerMonth />
                </Paper>
            </div>
        </div>

    );
}

export default SupplierInsights;
