import React from 'react';


const windowResize = () => {
    let [windowWidth, setWindowWidth] = React.useState<number | undefined>();



    React.useEffect(() => {

        /* show navbar */
        const handleWindowWidth = () => {
            setWindowWidth(window.innerWidth)
        }

        const timer = setTimeout(() => {
            handleWindowWidth()
        }, 25);

        window.addEventListener('resize', handleWindowWidth)

        return () => {
            window.removeEventListener('resize', handleWindowWidth)
            clearTimeout(timer)
        }

    }, [windowWidth]);

    return {
        windowWidth
    }
}


export default windowResize