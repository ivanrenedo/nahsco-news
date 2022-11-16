import React, {  } from 'react';
import {useRouter} from 'next/router';
import cookie from "cookie";
import _ from 'lodash';
import LayoutMain from '@components/layout/LayoutAuth';


function IndexPage() {
    const router = useRouter();

    const url = router.query.index as string[];

    console.log(url)


    const renderMainPage = () => {

        switch (url.join("/")) {

            case "news":

                return(
                    <LayoutMain title='News'>
                        News
                    </LayoutMain>  
                )

            case "people":

                return(
                    <LayoutMain title='People'>
                        <>Las personas más sorprendentes</>
                    </LayoutMain>  
                )

            default:
                return (
                    <> La Pagina no existe</>
                )
        }
    }


  

    return(
        <>
            {renderMainPage()}
        </>
    );
}

export async function getServerSideProps(context) {
    
    const cookies = cookie.parse(context.req ? context.req.headers.cookie || "" : document.cookie);
     
    /* if (!isBrowser && !cookies.rsht) {
        redirect(context.res, '/signin')
    } */
    
    return {
        props: {}, // will be passed to the page component as props
    }
}

export default IndexPage;