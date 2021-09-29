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
import {
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    Row,
    Col,
} from "reactstrap";
import jsPDF from 'jspdf';
import html2canvas from "html2canvas";
import { Button } from '@material-ui/core';
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

    const demoFromHTML = (className, name) => {
        console.log(className)
        let input = window.document.getElementsByClassName(className)[0];
        const divHeight = input.clientHeight
        const divWidth = input.clientWidth
        const ratio = divHeight / divWidth;

        html2canvas(input)
            .then(canvas => {
                console.log(canvas);
                const imgData = canvas.toDataURL("image/png");
                const pdf = new jsPDF("l", "mm", "a0");

                const width = pdf.internal.pageSize.getWidth();
                let height = pdf.internal.pageSize.getHeight();
                height = ratio * width;
                pdf.addImage(imgData, "JPEG", 0, 0, width - 20, height + 10)
                pdf.save(name + ".pdf");
            })
            .catch(err => console.log(err.message));
    }

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
               <div className="divToPDF1" style={{    width: "46%"}}>
                <Card className="card-chart" style={{ boxShadow: "0px 1px 20px 2px rgb(0 0 0 / 20%)" }}>
                    <CardHeader>
                        <Row>
                            <Col className="text-left" sm="6">
                                <CardTitle tag="h2">Suppliers Removed</CardTitle>
                            </Col>
                            <Col sm="6">
                                <Button
                                    style={{ marginBottom: "10px" }}
                                    onClick={() => console.log("ici") || demoFromHTML("divToPDF1", "SUPREMOVED")}
                                    variant="contained">Download Pdf</Button>

                            </Col>
                        </Row>
                    </CardHeader>
                    <CardBody>
                        <div className={classes.rowDiv}>
                            <Paper className={classes.chartFullCover} variant="outlined">
                                <SuppliersCutoffPerMonth/>
                            </Paper>
                        </div>
                    </CardBody>
                </Card>
            </div>
            <div className="divToPDF2" style={{    width: "46%"}}>
                <Card className="card-chart" style={{ boxShadow: "0px 1px 20px 2px rgb(0 0 0 / 20%)" }}>
                    <CardHeader>
                        <Row>
                            <Col className="text-left" sm="6">
                                <CardTitle tag="h2">Supplier State</CardTitle>
                            </Col>
                            <Col sm="6">
                                <Button
                                    style={{ marginBottom: "10px" }}
                                    onClick={() => console.log("ici") || demoFromHTML("divToPDF2", "SUPSTATE")}
                                    variant="contained">Download Pdf</Button>

                            </Col>
                        </Row>
                    </CardHeader>
                    <CardBody>
                        <div className={classes.rowDiv}>
                            <Paper className={classes.chartFullCover} variant="outlined">
                            <SuppliersState />
                            </Paper>
                        </div>
                    </CardBody>
                </Card>
            </div>
            </div>
            <div className="divToPDF4">
                <Card className="card-chart" style={{ boxShadow: "0px 1px 20px 2px rgb(0 0 0 / 20%)" }}>
                    <CardHeader>
                        <Row>
                            <Col className="text-left" sm="6">
                                <CardTitle tag="h2">Onboarded suppliers</CardTitle>
                            </Col>
                            <Col sm="6">
                                <Button
                                    style={{ marginBottom: "10px" }}
                                    onClick={() => console.log("ici") || demoFromHTML("divToPDF4", "RoomsAvailable")}
                                    variant="contained">Download Pdf</Button>

                            </Col>
                        </Row>
                    </CardHeader>
                    <CardBody>
                        <div className={classes.rowDiv}>
                            <Paper className={classes.chartFullCover} variant="outlined">
                                <SuppliersAddedPerMonth />
                            </Paper>
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>

    );
}

export default SupplierInsights;
