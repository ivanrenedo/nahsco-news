import React from 'react';
import {
    Formik,
    Form
} from "formik";
import { useQuery } from '@apollo/client';

import { MyTextField } from '@components/formik/textInput';
import Errors from '@components/Error';
import { EditInformartionComponent, MeDocument, MeQuery } from '@generated/graphql';
import { AppContext } from '@components/hook/context/mainContext';
import { Types } from '@components/hook/context/mainReducer';
import LeftIcon from '@components/icons/leftArrow';


const StartPersonalInfo = () => {
    const [errorName, setErrorName] = React.useState({name: "", message: ""});
    const { closeSidebar, dispatch } = React.useContext(AppContext);
    
    const {data} = useQuery(MeDocument, { fetchPolicy: "cache-first", ssr: true});


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
                    <span className="label font-weight-3 font-size-3">Información personal</span>
                    <span className="exit-config m-l-12 icon-button-hover display-flex flex-algn-center"><LeftIcon /></span>
                </button>
                <div className="auth-form-content">
                    <EditInformartionComponent>
                        {editInformartion => (
                            <Formik
                                initialValues={{
                                    firstName: data?.me && data?.me?.firstName ? data?.me?.firstName : "",
                                    lastName: data?.me && data?.me?.lastName ? data?.me?.lastName : "",
                                    phone_number: data?.me && data?.me?.phone_number ? data?.me?.phone_number : ""
                                }}
                                onSubmit={(data, { setSubmitting, resetForm }) => {
                                    setSubmitting(true)
                                    // make async call
                                    editInformartion({
                                        variables: {
                                            data: {
                                                firstName: data.firstName,
                                                lastName: data.lastName,
                                                phone_number: data.phone_number
                                            }
                                        },
                                        update: (cache, { data }) => {
                                            try {
                                                
                                                const getOldata = cache.readQuery<MeQuery>({ query: MeDocument });
        
                                                cache.writeQuery<MeQuery>({
                                                    query: MeDocument,
                                                    data: {
                                                        __typename: 'Query',
                                                        me: {
                                                            id: getOldata?.me.id,
                                                            firstName: data?.editInformartion?.User?.firstName,
                                                            lastName: data?.editInformartion?.User?.lastName,
                                                            phone_number : data?.editInformartion?.User?.phone_number,                          
                                                            email: getOldata?.me.email,                  
                                                            password : getOldata?.me.password,          
                                                            tokenversion: getOldata?.me.tokenversion,         
                                                            role : getOldata?.me.role,
                                                            permission: getOldata?.me.permission,
                                                            createdAt: getOldata?.me.createdAt
                                                        }
                                                    }
                                                });
        
                                            }catch(error){
                                                console.log(error)
                                            }
                                        }
                                    })
                                        .then(respuesta => { 
                                            
                                            const errors = respuesta.data?.editInformartion!.errors;
                                            const experience = respuesta.data?.editInformartion!.User;
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
                                                    <span className='let-Spac-button font-weight-3'>Nombre</span>
                                                    <div 
                                                        className={`input-container input-container-1 display-flex flex-algn-center position-rel ${errorName!.name == "lastName" ? 'iserror': '' }`}
                                                    >
                                                        <MyTextField
                                                            name="firstName"
                                                            type="text"
                                                            className="input-form"
                                                        />
                                                    </div> 
                                                    {errorName!.name == "firstName" && <Errors error={errorName!.message} />}
                                                </div> 
                                            </label>
                                            <label className="input-label">
                                                <div className="input-label-2">
                                                    <span className='let-Spac-button font-weight-3'>Apellido</span>
                                                    <div 
                                                        className={`input-container input-container-1 display-flex flex-algn-center position-rel ${errorName!.name == "lastName" ? 'iserror': '' }`}
                                                    >
                                                        <MyTextField
                                                            name="lastName"
                                                            type="text"
                                                            className="input-form"
                                                        />
                                                    </div> 
                                                    {errorName!.name == "lastName" && <Errors error={errorName!.message} />}
                                                </div> 
                                            </label>
                                            <label className="input-label">
                                                <div className="input-label-2">
                                                    <span className='let-Spac-button font-weight-3'>Teléfono</span>
                                                    <div 
                                                        className={`input-container input-container-1 display-flex flex-algn-center position-rel ${errorName!.name == "lastName" ? 'iserror': '' }`}
                                                    >
                                                        <MyTextField
                                                            name="phone_number"
                                                            type="tel"
                                                            className="input-form"
                                                        />
                                                    </div> 
                                                    {errorName!.name == "phone_number" && <Errors error={errorName!.message} />}
                                                </div> 
                                            </label>
                                            <div className="display-flex flex-col flex-justify-between button-container">
                                                <button 
                                                    disabled={isSubmitting} 
                                                    className="font-weight-2 let-Spac-button font-size-4 let-Spac-button" 
                                                    type="submit"
                                                    >
                                                    Guardar
                                                </button>
                                            </div>
                                        </Form>
                                    </>
                                )}
                            </Formik>
                        )}
                    </EditInformartionComponent>
                </div>
            </main>
        </>
    )
}


export default StartPersonalInfo