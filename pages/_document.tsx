import Document, {DocumentContext, Html, Head, Main, NextScript } from 'next/document';


class MyDocument extends Document {
    static async getInitialProps(ctx: DocumentContext) {
        const initialProps = await Document.getInitialProps(ctx)
        
        return {...initialProps}
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
            <Html lang='es' >
                <Head >
                    <link rel="preconnect" href="https://fonts.gstatic.com"/>
                    <link rel="manifest" href="/manifest.json"/>
                </Head>
                <body className="body-class" id="nahsco">
                    <script
                        dangerouslySetInnerHTML={{
                            __html: blockingSetInitialColorMode
                        }}
                    ></script>
                    <Main />
                    <NextScript />
                    <div id="modal-root" style={{zIndex: 2000, position: "fixed", top: 0, bottom: 0}}/>
                    <div id="modal-confirm-action" style={{zIndex: 2000, position: "fixed", top: 0, bottom: 0}}/>
                </body>
            </Html>
        )
    }
}

export default MyDocument
