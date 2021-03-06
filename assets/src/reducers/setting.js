import * as types from '../constants/actionTypes';

let initialState = {
    isSidebarCollapsed: false,
    usePageWitchAnimation: true,
    pageHeaderFixed: true,
    pageAnimationType: 'right',
    randomPageAnimation: false,
};

export default function (state = initialState, action) {
    const {type, payload} = action;
    switch (type) {
    case types.SET_SETTING: {
        return {
            ...state,
            ...payload,
        };
    }
    case types.TOGGLE_SIDE_BAR: {
        const isSidebarCollapsed = !state.isSidebarCollapsed;
        return {
            ...state,
            isSidebarCollapsed,
        };
    }
    case types.GET_STATE_FROM_STORAGE: {
        return {
            ...state,
            ...(payload.setting || initialState),
        };
    }
    default:
        return state;
    }
}

