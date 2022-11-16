import React from 'react';

import LayoutAuth from '@components/layout/LayoutAuth';
import SignIn from '@components/auth/signIn';



const SignInPage = () => {
    

    return (
        <LayoutAuth title="Iniciar sesión | Lotería Malabo">
            <SignIn />
        </LayoutAuth>
    )
}

export default SignInPage;