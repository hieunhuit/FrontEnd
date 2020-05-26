import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import GridItem from 'components/Grid/GridItem.js';
import { faSkull, faExclamation, faShieldAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';
InfoPriority.propTypes = {};
const useStyles = makeStyles({
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
function InfoPriority(props) {
  const classes = useStyles();
  const { tcp, udp,icmp, all,priority_1, priority_2,priority_3 } = useSelector((state) => state.statisticalLiveMode);
  return (
    <>
      <GridItem xs={12} sm={6} md={3}>
        <a href="#" class="card bg-danger">
          <div class="card-body widget-style-2">
            <div class="text-white media">
              <div class="media-body align-self-center">
                <h2 class="my-0 text-white">
                  {
                    <span>{priority_1}</span>
                  }
                </h2>
                <p class="mb-0">Danger</p>
              </div>
              <FontAwesomeIcon icon={faSkull} className={classes.iconPriority} />
            </div>
          </div>
        </a>
      </GridItem>
      <GridItem xs={12} sm={6} md={3}>
        <a href="#" class="card bg-pink">
          <div class="card-body widget-style-2">
            <div class="text-white media">
              <div class="media-body align-self-center">
                <h2 class="my-0 text-white">
                {
                    <span>{priority_2}</span>
                  }
                </h2>
                <p class="mb-0">Warning</p>
              </div>
              <FontAwesomeIcon icon={faSkull} className={classes.iconPriority} />
            </div>
          </div>
        </a>
      </GridItem>

      <GridItem xs={12} sm={6} md={3}>
        <a class="card bg-warning">
          <div class="card-body widget-style-2">
            <div class="text-white media">
              <div class="media-body align-self-center">
                <h2 class="my-0 text-white">
                {
                    <span>{priority_3}</span>
                  }
                </h2>
                <p class="mb-0">Alert</p>
              </div>
              <FontAwesomeIcon icon={faExclamation} className={classes.iconPriority} />
            </div>
          </div>
        </a>
      </GridItem>
      <GridItem xs={12} sm={6} md={3}>
        <a class="card bg-success">
          <div class="card-body widget-style-2">
            <div class="text-white media">
              <div class="media-body align-self-center">
                <h2 class="my-0 text-white">
                  {
                    <span>{all}</span>
                  }
                </h2>
                <p class="mb-0">Daily Visits</p>
              </div>
              <FontAwesomeIcon icon={faShieldAlt} className={classes.iconPriority} />
            </div>
          </div>
        </a>
      </GridItem>
    </>
  );
}

export default InfoPriority;
