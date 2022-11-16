import React from "react";
import {
    useField,
    FieldAttributes,
    Field
} from "formik";

export const TextAreaField: React.FC<FieldAttributes<{}>> = ({
    id,
    as,
    placeholder,
    className,
    autoComplete,
    ...props
}) => {
    const [{ value, ...field }] = useField<{}>(props);

    return (
        <>
            <Field
                id={id}
                as='textarea'
                rows={10}
                placeholder={placeholder}
                className={className}
                {...field}
                autoComplete={autoComplete}
            />
        </>
    );
};
