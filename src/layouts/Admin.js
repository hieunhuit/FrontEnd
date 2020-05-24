import React, { useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
// creates a beautiful scrollbar
import PerfectScrollbar from 'perfect-scrollbar';
import 'perfect-scrollbar/css/perfect-scrollbar.css';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
// core components
import Navbar from 'components/Navbars/Navbar.js';
import Footer from 'components/Footer/Footer.js';
import Sidebar from 'components/Sidebar/Sidebar.js';
import FixedPlugin from 'components/FixedPlugin/FixedPlugin.js';
import GlobalLoading from 'components/GlobalLoading/GlobalLoading.js';
import routes from 'routes.js';

import styles from 'assets/jss/material-dashboard-react/layouts/adminStyle.js';

import bgImage from 'assets/img/sidebar-2.jpg';
import logo from 'assets/img/reactlogo.png';
import cn from 'classnames';
import Detail from 'views/Detail/Detail';
import ConfigInterface from 'views/ConfigInterface/ConfigInterface';
import EditInterface from 'views/EditInterface/EditInterface';
import { useSelector, useDispatch } from 'react-redux';
import { SOCKET_ENDPOINT } from '../constants/index';

import allActions from '../actions/';

import io from 'socket.io-client';

const socket = io(`${SOCKET_ENDPOINT}`+'/webapp');

let ps;

const switchRoutes = (
  <Switch>
    {routes.map((prop, key) => {
      if (prop.layout === '/admin') {
        return <Route path={prop.layout + prop.path} component={prop.component} key={key} exact={prop.exact} />;
      }
      return null;
    })}
    <Route path="/admin/table/detail/:sid/:cid" component={Detail} />
    <Route path="/admin/interface/config" component={ConfigInterface} />
    <Route path="/admin/interface/:sid" component={EditInterface} />
    <Redirect from="/admin" to="/admin/dashboard" />
  </Switch>
);

const useStyles = makeStyles(styles);
export var isOnSite = true;

export default function Admin({ ...rest }) {

  const { loading, callSuccess } = useSelector((state) => state.ui);
  // styles
  const classes = useStyles();
  // ref to help us initialize PerfectScrollbar on windows devices
  const mainPanel = React.createRef();
  // states and functions
  const [image, setImage] = React.useState(bgImage);
  const [color, setColor] = React.useState('blue');
  const [fixedClasses, setFixedClasses] = React.useState('dropdown show');
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [pcOpen, setPcOpen] = useState(true);
  const dispatch = useDispatch();

  socket.on('connect', (connector)=>{
    console.log('connected');
  })
  socket.on('newData', (data)=>{
    dispatch(allActions.eventActions.getEventLiveMode(data))
  });
  socket.emit('getStatisticalLiveMode',{
    all:true,
    tcp:true,
    udp:true,
    sig_priority:"1",
    time_require:72
  });
  socket.on('setStatistical',(data)=>{
    dispatch(allActions.eventActions.clearLiveModeData())
    dispatch(allActions.eventActions.getStatisticalLiveMode(data))
  })

  setInterval(()=>{
    if (isOnSite) socket.emit("getSystemInformation")},1000);
  
  socket.on("setSystemInformation", (data)=>{
    // console.log(data)
    dispatch(allActions.eventActions.getSysInfoLiveMode(data))
  });
  
  
  const handleImageClick = (image) => {
    setImage(image);
  };
  const handleColorClick = (color) => {
    setColor(color);
  };
  const handleFixedClick = () => {
    if (fixedClasses === 'dropdown') {
      setFixedClasses('dropdown show');
    } else {
      setFixedClasses('dropdown');
    }
  };
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const handleDrawerTogglePc = () => {
    setPcOpen(!pcOpen);
  };

  const getRoute = () => {
    return window.location.pathname !== '/admin/maps';
  };
  const resizeFunction = () => {
    if (window.innerWidth >= 960) {
      setMobileOpen(false);
    }
  };
  // initialize and destroy the PerfectScrollbar plugin
  React.useEffect(() => {
    function fetchListInterfaceConfigured() {
      dispatch(allActions.interfaceActions.getInterface());
    }
    fetchListInterfaceConfigured();
  }, []);
  React.useEffect(() => {
    if (navigator.platform.indexOf('Win') > -1) {
      ps = new PerfectScrollbar(mainPanel.current, {
        suppressScrollX: true,
        suppressScrollY: false,
      });
      document.body.style.overflow = 'hidden';
    }
    window.addEventListener('resize', resizeFunction);
    // Specify how to clean up after this effect:
    return function cleanup() {
      if (navigator.platform.indexOf('Win') > -1) {
        ps.destroy();
      }
      window.removeEventListener('resize', resizeFunction);
    };
  }, [mainPanel]);
  return (
    <div className={classes.wrapper}>
      <Sidebar
        routes={routes}
        logoText={'Creative Tim'}
        logo={logo}
        image={image}
        handleDrawerToggle={handleDrawerToggle}
        handleDrawerTogglePc={handleDrawerTogglePc}
        open={pcOpen}
        color={color}
        {...rest}
      />
      <div
        className={cn(classes.mainPanel, {
          [classes.shiftLeft]: pcOpen === false,
        })}
        ref={mainPanel}
      >
        <Navbar
          routes={routes}
          handleDrawerToggle={handleDrawerToggle}
          handleDrawerTogglePc={handleDrawerTogglePc}
          {...rest}
        />
        {/* On the /maps route we want the map to be on full screen - this is not possible if the content and conatiner classes are present because they have some paddings which would make the map smaller */}
        {getRoute() ? (
          <div className={classes.content}>
            <div className={classes.container}>{switchRoutes}</div>
          </div>
        ) : (
          <div className={classes.map}>{switchRoutes}</div>
        )}
        {getRoute() ? <Footer /> : null}
        {/* <FixedPlugin
          handleImageClick={handleImageClick}
          handleColorClick={handleColorClick}
          bgColor={color}
          bgImage={image}
          handleFixedClick={handleFixedClick}
          fixedClasses={fixedClasses}
        /> */}
        {loading && <GlobalLoading />}
      </div>
    </div>
  );
}
