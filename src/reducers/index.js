import { combineReducers } from 'redux';
import eventReducer from './event.reducer';
import filterReducer from './filter.reducer';
import interfaceReducer from './interface.reducer';
import uiReducer from './ui.reducer';
import modalReducer from './modal.reducer';
import ruleReducer from './rule.reducer';
const rootReducer = combineReducers({
  events: eventReducer,
  filters: filterReducer,
  interfaces: interfaceReducer,
  ui: uiReducer,
  modal: modalReducer,
  rule: ruleReducer,
});
export default rootReducer;
