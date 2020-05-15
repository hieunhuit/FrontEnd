import React from 'react';
// react plugin for creating charts
import ChartistGraph from 'react-chartist';
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
});
export default function Dashboard() {
  const classes = useStyles();
  return (
    <div>
      <GridContainer>
        <InfoPriority />
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
          <Card chart>
            <CardHeader>
              <h4>RealTime</h4>
            </CardHeader>
            <CardBody>
              <ChartistGraph
                className={cn(classes.ctChart, 'ct-line')}
                data={dailySalesChart.data}
                type="Line"
                options={dailySalesChart.options}
                listener={dailySalesChart.animation}
              />
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> updated 4 minutes ago
              </div>
            </CardFooter>
          </Card>
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
