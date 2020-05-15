import React, { useEffect } from 'react';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
// core components
import Quote from 'components/Typography/Quote.js';
import Muted from 'components/Typography/Muted.js';
import Primary from 'components/Typography/Primary.js';
import Info from 'components/Typography/Info.js';
import Success from 'components/Typography/Success.js';
import Warning from 'components/Typography/Warning.js';
import Danger from 'components/Typography/Danger.js';
import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader.js';
import CardBody from 'components/Card/CardBody.js';

import ListInterface from 'components/ListInterface/ListInterface';
import { useSelector, useDispatch } from 'react-redux';

import allActions from '../../actions';
const styles = {
  typo: {
    paddingLeft: '25%',
    marginBottom: '40px',
    position: 'relative',
  },
  note: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    bottom: '10px',
    color: '#c0c1c2',
    display: 'block',
    fontWeight: '400',
    fontSize: '13px',
    lineHeight: '13px',
    left: '0',
    marginLeft: '20px',
    position: 'absolute',
    width: '260px',
  },
  cardCategoryWhite: {
    color: 'rgba(255,255,255,.62)',
    margin: '0',
    fontSize: '14px',
    marginTop: '0',
    marginBottom: '0',
  },
  cardTitleWhite: {
    color: '#FFFFFF',
    marginTop: '0px',
    minHeight: 'auto',
    fontWeight: '300',
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: '3px',
    textDecoration: 'none',
  },
  cardHeader: {
    backgroundColor: '#1d3557',
  },
};

const useStyles = makeStyles(styles);

export default function Interface() {

  const classes = useStyles();
  const { interfacesAvailable, interfacesConfigured } = useSelector((state) => state.interfaces);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(allActions.uiActions.setStatusCallApi(false));
  }, []);
  const handleChangeStatus = (sid) => {
    dispatch(allActions.interfaceActions.toggleStatusInterface(sid));
  };
  const handleRestart = (sid) => {
    dispatch(allActions.interfaceActions.restartInterface(sid));
  };
  const handleDelete = (sid) => {
    dispatch(allActions.interfaceActions.deleteInterface(sid));
  };
  return (
    <Card>
      <CardHeader className={classes.cardHeader}>
        <h4 className={classes.cardTitleWhite}>Interface</h4>
      </CardHeader>
      <CardBody>
        <ListInterface
          onChangeStatus={handleChangeStatus}
          onRestart={handleRestart}
          interfacesAvailable={interfacesAvailable}
          interfacesConfigured={interfacesConfigured}
          onDelete={handleDelete}
        />
      </CardBody>

    </Card>
  );
}
