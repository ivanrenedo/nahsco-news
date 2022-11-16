import React from 'react';
import {
    useField,
    FieldAttributes,
    Field
} from "formik";

const CheckBox: React.FC<FieldAttributes<{}>> = ({
    id,
    type,
    className,
    onChange,
    ...props
}) => {
    const [{ value, ...field }] = useField<{}>(props);
    
    return (
        <>
            <Field
                className={className}
                {...field}
                type={type}
                value={id}
            />
        </>
    )
}

export default CheckBox;