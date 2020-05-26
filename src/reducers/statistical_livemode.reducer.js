import * as types from '../constants/actionType.constants';

const initialStage = {
    listStatistical: [],
    tcp:0,
    udp:0,
    icmp:0,
    all:0,
    priority_1:0,
    priority_2:0,
    priority_3:0

};

const statisticalReducer = (state = initialStage, action) => {
    switch (action.type) {
        case types.GET_STATISTICAL_LIVEMODE: {
            const { statistical_livemode } = action.payload;
            const {    
                tcp,
                udp,
                icmp,
                all,
                sig_priority,
            } = statistical_livemode;
            const statistical_livemode_data = [...state.listStatistical,statistical_livemode]
            return {
                ...state,
                tcp,
                udp,
                icmp,
                all,
                priority_1:sig_priority[1],
                priority_2:sig_priority[2],
                priority_3:sig_priority[3],
                listStatistical:statistical_livemode_data,

            }
        }
        case types.GET_EVENT_LIVEMODE_CLEAR: {
            const empty_array = []
            return {
                ...state,
                listEvent:empty_array
            }
        }
        default:
            return state;
    }
};
export default statisticalReducer;