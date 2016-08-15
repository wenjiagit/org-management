import 'antd/dist/antd.css';
import React, {Component} from 'react';
import './style.less';
import NavBar from './SideBar';
import Header from './Header';

export class LayoutComponent extends Component {
    componentDidMount() {
        const {actions} = this.props;
        actions.getMenus();
        actions.getUser();
        actions.getStateFromStorage();
    }

    render() {
        const {
            isSidebarCollapsed,
            currentHeaderKey,
            sideBarHidden,
            headerMenus,
            user,
            sideBarMenus,
            openKeys,
            selectedKeys,
            children,
        } = this.props;
        const {
            logout,
            toggleSideBar,
        } = this.props.actions;
        const collapsedClass = isSidebarCollapsed ? 'collapsed' : '';
        const contentClass = sideBarHidden ? 'full' : '';

        return (
            <div>
                <Header
                    collapsed={isSidebarCollapsed}
                    exit={logout}
                    menus={headerMenus}
                    current={currentHeaderKey}
                    user={user}
                    toggleSideBar={toggleSideBar}
                />
                <NavBar
                    menus={sideBarMenus}
                    collapsed={isSidebarCollapsed}
                    openKeys={openKeys}
                    selectedKeys={selectedKeys}
                    hidden={sideBarHidden}
                />
                <div className={`app-content ${collapsedClass} ${contentClass}`}>
                    {children}
                </div>
            </div>
        );
    }
}

export function mapStateToProps(state) {
    return {
        ...state.app,
        ...state.setting,
    };
}