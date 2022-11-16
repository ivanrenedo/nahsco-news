import React from 'react';

const HamburguerSvg = () => (
    <svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" width='17px' height='17px' viewBox="0 0 24 24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 18c1.657 0 3 1.343 3 3s-1.343 3-3 3-3-1.343-3-3 1.343-3 3-3zm0-9c1.657 0 3 1.343 3 3s-1.343 3-3 3-3-1.343-3-3 1.343-3 3-3zm0-9c1.657 0 3 1.343 3 3s-1.343 3-3 3-3-1.343-3-3 1.343-3 3-3z"/>
    </svg>
)
const Hamburguer = () => {
    return <HamburguerSvg />
}


export default Hamburguer;