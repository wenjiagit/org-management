import * as types from '../constants/actionTypes';
import config from '../configs';
import {getHeaderMenus, getCurrentHeaderMenuByUrl, convertToTree, getCurrentSidebarMenuByUrl} from '../utils';
import {session} from '../utils/storage';

let initialState = {
    headerMenus: [],
    sideBarMenus: [],
    sideBarHidden: false,
    user: {
        name: '尚未登录',
    },
    selectedKeys: '',
    openKeys: [],
    currentHeaderKey: '',
    pageHeader: {},
    pageStatus: 'entered',
};

export default function (state = initialState, action) {
    const {type, payload} = action;

    switch (type) {
    case types.LOGOUT:
        return location.href = config.signInPath;
    case types.GET_CURRENT_USER: {
        return {
            ...state,
            user: payload,
        };
    }
    case types.UPDATE_CURRENT_USER: {
        const newUser = {...state.user, ...payload};
        session.setItem('currentLoginUser', newUser);
        return {
            ...state,
            user: newUser,
        };
    }
    case types.GET_MENUS: {
        if (!payload || !payload.length) {
            return {
                ...state,
            };
        }

        let headerMenus = getHeaderMenus(payload);
        let headMenu = getCurrentHeaderMenuByUrl(headerMenus);
        let sideBarMenus = [];
        if (headMenu) {
            sideBarMenus = convertToTree(payload, headMenu);
        }
        const sideBarHidden = !sideBarMenus.length;
        headerMenus = headerMenus.filter(menu => {
            return menu.key !== 'system';
        });
        return {
            ...state,
            headerMenus,
            sideBarMenus,
            sideBarHidden,
        };
    }
    case types.AUTO_SET_SIDE_BAR_STATUS: {
        const {parentKeys: openKeys, key: selectedKeys} = getCurrentSidebarMenuByUrl(payload) || state;
        return {
            ...state,
            openKeys,
            selectedKeys,
        };
    }
    case types.AUTO_SET_HEADER_MENU_STATUS: {
        const {key: currentHeaderKey} = getCurrentHeaderMenuByUrl(payload) || state;
        return {
            ...state,
            currentHeaderKey,
        };
    }
    case types.AUTO_SET_PAGE_HEADER_STATUS: {
        const {parentNodes, text, icon} = getCurrentSidebarMenuByUrl(payload) || {};
        const breadcrumb = [];

        if (parentNodes && parentNodes.length) {
            parentNodes.forEach(node => {
                breadcrumb.push({
                    icon: node.icon,
                    text: node.text,
                    path: node.path,
                });
            });
        }

        breadcrumb.push({
            icon,
            text,
        });

        return {
            ...state,
            pageHeader: {
                hidden: false,
                title: text,
                breadcrumb,
            },
        };
    }
    case types.SET_PAGE_HEADER_STATUS: {
        return {
            ...state,
            pageHeader: {...state.pageHeader, ...payload},
        };
    }
    case types.SET_PAGE_STATUS: {
        return {
            ...state,
            pageStatus: payload,
        };
    }
    default:
        return state;
    }
}
