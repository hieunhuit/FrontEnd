import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import AddIcon from '@material-ui/icons/Add';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import allActions from '../../actions';
import TablePagination from '@material-ui/core/TablePagination';
import { useSelector, useDispatch } from 'react-redux';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import Modal from '../Modal/Modal';

Rules.propTypes = {
  listRules: PropTypes.array,
  onDelete: PropTypes.func,
};
Rules.defaultProps = {
  listRules: [],
  onDelete: null,
};
function createData(id, rule) {
  return { id, rule };
}
let rules = [
  {
    id: 1,
    rule:
      'alert icmp any any -> $HOME_NET any (classtype:icmp-event; sid:10000001; rev:1;priority:1; msg:"ICMP  test";gid:1;)',
  },
  {
    id: 1,
    rule:
      'alert tcp any any -> $HOME_NET !21 (classtype:tcp-connection; sid:10000002; rev:1;priority:2; msg:"TCP  test";gid:1;)',
  },
  {
    id: 1,
    rule:
      'alert udp any any -> $HOME_NET any (classtype:icmp-event; sid:10000001; rev:1;priority:1; msg:"UDP  test";gid:1;)',
  },
];
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
    minWidth: '60px',
    margin: '5px 0px',
  },
});
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: '#1d3557',
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

function Rules(props) {
  const { listRules, onDelete, sid, onEdit, onCreate } = props;
  const classes = useStyles();
  const dispatch = useDispatch();
  let rows = listRules.map((item) => {
    return createData(item.id, item.ruleset);
  });

  const handleDeleteRule = (sid, id) => {
    console.log(sid, id);
    if (onDelete) onDelete(sid, id);
  };
  const handleCreate = () => {
    if (!onCreate) return;
    onCreate();
  };
  const handleEditRule = (rule) => {
    if (!onEdit) return;
    onEdit(rule);
  };
  return (
    <div>
      <Button variant="contained" color="secondary" onClick={handleCreate}>
        <AddIcon />
        New rule
      </Button>
      <TableContainer component={Paper}>
        <Table className={classes.table} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <StyledTableCell>id</StyledTableCell>
              <StyledTableCell align="left">Rule</StyledTableCell>
              <StyledTableCell align="left">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>

                <TableCell align="left">{row.rule}</TableCell>
                <TableCell align="left">
                  <IconButton className={classes.iconAction}>
                    <EditIcon onClick={() => handleEditRule({ sid: sid, id: row.id, rule: row.rule })} />
                  </IconButton>
                  <IconButton className={classes.iconAction}>
                    <DeleteForeverIcon onClick={() => handleDeleteRule(sid, row.id)} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal />
    </div>
  );
}

export default Rules;
