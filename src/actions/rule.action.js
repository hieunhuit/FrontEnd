import * as types from '../constants/actionType.constants';

const getRules = (sid) => {
  return {
    type: types.GET_RULES,
    payload: {
      sid,
    },
  };
};
const getRulesSuccess = (data) => {
  return {
    type: types.GET_RULES_SUCCESS,
    payload: {
      data,
    },
  };
};
const deleteRule = (sid, id) => {
  return {
    type: types.DELETE_RULES,
    payload: {
      id,
      sid,
    },
  };
};
const deleteRuleSuccess = (sid, id) => {
  return {
    type: types.DELETE_RULES_SUCCESS,
    payload: {
      id,
      sid,
    },
  };
};
const createRule = (sid, rules) => {
  return {
    type: types.CREATE_RULE,
    payload: {
      rules,
      sid,
    },
  };
};
const createRuleSuccess = (rules) => {
  return {
    type: types.CREATE_RULE_SUCCESS,
    payload: {
      rules,
    },
  };
};
const updateRule = (rule) => {
  return {
    type: types.UPDATE_RULE,
    payload: {
      rule,
    },
  };
};
const updateRuleSuccess = (rule) => {
  return {
    type: types.UPDATE_RULE_SUCCESS,
    payload: {
      rule,
    },
  };
};
const setRuleEditing = (rule) => {
  return {
    type: types.SET_RULE_EDITING,
    payload: {
      rule,
    },
  };
};
export default {
  getRules,
  getRulesSuccess,
  deleteRule,
  deleteRuleSuccess,
  createRule,
  createRuleSuccess,
  updateRule,
  updateRuleSuccess,
  setRuleEditing,
};
