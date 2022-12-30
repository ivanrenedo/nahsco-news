import React from 'react';
import _ from 'lodash';

import LayoutMain from '@components/layout/LayoutAuth';
import BaseShape from '@components/layout/general/baseShape';
import ContactUsComponent from '@components/pages/contact-us';

function ContactUs() {
    
    

    

    return(
        <LayoutMain title='Inicio'> 
            <div className="landing-page">
                <BaseShape>
                    <ContactUsComponent />
                </BaseShape>
            </div>
             
        </LayoutMain>
    );
}

export async function getStaticProps(context) {
    
    
    return {
        props: {}, // will be passed to the page component as props
    }
}

export default ContactUs;