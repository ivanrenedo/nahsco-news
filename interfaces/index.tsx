import { ReactNode } from "react";
import { NextPageContext } from "next";
import { ApolloClient, NormalizedCacheObject } from '@apollo/client';



export interface userNavegation {
    name: string;
    route: string;
    isAuth?: boolean;
    notNeedAuth?: boolean
}

export interface FaqData {
    id: number;
    label: string;
    description: string;
}

export interface DropdownItem {
    leftIcon?: JSX.Element;
    rightIcon?: JSX.Element;
    goToMenu?: string; 
    children?: ReactNode;
}
export interface DropdownOptions {
    id?: number;
    name: string | (string & string[]);
    route: string | (string & string[]);
    icon?: JSX.Element;
}
export interface DropdownSubmenu {
    id?: number;
    name?: string | (string & string[]);
    route?: string | (string & string[]);
    icon?: JSX.Element;
    submenu: boolean;
    active?: boolean;
    iconButton?: boolean;
    isAuth?: boolean;
    isUpload?: boolean; 
    editRoute?:boolean;
    dropdownOptions?: DropdownOptions[]
}
export interface DropdownMenu {
    id?: string;
    handleSelection: any;
    items: DropdownSubmenu;
    data?: string;
    closeOnSelection: boolean;
    openOnHover?: boolean;
    children: ReactNode
}

export interface WithApolloProps {
    apolloClient: ApolloClient<NormalizedCacheObject>;
    apolloState: any;
    pageProps: any;
    serverAccessToken: string;
    ctx: any;
}

export interface DefaultPageProps {
    apolloClient: ApolloClient<NormalizedCacheObject>;
}
export interface DefaultContext extends NextPageContext {
    apolloClient: ApolloClient<NormalizedCacheObject>;
}


export interface FormCarousel_Stage {
    form: JSX.Element;
    label?: string;
}

export interface Form_Details {
  slogan   : string
  biography: string
  gallery  : string
}

export interface Form_Type {
  type: string
}

export interface Form_Genre {
  genre: Array<string>
}

export interface UploadableSingleFile {
    id: string;
    file: File;
    url?: string;
}