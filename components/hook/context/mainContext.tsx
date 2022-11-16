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
    email?: boolean;
    deleteAccount?: boolean;
    privacy?: boolean;
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
    authenticated: boolean;
};

const initialState = {
    toggleMenu: {
        isOpenSidebarRight: false
    },
    configPrivacy: {
        config: false,
        email: false,
        deleteAccount: false,
        privacy: false
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
    isAuthenticated: boolean;
    setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}>({
    state: initialState,
    dispatch: () => null,
    openSidebar: () => {},
    closeSidebar: () => {},
    isAuthenticated: false,
    setAuthenticated: () => {}
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

const AppProvider: React.FC<AppProvider> = ({ children, authenticated }) => {
    
    const [state, dispatch] = useReducer(mainReducer, initialState);
    const [isAuthenticated, setAuthenticated] = React.useState<boolean>( authenticated );       

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
                closeSidebar, 
                isAuthenticated, 
                setAuthenticated
            }}
        >
        {children}
        </AppContext.Provider>
    );
};

export { AppProvider, AppContext };


