import { combineReducers } from 'redux';
import eventReducer from './event.reducer';
import filterReducer from './filter.reducer';
const rootReducer = combineReducers({
  events: eventReducer,
  filters: filterReducer,
});
export default rootReducer;
