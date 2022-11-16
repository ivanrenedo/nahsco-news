import React from 'react';
import { LogOutComponent } from '@generated/graphql';
import LogoutIcon from '@components/icons/logout';

const LogOut = () => {
    
    return (
        <>
            <LogOutComponent>
                {logOut => (
                    <button
                        className="drop-item display-flex flex-algn-center"
                        onClick={async () => {
                            const response = await logOut();
                            localStorage.clear();
                            location.assign(`${location.href}?logout=${response.data?.logOut}`);
                        }}
                    >
                        <span className="icon-button display-flex flex-algn-center"><LogoutIcon /></span>
                        <span className="label">Salir</span>
                    </button>
                )}
            </LogOutComponent>
        </>
    )
}


export default LogOut;