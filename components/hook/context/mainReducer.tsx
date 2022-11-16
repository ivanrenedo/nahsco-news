
type ActionMap<M extends { [index: string]: any }> = {
    [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
    }
    : {
        type: Key;
        payload: M[Key];
    }
};

export enum Types {
    open_sidebar = "OPEN_SIDEBAR",
    config = "CONFIG",
    loadTicket  = 'LOADING_TICKET'
}


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

type ToggleMenuPayload = {
    [Types.open_sidebar]: {
        isOpenSidebarRight: boolean;
    };
};
type ConfigPrivacyPayload = {
    [Types.config]: {
        config?: boolean;
        email?: boolean;
        deleteAccount?: boolean;
        privacy?: boolean;
    };
};
type LoadingTicketPayload = {
    [Types.loadTicket]: {
        isLoading: boolean,
        dataLength?: number,
        dataChunk?: any[]
    };
};


export type ToggleMenuActions = ActionMap<ToggleMenuPayload>[keyof ActionMap<
    ToggleMenuPayload
>];
export type ConfigPrivacyActions = ActionMap<ConfigPrivacyPayload>[keyof ActionMap<
    ConfigPrivacyPayload
>];
export type LoadingTicketActions = ActionMap<LoadingTicketPayload>[keyof ActionMap<
    LoadingTicketPayload
>];


export const toggleMenuReducer = (
    state: ToggleMenuType,
    action: 
    ToggleMenuActions | 
    ConfigPrivacyActions |
    LoadingTicketActions 
) => {
    switch (action.type) {
        case Types.open_sidebar:
            return{
                ...state,
                isOpenSidebarRight: action.payload.isOpenSidebarRight
            };
        default:
            return state;
    }
};

export const configPrivacyReducer = (
    state: ConfigPrivacyType,
    action: 
    ToggleMenuActions | 
    ConfigPrivacyActions |
    LoadingTicketActions 
) => {
    switch (action.type) {
        case Types.config:
            return{
                ...state,
                config: action.payload.config,
                email: action.payload.email,
                deleteAccount: action.payload.deleteAccount,
                privacy: action.payload.privacy 
            };
        default:
            return state;
    }
};

export const loadingTicketReducer = (
    state: LoadingTicketType,
    action: 
    ToggleMenuActions | 
    ConfigPrivacyActions |
    LoadingTicketActions
) => {
    switch (action.type) {
      case Types.loadTicket:
        const startParam = state.startParam! + action.payload.dataChunk?.length!;
        return { 
            ...state, 
            isLoading:  action.payload.isLoading,
            data: [...state.data, ...action.payload.dataChunk!],
            startParam: startParam,
            isMore: startParam !== action.payload.dataLength
        }
      default:
        return state;
    }
}
