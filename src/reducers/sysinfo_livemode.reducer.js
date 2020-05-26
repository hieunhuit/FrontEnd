import * as types from '../constants/actionType.constants';

const initialStage = {
    ListSysInfo:[],
    // cpu_x:0,
    // cpu_y:0,
    // mem_x:0,
    // mem_y:0,
    // disk_layout:0,
    // disk_used:0,
    // net_tx_x:0,
    // net_tx_y:0,
    // net_rx_x:0,
    // net_rx_y:0,
    // net_tx_max:0,
    // net_rx_max:0
};

const eventReducer = (state = initialStage, action) => {
    switch (action.type) {
        case types.GET_SYSINFO_LIVEMODE: {
            const { sysinfo_livemode } = action.payload;
            var sysinfo_livemode_data = [...state.ListSysInfo,sysinfo_livemode];
            if (sysinfo_livemode_data.length>20){
                sysinfo_livemode_data=sysinfo_livemode_data.slice(sysinfo_livemode_data.length-20);
            }
            return {
                ...state,
                ListSysInfo:sysinfo_livemode_data,
                // cpu_x:0,
                // cpu_y:sysinfo_livemode_data.cpu,
                // mem_x:0,
                // mem_y:(sysinfo_livemode_data.mem/sysinfo_livemode_data.mem_total)*100,
                // disk_layout:sysinfo_livemode_data.disk_layout,
                // disk_used:sysinfo_livemode_data.disk_used,
                // net_tx_x:0,
                // net_tx_y:(sysinfo_livemode_data.net_used_tx/net_tx_max)*100,
                // net_rx_x:0,
                // net_rx_y:(sysinfo_livemode_data.net_used_rx/net_rx_max)*100,
                // net_tx_max:0,
                // net_rx_max:0
            }
        }
        default:
            return state;
    }
};
export default eventReducer;