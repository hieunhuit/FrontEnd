import React, { useEffect } from 'react';
// react plugin for creating charts
// @material-ui/core
import { makeStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
// @material-ui/icons
import Store from '@material-ui/icons/Store';
import Warning from '@material-ui/icons/Warning';
import DateRange from '@material-ui/icons/DateRange';
import LocalOffer from '@material-ui/icons/LocalOffer';
import Update from '@material-ui/icons/Update';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import AccessTime from '@material-ui/icons/AccessTime';
import Accessibility from '@material-ui/icons/Accessibility';
// core components
import GridItem from 'components/Grid/GridItem.js';
import GridContainer from 'components/Grid/GridContainer.js';
import Danger from 'components/Typography/Danger.js';
import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader.js';
import CardIcon from 'components/Card/CardIcon.js';
import CardBody from 'components/Card/CardBody.js';
import CardFooter from 'components/Card/CardFooter.js';
import { dailySalesChart } from 'variables/charts.js';

import DoughnutChart from 'components/ChartDonut/ChartDonut';
import styles from 'assets/jss/material-dashboard-react/views/dashboardStyle.js';
import cn from 'classnames';
import InfoPriority from 'components/InfoPriority/InfoPriority';
import { useSelector, useDispatch } from 'react-redux';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import ipInt from 'ip-to-int';
import LineChart from 'components/LineChart/LineChart';
import LineChartStream from 'components/LineChart/LineChartStream';
import LineChartCPU from 'components/LineChart/LineChartCPU';
import { SOCKET_ENDPOINT } from '../../constants/index';
import allActions from '../../actions';
import io from 'socket.io-client';
var isOnSite = true;



const socket = io(`${SOCKET_ENDPOINT}` + '/webapp');

const useStyles = makeStyles({
  ctChart: {
    backgroundColor: '#3bc0c3',
  },
  iconPriority: {
    fontSize: '60px',
    height: '99px',
    padding: '25px 13px',
    marginTop: '-20px',
    marginBottom: '-20px',
    marginRight: '-20px',
    background: 'rgba(255,255,255,.2)',
    flex: '1',
  },
  tableRowLiveMode: {
    padding: '0px',
  },
  sysInfoLiveMode: {
    height: '10%',
    width: '30%'
  },
  donutChart: {
  }
});

export default function Dashboard() {
  const classes = useStyles();
  const { listEvent } = useSelector((state) => state.eventLiveMode);
  const dispatch = useDispatch();
  useEffect(() => {
    var callSysInfo = setInterval(() => {
      socket.emit("getSystemInformation")
    }, 1000);

    socket.on("setSystemInformation", (data) => {
      // console.log(data)
      dispatch(allActions.eventActions.getSysInfoLiveMode(data))
    });
    return () => {
      console.log("cleare")
      clearInterval(callSysInfo);
    }
  }, [])
  return (
    <div>
      <GridContainer>
        <InfoPriority />
      </GridContainer>
      <GridContainer>
        <GridItem xs={6} sm={6} md={4}>
          <Card>
            <CardBody>
              <LineChart type='cpu' />
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={6} sm={6} md={4}>
          <Card>
            <CardBody>
              <LineChart  type='mem_percent' />
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={6} sm={6} md={4}>
          <Card>
            <CardBody>
              <LineChart  type='disk_used' />
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={6} sm={6} md={4}>
          <Card>
            <CardBody>
              <LineChartStream type='net_used_tx' />
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={8}>
          <TableContainer component={Paper} >
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>PRIORITY</TableCell>
                  <TableCell>SRC IP</TableCell>
                  <TableCell>DST IP</TableCell>
                  <TableCell>MESSAGE</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {listEvent.map((row) => {
                  return (
                    <TableRow >
                      <TableCell className={classes.tableRowLiveMode}>{row.sid}-{row.cid}</TableCell>
                      <TableCell className={classes.tableRowLiveMode}>{row.sig_priority}</TableCell>
                      <TableCell className={classes.tableRowLiveMode}>{ipInt(row.ip_src).toIP()}</TableCell>
                      <TableCell className={classes.tableRowLiveMode}>{ipInt(row.ip_dst).toIP()}</TableCell>
                      <TableCell className={classes.tableRowLiveMode}>{row.sig_name}</TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card>
            <CardBody>
              <DoughnutChart />
            </CardBody>
          </Card>
        </GridItem>

      </GridContainer>
    </div>
  );
}
