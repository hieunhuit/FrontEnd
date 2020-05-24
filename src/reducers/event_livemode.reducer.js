import * as types from '../constants/actionType.constants';

const initialStage = {
    listEvent: []
};

const eventReducer = (state = initialStage, action) => {
    switch (action.type) {
        case types.GET_EVENT_LIVEMODE: {
            const { event_livemode } = action.payload;
            var livemode_data = [...state.listEvent,event_livemode];
            if (livemode_data.length>10){
                livemode_data=livemode_data.slice(livemode_data.length-10);
            }
            return {
                ...state,
                listEvent:livemode_data
            }
        }
        default:
            return state;
    }
};
export default eventReducer;