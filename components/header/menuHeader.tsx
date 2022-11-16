import React from 'react';
import { MeComponent } from "@generated/graphql";
import LayoutMenuHeaderOptions from '@components/layout/layoutMenuHeaderOption';
import Menu from '@components/icons/menu';



const MenuHeader = () => {


    const handleSelection = (props) => {
        console.log(props);
    };


    return (
        <>
            <MeComponent fetchPolicy='cache-first'>
                {({ loading }) => {

                    if (loading) {
                        return (
                            <div title="menu">
                                
                            </div>
                        )
                    }

                    return (
                        <>
                            <div className="myaccount-nav">
                               <LayoutMenuHeaderOptions
                               id="menu-header"
                               closeOnSelection
                               handleSelection={handleSelection}
                               openOnHover={false}
                               >
                                   <div className="account-avatar-size display-flex flex-justify-center flex-algn-center"> 
                                        <Menu />
                                    </div>
                                    <div className="display-flex flex-justify-center">
                                        <span className="main-nav--label let-Spac-body">Menú</span>
                                    </div>
                               </LayoutMenuHeaderOptions>
                            </div>
                        </>
                    );
                }}
            </MeComponent>
        </>
    )
};
export default MenuHeader;