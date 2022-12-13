import {useRouter} from "next/router";


export default function Custom404() {

    const router = useRouter()
    return (
        <div className="primary-bg-1"> 
            <div>
                <div className="starsec"></div>
                <div className="starthird"></div>
                <div className="starfourth"></div>
                <div className="starfifth"></div>
            </div>
            {/* Dust particle end */}


            <div className="lamp__wrap">
                <div className="lamp">
                    <div className="cable"></div>
                    <div className="cover"></div>
                    <div className="in-cover">
                    <div className="bulb"></div>
                    </div>
                    <div className="light"></div>
                </div>
            </div>
            {/* END Lamp */}
            <section className="error">
            {/* Content */}
            <div className="error__content">
                <div className="error__message message">
                    <h1 className="message__title">Página No Encontrada</h1>
                    <p className="message__text">Lo sentimos, la página que buscaba no se encuentra aquí. El enlace que siguió puede estar roto o ya no existe. Vuelva a intentarlo o eche un vistazo a nuestro.</p>
                </div>
                <div className="error__nav e-nav">
                    <button className="e-nav__link" onClick={ () => router.push('/')}></button>
                </div>
            </div>
            {/* END Content */}

            </section>

        </div>
    );
}