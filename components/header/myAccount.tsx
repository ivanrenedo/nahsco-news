import React from 'react';
import LayoutOptions from "@components/layout/layoutOption";
import { MeComponent } from "@generated/graphql";
import Arrow from '@components/icons/Arrow';



const MyAccount = () => {


    const handleSelection = (props) => {
        console.log(props);
    };


    return (
        <>
            <MeComponent fetchPolicy='cache-first'>
                {({ data }) => {
                    
                    return (
                        <>
                            <div className="myaccount-nav">
                                <LayoutOptions
                                    id="avatar"
                                    closeOnSelection
                                    handleSelection={handleSelection}
                                    openOnHover={false}
                                    dataServer={data?.me}
                                >
                                    {data! && (
                                        <div className="display-flex flex-algn-center label-text boz-sizing font-inherit box-sizing font-size-4 font-weight-2"> 
                                           {data?.me! && `${data.me.firstName} ${data.me.lastName}` }
                                            <div className="arrow__dropdown display-flex flex-algn-center">
                                                <Arrow />
                                            </div>
                                        </div> 
                                    )
                                    }
                                </LayoutOptions>
                            </div>
                        </>
                    );
                }}
            </MeComponent>
        </>
    )
};
export default MyAccount;