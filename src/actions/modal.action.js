import * as modalTypes from '../constants/actionType.constants';

const showModal = () => ({
  type: modalTypes.SHOW_MODAL,
});

const hideModal = () => ({
  type: modalTypes.HIDE_MODAL,
});
const changeModalContent = (component) => ({
  type: modalTypes.CHANGE_MODAL_CONTENT,
  payload: {
    component,
  },
});
const changeModalTitle = (title) => ({
  type: modalTypes.CHANGE_MODAL_TITLE,
  payload: {
    title,
  },
});
export default {
  hideModal,
  showModal,
  changeModalContent,
  changeModalTitle,
};
