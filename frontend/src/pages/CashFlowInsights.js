import React, { useEffect, useState } from 'react';
import CashOutflowChart from '../components/purchaseReq/CashOutflowChart';
import PurchaseReqByStateChart from '../components/purchaseReq/PurchaseReqByStateChart';
import PurchaseReqsClearedPerMonthChart from '../components/purchaseReq/PurchaseReqsClearedPerMonthChart';
import WeeklyCashOutflowChart from '../components/purchaseReq/WeeklyCashOutflowChart';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { useDispatch, useSelector } from 'react-redux'
import { fetchPurchaseReqs } from '../redux/actions/PurchaseReq.actions'
import { AppConstants } from '../constants/AppConstants';
import InsightsImage from '../assets/images/icon_insights.png'
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
    statCardCover: {
        width: "35%",
        height: "100px",
        marginBottom: "30px",
        marginTop: "30px",
        display: "flex",
        backgroundColor: theme.palette.admin.main
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
    },   
     chartFullCover: {
        width: "90%",
        marginBottom: "30px"
    },

}));

function CashFlowInsights() {

    useEffect(() => {
        fetchPurchaseReqs(dispatch);
    }, [])
    const dispatch = useDispatch();
    const classes = useStyles();
    const globalState = useSelector((state) => state);
    const purchaseReqs = globalState.purchaseReq.purchaseReqs
    let totalThisYear = 0;
    let totalThisMonth = 0

    purchaseReqs?.forEach(purchaseReq => {
        if (new Date().getUTCFullYear() === new Date(purchaseReq.dateResolved).getUTCFullYear()
            && purchaseReq.state == AppConstants.STATE_CLEARED) {
            var month = new Date(purchaseReq.dateResolved).getMonth();
            totalThisYear += purchaseReq.totalAmount;
            if(new Date().getMonth() === month){
                totalThisMonth += purchaseReq.totalAmount;
            }
        }
    });
    return (
        <div  className="fullwidth">
            <div className={classes.rowDiv}>
                <Paper className={classes.statCardCover} variant="outlined">
                    <div className={classes.imgCover}>
                        <img src={InsightsImage}/>
                    </div>
                    <div className={classes.statText}>
                        <div>
                            <h3 style={{margin:"0px"}}>Total Cash Outflow this year</h3>
                        </div>
                        {totalThisYear}
                    </div>
                </Paper>
                <Paper className={classes.statCardCover} variant="outlined">
                    <div className={classes.imgCover}>
                        <img src={InsightsImage}/>
                    </div>
                    <div className={classes.statText}>
                        <div>
                            <h3 style={{margin:"0px"}}>Total Cash Outflow this month</h3>
                        </div>
                        {totalThisMonth}
                    </div>
                </Paper>
            </div>
            <div className={classes.rowDiv}>
                <Paper className={classes.chartCover} variant="outlined">
                    <PurchaseReqByStateChart />
                </Paper>
                <Paper className={classes.chartCover} variant="outlined">
                    <PurchaseReqsClearedPerMonthChart />
                </Paper>
            </div>
            <div className={classes.rowDiv}>
                <Paper className={classes.chartFullCover} variant="outlined">
                    <CashOutflowChart />
                </Paper>
            </div>
        </div>

    );
}

export default CashFlowInsights;