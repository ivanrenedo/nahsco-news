import React from 'react';

import LayoutAuth from '@components/layout/LayoutAuth';
import SignIn from '@components/auth/signIn';
import WithVerifyAccount from '@components/HOC/verifyAccount/withAuthentification';



const SignInPage = () => {
    

    return (
        <WithVerifyAccount location='/verify-account' >
            <LayoutAuth title="Iniciar sesión | Lotería Malabo">
                <SignIn />
            </LayoutAuth>
        </WithVerifyAccount>
        
        
    )
}

export default SignInPage;