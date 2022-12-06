import React from 'react';
import Link from "next/link";
import { useRouter } from "next/router";

import { t } from '@lingui/macro';

const availableLanguageNames = {
  en: t`English`,
  es: t`Spanish`,
}

export default function LocaleSwitcher() {
  const router = useRouter();

  const { locales, locale: activeLocale, route, query } = router;
  const otherLocale = locales?.find((cur) => cur !== activeLocale)!
  
  return (
    <Link href={{href: route, query: query}} locale={otherLocale} >
      <a className=' display-flex flex-algn-center '>
        {availableLanguageNames[otherLocale] == "English" || availableLanguageNames[otherLocale] == "Inglés" ? 
          (<div className='display-flex flex-algn-center position-rel box-sizing'>
            <div className="overflow-h-x overflow-h-y position-rel flag-size">
              <img src='/img/united-states.png' srcSet='/img/united-states.png' className="image" alt='china icons">China icons created by Freepik - Flaticon' />
            </div>
            <span className='m-l-8 text-black-var-1 font-weight-3'>En</span>
          </div>) : 
          (<div className='display-flex flex-algn-center position-rel box-sizing'>
            <div className="overflow-h-x overflow-h-y position-rel flag-size">
              <img src='/img/spain.png' srcSet='/img/spain.png' className="image" alt='china icons">China icons created by Freepik - Flaticon' />
            </div>
            <span className='m-l-8 text-black-var-1'>Es</span>
          </div>)
        }
      </a>
    </Link>
  );
}