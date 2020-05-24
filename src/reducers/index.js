import { combineReducers } from 'redux';
import eventReducer from './event.reducer';
import filterReducer from './filter.reducer';
import interfaceReducer from './interface.reducer';
import uiReducer from './ui.reducer';
import modalReducer from './modal.reducer';
import ruleReducer from './rule.reducer';
import eventLiveMode from './event_livemode.reducer';
import statisticalLiveMode from './statistical_livemode.reducer';
import sysInfoLiveMode from './sysinfo_livemode.reducer';
const rootReducer = combineReducers({
  events: eventReducer,
  filters: filterReducer,
  interfaces: interfaceReducer,
  ui: uiReducer,
  modal: modalReducer,
  rule: ruleReducer,
  eventLiveMode: eventLiveMode,
  statisticalLiveMode: statisticalLiveMode,
  sysInfoLiveMode: sysInfoLiveMode,
});
export default rootReducer;
