import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import allActions from '../../actions';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { NavLink } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import ReloadIcon from '@material-ui/icons/ReplayOutlined';
import Button from '@material-ui/core/Button';
import cn from 'classnames';
import CheckBoxRoundedIcon from '@material-ui/icons/CheckBoxRounded';
import HighlightOffRoundedIcon from '@material-ui/icons/HighlightOffRounded';
import TableHead from '@material-ui/core/TableHead';
import StopRoundedIcon from '@material-ui/icons/StopRounded';
import PlayArrowRoundedIcon from '@material-ui/icons/PlayArrowRounded';
import CachedRoundedIcon from '@material-ui/icons/CachedRounded';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import AddIcon from '@material-ui/icons/Add';
ListInterface.propTypes = {
  interfacesAvailable: PropTypes.array,
  interfacesConfigured: PropTypes.array,
  onChangeStatus: PropTypes.func,
  onRestart: PropTypes.func,
  onDelete: PropTypes.func,
};
ListInterface.defaultProps = {
  interfacesAvailable: [],
  interfacesConfigured: [],
  onChangeStatus: null,
  onRestart: null,
  onDelete: null,
};
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  iconAction: {
    cursor: 'pointer',
    padding: '0px',
  },
  iconAdd: {
    color: '#fFF',
    backgroundColor: '#28a745',
    fontSize: '12px',
    borderRadius: '5px',
    width: '60px',
  },
});
function createData(sid, name, status, description) {
  return { sid, name, status, description };
}

function ListInterface(props) {
  const { interfacesAvailable, interfacesConfigured, onChangeStatus, onRestart, onDelete } = props;
  console.log(interfacesConfigured);
  let rows = interfacesConfigured.map((item) => {
    return createData(item.sid, item.interface, item.status, 'LAN');
  });
  const classes = useStyles();
  const handleToggleStatus = (sid) => {
    if (onChangeStatus) onChangeStatus(sid);
  };
  const handleRestartInterface = (sid) => {
    if (onRestart) onRestart(sid);
  };
  const handleDeleteInterface = (sid) => {
    if (onDelete) onDelete(sid);
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table className={classes.table} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Interface</TableCell>
              <TableCell align="right">Snort status</TableCell>
              <TableCell align="right">Description</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.sid}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">
                  {row.status === true ? (
                    <>
                      <CheckBoxRoundedIcon style={{ color: '#30c630' }} />
                      <IconButton className={classes.iconAction}>
                        <StopRoundedIcon size="small" onClick={() => handleToggleStatus(row.sid)} />
                      </IconButton>
                      <IconButton className={classes.iconAction}>
                        <CachedRoundedIcon size="small" onClick={() => handleRestartInterface(row.sid)} />
                      </IconButton>
                    </>
                  ) : (
                    <>
                      <HighlightOffRoundedIcon style={{ color: '#ca2d2d' }} />
                      <IconButton className={classes.iconAction}>
                        <PlayArrowRoundedIcon size="small" onClick={() => handleToggleStatus(row.sid)} />
                      </IconButton>
                    </>
                  )}
                </TableCell>
                <TableCell align="right">{row.description}</TableCell>
                <TableCell align="right">
                  <NavLink to={`/admin/interface/${row.sid}`}>
                    <IconButton className={classes.iconAction}>
                      <EditIcon />
                    </IconButton>
                  </NavLink>

                  <IconButton className={classes.iconAction}>
                    <DeleteForeverIcon onClick={() => handleDeleteInterface(row.sid)} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {interfacesAvailable.length > 0 && (
        <NavLink to={'/admin/interface/config'}>
          <Button variant="contained" color="secondary" style={{ float: 'right', margin: '5px' }}>
            <AddIcon />
            NEW
          </Button>
        </NavLink>
      )}
    </div>
  );
}

export default ListInterface;
