import React, { createContext, useReducer, Dispatch, ReactNode } from "react";

import {
    ToggleMenuActions,
    ConfigPrivacyActions, 
    LoadingTicketActions,

    toggleMenuReducer, 
    configPrivacyReducer,
    loadingTicketReducer, 

    Types
} from './mainReducer';

type ToggleMenuType = {
    isOpenSidebarRight: boolean;
};
type ConfigPrivacyType = {
    config?: boolean;
    editProp?: boolean;
    addPaid?: boolean;
    deletePaid?: boolean;
};
type LoadingTicketType = {
    isLoading: boolean;
    data?: any,
    startParam?: number,
    isMore?: boolean
};


type InitialStateType = {
    toggleMenu: ToggleMenuType;
    configPrivacy: ConfigPrivacyType;
    loadingTicket: LoadingTicketType
};

type AppProvider = {
    children: ReactNode;
};

const initialState = {
    toggleMenu: {
        isOpenSidebarRight: false
    },
    configPrivacy: {
        config: false,
        editProp: false,
        addPaid: false,
        deletePaid: false
    },
    loadingTicket: {
        isLoading: false,
        isMore: true,
        data: [],
        startParam: 0 
    }
};

const AppContext = createContext<{
    state: InitialStateType;
    dispatch: 
        Dispatch<
            ToggleMenuActions | 
            ConfigPrivacyActions |
            LoadingTicketActions 
        >;
    openSidebar: Function;
    closeSidebar: Function;
}>({
    state: initialState,
    dispatch: () => null,
    openSidebar: () => {},
    closeSidebar: () => {}
});

const mainReducer = (
    { toggleMenu, configPrivacy, loadingTicket }: InitialStateType,
    action: 
    ToggleMenuActions | 
    ConfigPrivacyActions |
    LoadingTicketActions

) => ({
    toggleMenu: toggleMenuReducer(toggleMenu, action),
    configPrivacy: configPrivacyReducer(configPrivacy, action),
    loadingTicket: loadingTicketReducer(loadingTicket, action)
});

const AppProvider: React.FC<AppProvider> = ({ children }) => {
    
    const [state, dispatch] = useReducer(mainReducer, initialState);      

    const openSidebar = () => {
        dispatch({
            type: Types.open_sidebar,
            payload: {
                isOpenSidebarRight: true
            }
        })
    };
    
    const closeSidebar = () => {
        dispatch({
            type: Types.open_sidebar,
            payload: {
                isOpenSidebarRight: false, 
            }
        })
    };


    return (
        <AppContext.Provider 
            value={{
                state, 
                dispatch, 
                openSidebar,
                closeSidebar
            }}
        >
        {children}
        </AppContext.Provider>
    );
};

export { AppProvider, AppContext };


