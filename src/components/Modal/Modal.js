import React from 'react';
import PropTypes from 'prop-types';
import Modal from '@material-ui/core/Modal';
import CloseIcon from '@material-ui/icons/Clear';
import styles from './styles';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import allActions from '../../actions';
Modal.propTypes = {};

const useStyles = makeStyles(styles);
function CommonModal(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { showModal, title, component } = useSelector((state) => state.modal);

  return (
    <div>
      <Modal
        open={showModal}
        onClose={() => {
          dispatch(allActions.modalActions.hideModal());
        }}
      >
        <div className={classes.modal}>
          <div className={classes.header}>
            <span className={classes.title}>{title}</span>
            <CloseIcon
              className={classes.icon}
              onClick={() => {
                dispatch(allActions.modalActions.hideModal());
              }}
            />
          </div>
          <div className={classes.content}>{component}</div>
        </div>
      </Modal>
    </div>
  );
}

export default CommonModal;
