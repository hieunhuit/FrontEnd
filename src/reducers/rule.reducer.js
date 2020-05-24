import * as types from '../constants/actionType.constants';
import { rules } from 'eslint-config-prettier';
const initialState = {
  ruleEditing: null,
  listRules: [],
};
const ruleReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_RULES_SUCCESS: {
      const { data } = action.payload;
      return {
        ...state,
        listRules: data,
      };
    }
    case types.DELETE_RULES_SUCCESS: {
      const { sid, id } = action.payload;
      let index = state.listRules.findIndex((item) => item.id === id);
      let newArr = [...state.listRules];
      if (index > -1) {
        newArr.splice(index, 1);
      }
      return {
        ...state,
        listRules: newArr,
      };
    }
    case types.CREATE_RULE_SUCCESS: {
      const { rules } = action.payload;
      let newArr = [...state.listRules, ...rules];
      return {
        ...state,
        listRules: newArr,
      };
    }
    case types.SET_RULE_EDITING: {
      const { rule } = action.payload;
      return {
        ...state,
        ruleEditing: rule,
      };
    }
    case types.UPDATE_RULE_SUCCESS: {
      const { rule } = action.payload;
      let index = state.listRules.findIndex((item) => item.id === rule.id);

      if (index > -1) {
        let newArr = [
          ...state.listRules.slice(0, index),
          { id: rule.id, ruleset: rule.ruleset },
          ...state.listRules.slice(index + 1),
        ];
        return {
          listRules: newArr,
        };
      }
      return {
        ...state,
      };
    }
    default:
      return state;
  }
};
export default ruleReducer;
