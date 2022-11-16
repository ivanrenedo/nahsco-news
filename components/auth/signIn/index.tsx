import React from 'react';
import { useRouter } from 'next/router';
import {
    Formik,
    Form
} from "formik";
import { LogInComponent } from '@generated/graphql';
import { setAccessToken } from '@utils/accessToken';
import { AppContext } from '@components/hook/context/mainContext';
import { MyTextField } from '@components/formik/textInput';
import Errors from '@components/Error';
import Email from '@components/icons/email';
import Password from '@components/icons/lock';
import Masthead from '@components/masthead';
import Eyeclose from '@components/icons/eye-close';
import Eyeopen from '@components/icons/eye-open';
import Spinner from '@components/spinner';
import PortalOne from '@components/modal/modal-1';



const SignIn = () => {
    const [errorName, setErrorName] = React.useState({name: "", message: ""});
    const context = React.useContext(AppContext);
    const [showPwd, setshowPwd] = React.useState(false);
    const route = useRouter()

    return (

        <>  
            <main className="auth-form-container display-flex flex-col flex-algn-center position-rel">
                <h1 className="font-size-2 font-weight-2">
                    ¡Te damos la bienvenida de nuevo!
                </h1>
                <div className="auth-form-content">
                    <LogInComponent>
                        {logIn => (
                            <Formik
                                initialValues={{
                                    email: "",
                                    password: ""
                                }}
                                onSubmit={(data, { setSubmitting, resetForm }) => {
                                    setSubmitting(true)
                                    // make async call
                                    logIn({
                                        variables: {
                                            email: data.email,
                                            password: data.password
                                        }
                                    })
                                        .then(respuesta => { 
                                            
                                            const errors = respuesta.data?.logIn!.errors;
                                            const User = respuesta.data?.logIn!.User;
                                            const accessToken = respuesta.data!.logIn!.token! && respuesta.data!.logIn!.token!.accessToken
                                            const errores = {
                                                name: "",
                                                message: ""
                                            };
                                            try{
                                                if(!User && errors){

                                                    errors.forEach(err => {
                                                        errores.name = err?.path!;
                                                        errores.message = err?.message!
                                                    });
                                                    setErrorName({name: errores.name, message: errores.message})
        
                                                    return null
                                                }
                                                
                                                if (respuesta.data!.logIn!.token! && accessToken) {
                                                    setAccessToken(accessToken);
                                                }

                                                context.setAuthenticated(true)
                                                setErrorName({name: "", message: ""});
                                                
                                                route.push('/');    
                                                
                                            }catch (error){
                                                console.error(error)
                                            }
                                            
                                        })
                                        .catch(res => {
                                            console.error(res)
                                            const errors = res?.graphQLErrors[0] !== undefined ? res.graphQLErrors[0].message : res.message;
                                            console.error(errors)
                                        });
                                    setSubmitting(false)
                                    resetForm()
                                }}
                            >
                                {({ isSubmitting }) => (
                                    <>
                                        <Form className="form position-rel">
                                            <label className="input-label">
                                                <span className='let-Spac-button font-weight-3'>Email</span>
                                                <div 
                                                    className={`input-container input-container-1 display-flex flex-algn-center position-rel ${errorName!.name == "email" ? 'iserror': '' }`}
                                                >
                                                    <div className="icon icon-left display-flex flex-algn-center">
                                                        <Email />
                                                    </div>
                                                    <MyTextField
                                                        name="email"
                                                        type="email"
                                                        className="input-form"
                                                        placeholder="Introduce tu correo electrónico"
                                                    />
                                                </div> 
                                                {errorName!.name == "email" && <Errors error={errorName!.message} />}
                                            </label>
                                            <label className="input-label">
                                                <div className="input-label-2">
                                                    <span className='let-Spac-button font-weight-3'>Contraseña</span>
                                                    <div 
                                                        className={`input-container input-container-2 display-flex flex-algn-center position-rel ${errorName!.name == "password" || errorName!.name == "attempLimite" ? 'iserror': '' }`}
                                                    >
                                                        <div className="icon icon-left display-flex flex-algn-center">
                                                            <Password />
                                                        </div>
                                                        <MyTextField
                                                            name="password"
                                                            type={showPwd ? "text" : "password"}
                                                            className="input-form"
                                                            placeholder="Introduce tu contraseña"
                                                        />
                                                        <div className="icon icon-right display-flex flex-algn-center" onClick={() => {setshowPwd(prev => !prev)}}>
                                                            {showPwd ? <Eyeclose />  : <Eyeopen />}
                                                        </div>
                                                    </div>
                                                    {errorName!.name == "password" && <Errors error={errorName!.message} />}
                                                    {errorName!.name == "attempLimite" && <Errors error={errorName!.message} />}
                                                </div>
                                            </label>
                                            <button  
                                                disabled={isSubmitting} 
                                                className="font-weight-2 let-Spac-button font-size-4 let-Spac-button" 
                                                type="submit"
                                            >
                                                Enviar
                                            </button>
                                        </Form>
                                        {isSubmitting &&
                                            <PortalOne id='modal-root'>
                                                <Spinner />
                                            </PortalOne>
                                        }
                                    </>
                                )}
                            </Formik>
                        )}
                    </LogInComponent>
                    <Masthead
                        text="¿No tienes una cuenta?"
                        pageName="Crear cuenta"
                        pathname="/signup"
                    />
                </div>
            </main>
        </>
    )
}


export default SignIn