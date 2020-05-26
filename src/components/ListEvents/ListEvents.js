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
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import ClearAllIcon from '@material-ui/icons/ClearAll';

import Button from '@material-ui/core/Button';
import cn from 'classnames';
import ipInt from 'ip-to-int';
import EnhancedTableToolbar from './EnhencedToolbar';
import EnhancedTableHead from './EnhencedTableHead';
import { NavLink } from 'react-router-dom';
import moment from 'moment';
function createData(time, id, protocol, priority, srcIp, dstIp, type, msg) {
  return { time, id, protocol, srcIp, dstIp, priority, type, msg };
}
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: '#ecf0f5',
    },
  },
}))(TableRow);
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },

  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 650,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
  priority: {
    width: '30px',
    height: '10px',
  },
  high: {
    backgroundColor: 'red',
  },
  medium: {
    backgroundColor: 'yellow',
  },
  low: {
    backgroundColor: 'green',
  },
  cell: {
    padding: '0px 0px',
    fontSize: '12px',
  },
  wrapperActions: {
    display: 'flex',
    justifyContent: 'space-between',
    height: '52px',
  },
  button: {
    fontSize: '12px',
  },
}));

EnhancedTable.propTypes = {
  events: PropTypes.array,
  selected: PropTypes.array.isRequired,
  totalRows: PropTypes.number,
};
EnhancedTable.defaultProps = {
  events: [],
  totalRows: 0,
};
export default function EnhancedTable(props) {
  const classes = useStyles();
  const { events, selected, totalRows } = props;
  const { page, limit, sid } = useSelector((state) => state.filters);
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('datetime');
  const dispatch = useDispatch();
  let rows = events.map((event) =>
    createData(
      event.timestamp,
      event.sid + '-' + event.cid,
      event.Iphdr.ip_proto,
      event.Signature.sig_priority,
      event.Iphdr.ip_src,
      event.Iphdr.ip_dst,
      event.Signature.SigClass.sig_class_name,
      event.Signature.sig_name,
    )
  );
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    console.log(property);
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.id);

      dispatch(allActions.eventActions.setSelectedEvent(newSelecteds));
      return;
    }
    dispatch(allActions.eventActions.setSelectedEvent([]));
  };

  const handleChangePage = (event, newPage) => {
    //page trong component listevent dc danh index bat dau tu 0 nen phair + 1
    dispatch(allActions.filterActions.setCurrentPage(newPage + 1));
  };

  const handleChangeRowsPerPage = (event) => {
    dispatch(allActions.filterActions.setRowPerPage(parseInt(event.target.value, 10)));
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;
  const handleCheckboxChange = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else {
      selected.splice(selectedIndex, 1);
      newSelected = newSelected.concat(selected);
    }

    dispatch(allActions.eventActions.setSelectedEvent(newSelected));
  };

  const handleDeleteAll = () => {
    dispatch(allActions.eventActions.deleteAllEvent({ sid }));
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer style={{ paddingTop: '5px' }}>
          <Table size="small" className={classes.table} aria-labelledby="tableTitle" aria-label="enhanced table">
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy)).map((row, index) => {
                const isItemSelected = isSelected(row.id);
                const labelId = `enhanced-table-checkbox-${index}`;
                return (
                  <StyledTableRow
                    hover
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                    aria-checked={isItemSelected}
                  >
                    <TableCell className={classes.cell} padding="checkbox">
                      <Checkbox
                        checked={isItemSelected}
                        onChange={(event) => handleCheckboxChange(event, row.id)}
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                      />
                    </TableCell>
                    <TableCell
                      className={classes.cell}
                      component="th"
                      id={labelId}
                      align="left"
                      scope="row"
                      padding="none"
                      size="small"
                    >
                      {moment.parseZone(row.time).format('YYYY-MM-DD HH:mm:ss')}
                    </TableCell>
                    <TableCell className={classes.cell} align="left" size="small">
                      {row.id}
                    </TableCell>
                    <TableCell className={classes.cell} align="left" size="small">
                      {row.protocol === 1 && 'ICMP'}
                      {row.protocol === 6 && 'TCP'}
                      {row.protocol === 3 && 'UDP'}
                    </TableCell>
                    <TableCell className={classes.cell} align="left" size="small">
                      <div
                        className={cn(classes.priority, {
                          [classes.high]: row.priority === 3,
                          [classes.medium]: row.priority === 2,
                          [classes.low]: row.priority === 1,
                        })}
                      ></div>
                    </TableCell>
                    <TableCell className={classes.cell} align="left" size="small">
                      {row.srcIp != 0 ? ipInt(row.srcIp).toIP() : '0.0.0.0'}
                    </TableCell>
                    <TableCell className={classes.cell} align="left" size="small">
                      {ipInt(row.dstIp).toIP()}
                    </TableCell>
                    <TableCell className={classes.cell} align="left">
                      {row.type}
                    </TableCell>
                    <TableCell className={classes.cell} align="left">
                      {row.msg}
                    </TableCell>
                    <TableCell className={classes.cell} align="left">
                      <NavLink to={`/admin/table/detail/${row.id.split('-')[0]}/${row.id.split('-')[1]}`}>
                        <IconButton aria-label="detail">
                          <MoreHorizIcon />
                        </IconButton>
                      </NavLink>
                    </TableCell>
                  </StyledTableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <div className={classes.wrapperActions}>
          <Button color="secondary" size="small" className={classes.button} onClick={handleDeleteAll}>
            Delete All
            <ClearAllIcon></ClearAllIcon>
          </Button>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={totalRows}
            rowsPerPage={limit}
            page={page - 1}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </div>
      </Paper>
    </div>
  );
}
