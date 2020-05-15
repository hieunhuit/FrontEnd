import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Rules from '../../components/Rules/Rules';
import allActions from '../../actions';
import FormRule from '../../components/FormRule/formRule';
EditInterface.propTypes = {};

function EditInterface(props) {
  let { sid } = useParams();
  const dispatch = useDispatch();
  const { listRules } = useSelector((state) => state.rule);
  useEffect(() => {
    dispatch(allActions.ruleActions.getRules(sid));
  }, []);
  const handleDeleteRule = (sid, id) => {
    console.log(sid, id);
    dispatch(allActions.ruleActions.deleteRule(sid, id));
  };
  const handleEditRule = (rule) => {
    console.log(rule);
    dispatch(allActions.ruleActions.setRuleEditing(rule));
    dispatch(allActions.modalActions.showModal());
    dispatch(allActions.modalActions.changeModalTitle('Update rule'));
    dispatch(allActions.modalActions.changeModalContent(<FormRule />));
  };
  const handleCreateRule = () => {
    dispatch(allActions.ruleActions.setRuleEditing(null));
    dispatch(allActions.modalActions.showModal());
    dispatch(allActions.modalActions.changeModalTitle('Create new rule'));
    dispatch(allActions.modalActions.changeModalContent(<FormRule />));
  };
  return (
    <div>
      <Rules
        listRules={listRules}
        onCreate={handleCreateRule}
        onDelete={handleDeleteRule}
        sid={sid}
        onEdit={handleEditRule}
      />
    </div>
  );
}

export default EditInterface;
