import Document, {DocumentContext, Html, Head, Main, NextScript } from 'next/document';
import { GA_TRACKING_ID }  from '@utils/gtag';


class MyDocument extends Document {
    static async getInitialProps(ctx: DocumentContext) {
        const initialProps = await Document.getInitialProps(ctx)
        return { ...initialProps, locale: ctx?.locale || "en" };
    }

    render() {

        /* Nuestra función tiene que ser un string */
        const blockingSetInitialColorMode = `
            const setInitialColorMode = () => {
                const getInicialColorMode = () => {
                    const preference = window.localStorage.getItem("theme");
                    const hasExplicitPreference = typeof preference === "string";
            
                    /* 
                        Si el usuario ha elegido explicitamente el modo claro u oscuro,
                        útilizalo. En otro caso el valor será nulo.
                    */
            
                    if (hasExplicitPreference) {
                        return preference;
                    }
            
                    //Si no ha guardado ninguna preferencia, utiliza los media query.
                    const mediaQuery = "(prefers-color-scheme: dark)";
                    const mql = window.matchMedia(mediaQuery);
            
                    const hasImplicitPreference = typeof mql.matches === "boolean";
            
                    if (hasImplicitPreference) {
                        return mql.matches ? "light" : "dark";
                    }
            
                    //Default value 'ligth';
            
                    return "ligth";
                }
            
                const colorMode = getInicialColorMode();
                const root = document.documentElement;
            
                root.style.setProperty("--initial-color-mode", colorMode);
            
                //Añadir etiqueta HTML si es modo oscuro.
                if (colorMode === "dark") document.documentElement.setAttribute("data-theme", "dark");
            }

            setInitialColorMode()
        `;

        return (
            <Html lang={this.props.locale}>
                <Head >
                    <link rel="preconnect" href="https://fonts.gstatic.com"/>
                    <link rel="manifest" href="/manifest.json"/>
                </Head>
                <body className="body-class" id="nahsco">
                <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2621121538375000" crossOrigin="anonymous"></script>
                    <script
                        dangerouslySetInnerHTML={{
                            __html: blockingSetInitialColorMode
                        }}
                    ></script>
                    {/* Global Site Tag (gtag.js) - Google Analytics */}
                    <script
                        async
                        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
                    />
                    <script
                        dangerouslySetInnerHTML={{
                        __html: `
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', '${GA_TRACKING_ID}', {
                        page_path: window.location.pathname,
                        });
                    `,
                        }}
                    />
                    <Main />
                    <NextScript />
                    <div id="modal-root" style={{zIndex: 2000, position: "fixed", top: 0, bottom: 0}}/>
                    <div id="modal-confirm-action" style={{zIndex: 2000, position: "fixed", top: 0, bottom: 0}}/>
                    <script>
                        (adsbygoogle = window.adsbygoogle || []).push({});
                    </script>
                </body>
            </Html>
        )
    }
}

export default MyDocument
