import React from 'react';
import Link from 'next/link';
import {
    useField,
    FieldAttributes,
    Field
} from "formik";

const CheckBoxValidate: React.FC<FieldAttributes<{}>> = ({
    id,
    type,
    className,
    ...props
}) => {
    const [{ value, ...field }, meta] = useField<{}>(props);

    return (
        <>
            <div className="check display-flex">
                <label >
                    <Field 
                        id={id}
                        className={className}
                        {...field}
                        type={type}
                    />
                    <svg xmlns="http://www.w3.org/2000/svg" width="26px" height="23px">
                        <path className="path-back" d="M1.5,6.021V2.451C1.5,2.009,1.646,1.5,2.3,1.5h18.4c0.442,0,0.8,0.358,0.8,0.801v18.398c0,0.442-0.357,0.801-0.8,0.801H2.3c-0.442,0-0.8-0.358-0.8-0.801V6" />
                        <path className="path-moving" d="M24.192,3.813L11.818,16.188L1.5,6.021V2.451C1.5,2.009,1.646,1.5,2.3,1.5h18.4c0.442,0,0.8,0.358,0.8,0.801v18.398c0,0.442-0.357,0.801-0.8,0.801H2.3c-0.442,0-0.8-0.358-0.8-0.801V6" />
                    </svg>
                </label>
                <div className="font-size-5">
                    Aceptas las
                    <Link href="#">
                        <a className="font-weight-3">
                            Condiciones de uso,
                        </a>
                    </Link>
                    la
                    <Link href="#">
                        <a className="font-weight-3">
                            Política de privacidad
                        </a>
                    </Link>
                    y la
                    <Link href="#">
                        <a className="font-weight-3">
                            Política de cookies 
                        </a>
                    </Link>
                    de Gepetrol Networking.
                </div>
            </div>
            {meta.error && <div className="error font-size-5 font-weight-3">{meta.error}</div>}
        </>
    )
}

export default CheckBoxValidate;