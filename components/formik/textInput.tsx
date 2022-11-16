import React from "react";
import {
    useField,
    FieldAttributes,
    Field
} from "formik";

export const MyTextField: React.FC<FieldAttributes<{}>> = ({
    id,
    placeholder,
    className,
    type,
    autoComplete,
    ...props
}) => {
    const [{ value, ...field }] = useField<{}>(props);

    return (
        <>
            <Field
                id={id}
                placeholder={placeholder}
                className={className}
                {...field}
                type={type}
                autoComplete={autoComplete}
            />
        </>
    );
};
