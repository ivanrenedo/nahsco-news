import React from 'react';

type Props = {
    error: string
}

const Errors = ({error}: Props) => {
    return (
        <>
            {error ? <p className="error font-size-5 font-weight-3">{error}</p> : ''}
            
        </>
    )
}

export default Errors; 