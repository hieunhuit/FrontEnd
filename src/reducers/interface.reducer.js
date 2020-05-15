import * as types from '../constants/actionType.constants';
const initialState = {
  interfacesAvailable: [],
  interfacesConfigured: [],
};

const interfaceReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_INTERFACE_SUCCESS: {
      const { data } = action.payload;
      console.log(data, 'in reducer');
      return {
        ...state,
        interfacesAvailable: [...data.infoInterfaceAvailable],
        interfacesConfigured: [...data.infoInterfaceConfigured],
      };
    }
    case types.TOGGLE_STATUS_INTERFACE_SUCCESS: {
      const { sid } = action.payload;

      let index = state.interfacesConfigured.findIndex((item) => item.sid === sid);
      let newArr = [...state.interfacesConfigured];
      if (index > -1) {
        newArr[index] = { ...newArr[index], status: !newArr[index].status };
      }

      return {
        ...state,
        interfacesConfigured: newArr,
      };
    }
    case types.RESTART_INTERFACE_SUCCESS: {
      const { sid } = action.payload;
      let index = state.interfacesConfigured.findIndex((item) => item.sid === sid);
      let newArr = [...state.interfacesConfigured];
      if (index > -1) {
        newArr[index] = { ...newArr[index], status: true };
      }

      return {
        ...state,
        interfacesConfigured: newArr,
      };
    }

    default:
      return state;
  }
};
export default interfaceReducer;
