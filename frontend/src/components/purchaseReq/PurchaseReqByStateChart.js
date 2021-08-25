import React, { useEffect, useState } from 'react';
import Container from '@material-ui/core/Container';
import {useDispatch, useSelector} from 'react-redux'
import { Line, Bar, Pie } from "react-chartjs-2";
import { Card, CardHeader ,CardBody } from "reactstrap";
import {fetchPurchaseReqs} from '../../redux/actions/PurchaseReq.actions'
import { makeStyles } from '@material-ui/core/styles';
import { AppConstants } from '../../constants/AppConstants';

const useStyles = makeStyles((theme) => ({
    chartCoverBody: {
        background:"#00083f",
        width:"100%",
        height:"100%"
    },

}));

function PurchaseReqByStateChart(props) {
    
    useEffect(() => {
        fetchPurchaseReqs(dispatch);
    },[])

  //*********************************************CONSTANTS************************************************************* */

    const dispatch = useDispatch();
    const globalState = useSelector((state) => state);
    const purchaseReqs = globalState.purchaseReq.purchaseReqs
    const classes = useStyles();
    
    let chartData = [];

    chartData[AppConstants.STATE_APPROVED]  = 0
    chartData[AppConstants.STATE_REQUESTED] = 0
    chartData[AppConstants.STATE_DECLINED]  = 0
    chartData[AppConstants.STATE_CLEARED]  = 0

    purchaseReqs?.forEach( purchaseReq => {
        var state = purchaseReq.state;
        chartData[state]++;
    });
    console.log(globalState)
    let chartOptions = {
        maintainAspectRatio: false,
        legend: {
          display: false
        },
        tooltips: {
          backgroundColor: "#f5f5f5",
          titleFontColor: "#333",
          bodyFontColor: "#666",
          bodySpacing: 4,
          xPadding: 12,
          mode: "nearest",
          intersect: 0,
          position: "nearest"
        },
        responsive: true,
        scales: {
          yAxes: [
            {
              barPercentage: 1.6,
              gridLines: {
                drawBorder: false,
                color: "rgba(29,140,248,0.0)",
                zeroLineColor: "transparent"
              },
              ticks: {
                suggestedMin: 0,
                padding: 20,
                fontColor: "#9a9a9a"
              }
            }
          ],
          xAxes: [
            {
              barPercentage: 1.6,
              gridLines: {
                drawBorder: false,
                color: "rgba(29,140,248,0.1)",
                zeroLineColor: "transparent"
              },
              ticks: {
                padding: 20,
                fontColor: "#9a9a9a"
              }
            }
          ]
        }
      };

    const suppliersAddedByMonthChart = canvas => {
          let ctx = canvas.getContext("2d");
      
          let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);
      
          gradientStroke.addColorStop(1, "rgba(29,140,248,0.2)");
          gradientStroke.addColorStop(0.4, "rgba(29,140,248,0.0)");
          gradientStroke.addColorStop(0, "rgba(29,140,248,0)"); //blue colors
      
          return {
            labels: [AppConstants.STATE_APPROVED,AppConstants.STATE_REQUESTED,AppConstants.STATE_DECLINED,AppConstants.STATE_CLEARED],
            datasets: [
              {
                label: "Purchase Requisitions",
                fill: true,
                backgroundColor: gradientStroke,
                borderColor: "#1f8ef1",
                borderWidth: 2,
                borderDash: [],
                borderDashOffset: 0.0,
                pointBackgroundColor: "#1f8ef1",
                pointBorderColor: "rgba(255,255,255,0)",
                pointHoverBackgroundColor: "#1f8ef1",
                pointBorderWidth: 20,
                pointHoverRadius: 4,
                pointHoverBorderWidth: 15,
                pointRadius: 4,
                data: [chartData[AppConstants.STATE_APPROVED],chartData[AppConstants.STATE_REQUESTED],
                       chartData[AppConstants.STATE_DECLINED],chartData[AppConstants.STATE_CLEARED]]
              }
            ]
          };
        }
    return (
        <div>
            <Card >
                <CardBody className={classes.chartCoverBody}>
                <div className="chart-area">
                  <Line
                    data={suppliersAddedByMonthChart}
                    options={chartOptions}
                    height={400}
                  />
                  </div>

                </CardBody>
            </Card>
        </div>
    );
}



export default PurchaseReqByStateChart;