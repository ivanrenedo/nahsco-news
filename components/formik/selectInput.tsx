import React from "react";
import {
    useField,
    FieldAttributes,
    Field
} from "formik";


export const SelectField: React.FC<FieldAttributes<{}>> = ({
    id,
    className,
    as,
    children,
    ...props
}) => {
    const [{ value, ...field }] = useField<{}>(props);

    return (
        <>
            <Field
                id={id}
                className={className}
                as={as}
                {...field}
            >
                {children}
            </Field>
        </>
    );
};
