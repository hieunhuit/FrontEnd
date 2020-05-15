import React, { useEffect } from 'react';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
// core components
import GridItem from 'components/Grid/GridItem.js';
import GridContainer from 'components/Grid/GridContainer.js';
import ListEvent from 'components/ListEvents/ListEvents';
import { useSelector, useDispatch } from 'react-redux';
import allActions from '../../actions';
import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader.js';
import CardBody from 'components/Card/CardBody.js';
import ReloadIcon from '@material-ui/icons/ReplayOutlined';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
const styles = {
  cardCategoryWhite: {
    '&,& a,& a:hover,& a:focus': {
      color: 'rgba(255,255,255,.62)',
      margin: '0',
      fontSize: '14px',
      marginTop: '0',
      marginBottom: '0',
    },
    '& a,& a:hover,& a:focus': {
      color: '#FFFFFF',
    },
  },
  cardTitleWhite: {
    color: '#FFFFFF',
    marginTop: '0px',
    minHeight: 'auto',
    fontWeight: '300',
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: '3px',
    textDecoration: 'none',
    '& small': {
      color: '#777',
      fontSize: '65%',
      fontWeight: '400',
      lineHeight: '1',
    },
  },
  headerWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: '#1d3557',
  },
};

const useStyles = makeStyles(styles);

export default function TableList() {
  const classes = useStyles();
  const { listEvent: events, pagination, selected } = useSelector((state) => state.events);
  const { totalRows } = pagination;
  const filters = useSelector((state) => state.filters);
  const dispatch = useDispatch();
  // const [filters, setFilters] = React.useState({
  //   _limit: 5,
  //   _page: 1,
  //   title_like: '',
  //   priority: '',
  //   protocol: '',
  //   sensor: '',
  // });

  useEffect(() => {
    function fetchListEvent() {
      const query = Object.keys(filters)
        .filter((item) => filters[item])
        .reduce((obj, key) => {
          obj[key] = filters[key];
          return obj;
        }, {});
      dispatch(allActions.eventActions.getEvents(query));
    }
    fetchListEvent();
    return () => {};
  }, [filters]);
  // const handlePriorityChange = (newPriority) => {
  //   setFilters({
  //     ...filters,
  //     priority: newPriority,
  //   });
  // };
  // const handleSensorChange = (newSensor) => {
  //   setFilters({
  //     ...filters,
  //     sensor: newSensor,
  //   });
  // };
  // const handleProtocolChange = (newProtocol) => {
  //   setFilters({
  //     ...filters,
  //     protocol: newProtocol,
  //   });
  // };
  // const handleSearchChange = (newSearchTerm) => {
  //   setFilters({
  //     ...filters,
  //     title_like: newSearchTerm,
  //   });
  // };
  // const handlePageChange = (newPage) => {
  //   setFilters({
  //     ...filters,
  //     _page: newPage,
  //   });
  // };
  // const handleRowPerPageChange = (newLimit) => {
  //   setFilters({
  //     ...pagination,
  //     _limit: newLimit,
  //   });
  // };
  // const handleOrderChange = (order) => {
  //   setOrder(order);
  // };
  // const handleOrderByChange = (property) => {
  //   setOrderBy(property);
  // };
  // const handleSelectedChange = (newSelected) => {
  //   setSelected(newSelected);
  // };
  // const handleDelete = () => {
  //   console.log(selected);
  // };
  const handleReload = () => {
    dispatch(allActions.eventActions.getEvents());
  };
  return (
    <>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}></GridItem>
        <Card>
          <CardHeader className={classes.headerWrapper}>
            <h4 className={classes.cardTitleWhite}>Event</h4>
            <IconButton style={{ width: '40px', height: '40px' }} color="inherit" size="small" onClick={handleReload}>
              <ReloadIcon></ReloadIcon>
            </IconButton>
          </CardHeader>
          <CardBody>
            <ListEvent selected={selected} events={events} totalRows={totalRows} />
          </CardBody>
        </Card>
      </GridContainer>
    </>
  );
}
