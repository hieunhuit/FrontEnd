import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import MenuItem from '@material-ui/core/MenuItem';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import CustomInput from 'components/CustomInput/CustomInput.js';
import FormControl from '@material-ui/core/FormControl';
import Search from '@material-ui/icons/Search';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker } from '@material-ui/pickers';
import Select from '@material-ui/core/Select';
import DeleteIcon from '@material-ui/icons/Delete';
import { lighten, makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import { useSelector, useDispatch } from 'react-redux';

import allActions from '../../../actions';

import clsx from 'clsx';
// core components
let sensors = [
  {
    sid: 13,
    interface: 'ens33',
  },
  {
    sid: 12,
    interface: 'ens38',
  },
];
const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
    fontSize: '12px',
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: '1 1 100%',
  },
  formControl: {
    margin: '0 10px',
    minWidth: 120,
    display: 'flex',
  },
  margin: {
    zIndex: '4',
    marginLeft: '20px',
    marginTop: '10px',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  searchWrapper: {
    display: 'inline-block',
    fontSize: '12px',
  },
  item: {
    margin: '10px 0px 10px 30px',
  },
  toolTipWrapper: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexWrap: 'wrap',
    margin: '10px 10px 0px 0px',
    clear: 'both',
  }
}));

const EnhancedTableToolbar = (props) => {
  const { start, end } = useSelector((state) => state.filters);
  const { interfacesConfigured } = useSelector((state) => state.interfaces);
  const { selected } = useSelector((state) => state.events);
  const classes = useToolbarStyles();
  const { numSelected } = props;
  const filters = useSelector((state) => state.filters);
  const { sensor, priority, protocol } = filters;
  const typingTimeOut = React.useRef(null);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(allActions.filterActions.setStart(null));
    dispatch(allActions.filterActions.setEnd(Date.now()));
    dispatch(allActions.filterActions.setPriority(''));
    dispatch(allActions.filterActions.setProtocol(''));
    dispatch(allActions.filterActions.setSensor(''));
    dispatch(allActions.filterActions.setSearchTerm(''));
  }, []);
  const handleStartChange = (date) => {
    if (date) dispatch(allActions.filterActions.setStart(Date.parse(date)));
  };
  const handleEndChange = (date) => {
    if (date) dispatch(allActions.filterActions.setEnd(Date.parse(date)));
  };
  const handlePriorityChange = (event) => {
    console.log(event.target.value);
    dispatch(allActions.filterActions.setPriority(event.target.value));
  };
  const handleProtocolChange = (event) => {
    dispatch(allActions.filterActions.setProtocol(event.target.value));
  };
  const handleSensorChange = (event) => {
    dispatch(allActions.filterActions.setSensor(event.target.value));
  };
  const handleSearchChange = (e) => {
    const value = e.target.value;
    if (typingTimeOut.current) {
      clearTimeout(typingTimeOut.current);
    }
    typingTimeOut.current = setTimeout(() => {
      dispatch(allActions.filterActions.setSearchTerm(value));
    }, 300);
  };

  const handleDelete = () => {
    dispatch(allActions.eventActions.deleteSelectedEvent(selected));
  };
  const renderSensor = () => {
    let xhtml = null;
    if (interfacesConfigured)
      xhtml = interfacesConfigured.map((sensor, index) => {
        return (
          <MenuItem key={index} value={sensor.sid}>
            {sensor.interface}
          </MenuItem>
        );
      });
    return xhtml;
  };
  return (
    <>
      <div className={classes.toolTipWrapper}>
        <Tooltip title="change time">
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              label="Start"
              disableToolbar
              variant="inline"
              style={{ marginLeft: '20px' }}
              format="MM/dd/yyyy"
              id="date-picker-inline"
              value={new Date(start)}
              onChange={handleStartChange}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
            <KeyboardDatePicker
              label="End"
              variant="inline"
              format="MM/dd/yyyy"
              id="date-picker-inline"
              style={{ margin: '0px 40px' }}
              value={new Date(end)}
              onChange={handleEndChange}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
          </MuiPickersUtilsProvider>
        </Tooltip>

        <Tooltip title="interface">
          <FormControl className={classes.formControl}>
            <InputLabel id="input-label-sensor">Interface</InputLabel>
            <Select
              labelId="input-label-sensor"
              id="demo-simple-select-helper"
              value={sensor}
              onChange={handleSensorChange}
              className={classes.selectEmpty}
              defaultValue=""
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {renderSensor()}
            </Select>
          </FormControl>
        </Tooltip>
        <Tooltip title="filter">
          <FormControl className={classes.formControl}>
            <InputLabel id="input-label-priority">Priority</InputLabel>
            <Select
              labelId="input-label-priority"
              id="demo-simple-select-helper"
              value={priority}
              onChange={handlePriorityChange}
              className={classes.selectEmpty}
              defaultValue=""
            >
              <MenuItem value="">None</MenuItem>
              <MenuItem value={1}>Low</MenuItem>
              <MenuItem value={2}>Medium</MenuItem>
              <MenuItem value={3}>High</MenuItem>
            </Select>
          </FormControl>
        </Tooltip>
        <Tooltip title="filter">
          <FormControl className={classes.formControl}>
            <InputLabel id="input-label-Protocol">Protocol</InputLabel>
            <Select
              labelId="input-label-Protocol"
              id="demo-simple-select-helper"
              value={protocol}
              onChange={handleProtocolChange}
              className={classes.selectEmpty}
              defaultValue=""
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={1}>ICMP</MenuItem>
              <MenuItem value={6}>TCP</MenuItem>
              <MenuItem value={3}>UDP</MenuItem>
            </Select>
          </FormControl>
        </Tooltip>
        <Tooltip title="filter">
          <FormControl className={classes.searchWrapper}>
            <CustomInput
              onChange={handleSearchChange}
              formControlProps={{
                className: classes.margin + ' ' + classes.search,
              }}
              inputProps={{
                placeholder: 'Search',
                inputProps: {
                  'aria-label': 'Search',
                },
              }}
            />
            <IconButton>
              <Search />
            </IconButton>
          </FormControl>
        </Tooltip>
      </div>

      <Toolbar
        style={{ minHeight: '50px' }}
        className={clsx(classes.root, {
          [classes.highlight]: numSelected > 0,
        })}
      >
        {numSelected > 0 && (
          <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
            {numSelected} selected
          </Typography>
        )}

        {numSelected > 0 && (
          <Tooltip title="Delete">
            <IconButton aria-label="delete" onClick={handleDelete}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        )}
      </Toolbar>
    </>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};
export default EnhancedTableToolbar;
