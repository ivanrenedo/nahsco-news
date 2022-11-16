import React from 'react';
import {
    Formik,
    Form
} from "formik";

import { MyTextField } from '@components/formik/textInput';
import Errors from '@components/Error';
import { DeleteAccountComponent } from '@generated/graphql';
import { AppContext } from '@components/hook/context/mainContext';
import { Types } from '@components/hook/context/mainReducer';
import LeftIcon from '@components/icons/leftArrow';


const DeleteAccount = () => {
    const [errorName, setErrorName] = React.useState({name: "", message: ""});
    const { closeSidebar, dispatch } = React.useContext(AppContext);


    const onPersonalInfo = () => {

        closeSidebar();
        
        dispatch({
            type: Types.config,
            payload: {
                config: false,
                privacy: false
            }
        })
        
    }


    return (

        <>  
            <main className="auth-form-container m-t-0 display-flex flex-col flex-algn-center position-rel">
                <button type='button' className="display-flex flex-algn-center exit-config-container" onClick={onPersonalInfo}>
                    <span className="label font-weight-1ç3 font-size-3">Eliminar cuenta</span>
                    <span className="exit-config m-l-12 icon-button-hover display-flex flex-algn-center"><LeftIcon /></span>
                </button>
                <div className="auth-form-content">
                    <DeleteAccountComponent>
                        {deleteAccount => (
                            <Formik
                                initialValues={{
                                    password: ""
                                }}
                                onSubmit={(data, { setSubmitting, resetForm }) => {
                                    setSubmitting(true)
                                    // make async call
                                    deleteAccount({
                                        variables: {
                                            password: data.password
                                        }
                                    })
                                        .then(respuesta => { 
                                            
                                            const errors = respuesta.data?.deleteAccount!.errors;
                                            const experience = respuesta.data?.deleteAccount!.User;
                                            const errores = {
                                                name: "",
                                                message: ""
                                            };
                                            try{
                                                if(!experience && errors){

                                                    errors.forEach(err => {
                                                        errores.name = err?.path!;
                                                        errores.message = err?.message!
                                                    });
                                                    setErrorName({name: errores.name, message: errores.message})
        
                                                    return null
                                                }

                                                setErrorName({name: "", message: ""}); 
                                                onPersonalInfo()  
                                                localStorage.clear();
                                                location.assign(`${location.href}?delete=true`); 
                                                
                                            }catch (error){
                                                console.error(error)
                                            }
                                            
                                        })
                                        .catch(res => {
                                            const errors = res?.graphQLErrors[0] !== undefined ? res.graphQLErrors[0].message : res.message;
                                            console.error(errors)
                                        });
                                    setSubmitting(true)
                                    resetForm()
                                }}
                            >
                                {({ isSubmitting }) => (
                                    <>
                                        <Form className="form position-rel">
                                            <label className="input-label">
                                                <div className="input-label-2">
                                                    <span className='let-Spac-button font-weight-3'>Contraseña</span>
                                                    <div 
                                                        className={`input-container input-container-1 display-flex flex-algn-center position-rel ${errorName!.name == "lastName" ? 'iserror': '' }`}
                                                    >
                                                        <MyTextField
                                                            name="password"
                                                            type="text"
                                                            className="input-form"
                                                        />
                                                    </div> 
                                                    {errorName!.name == "password" && <Errors error={errorName!.message} />}
                                                </div> 
                                            </label>
                                            <div className="display-flex flex-col flex-justify-between button-container">
                                                <button 
                                                    disabled={isSubmitting} 
                                                    className="font-weight-2 let-Spac-button font-size-4 let-Spac-button" 
                                                    type="submit"
                                                    >
                                                    Eliminar
                                                </button>
                                            </div>
                                        </Form>
                                    </>
                                )}
                            </Formik>
                        )}
                    </DeleteAccountComponent>
                </div>
            </main>
        </>
    )
}


export default DeleteAccount