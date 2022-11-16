import React, { useState, useEffect, useRef, useCallback, ReactNode } from 'react'
import Link from 'next/link';
import { menuHeaderOptionArr } from '@components/header/mainData';
import CustomScrollShape from './general/customScroll';




interface DropdownMenu {
    id?: string;
    closeOnSelection: boolean;
    openOnHover?: boolean;
    handleSelection: any;
    children: ReactNode
}

const LayoutMenuHeaderOptions: React.FC<DropdownMenu> = ({
    id,
    closeOnSelection,
    handleSelection,
    openOnHover = false,
    children
}) => {
    
    const dropdownEl = useRef<HTMLDivElement>(null);
    const scrollHostRef = React.useRef<HTMLDivElement>(null)
    const [menuOpen, setMenuOpen] = useState(false);

    const handleOutsideClick = useCallback(event => {
        if (dropdownEl.current && !dropdownEl.current!.contains(event.target)) {
            toggleMenuOpen();
        }
    }, []);

    useEffect(() => {
        if (menuOpen) {
            document.addEventListener("click", handleOutsideClick);
        } else {
            document.removeEventListener("click", handleOutsideClick);
        }

        return () => document.removeEventListener("click", handleOutsideClick);
    }, [menuOpen, handleOutsideClick]);

    const toggleMenuOpen = () => {
        setMenuOpen(prev => !prev);
    };
    const toggleOnHover = openOnHover ? toggleMenuOpen : () => ({});

    const onSelection = selection => () => {
        handleSelection(selection);
        if (closeOnSelection) {
            toggleMenuOpen();
        }
    }
    
    return (
        <>
            <div id={id} className="position-rel display-flex flex-algn-center" ref={dropdownEl} >
                <button aria-label="Opciones de navegación" type="button" onClick={toggleMenuOpen} onMouseOver={toggleOnHover}>
                    {children}
                </button>
                <div aria-label="menu" className={`${menuOpen ? "open" : "close"}`}>
                    <div className="nav-menu-header-wrap rad-shadow box-sizing display-block overflow-h-x overflow-h-y position-rel">
                        <div className="nav-menu-header-wrap-container display-flex flex-col">
                            <div className="position-rel display-flex flex-col flex-shrink box-sizing p-t-16 p-b-4 z-index-0">
                                <div className="display-flex flex-grow flex-col flex-justify-center box-sizing min-height-0 p-r-16 p-l-16">
                                    <span className="label-menu font-weight-1 font-size-3 display-block">Menú</span>
                                </div>
                            </div>
                            <CustomScrollShape scrollHostRef={scrollHostRef}>
                                <div className="width-100 max-width-100 display-block box-sizing">
                                    <div className="nav-menu-header-body font-inherit display-flex flex-algn-stretch flex-justify-center">
                                        <div className="width-100 max-width-100 m-r-8 m-l-8 m-t-8 m-b-8 display-block flex-basis-0 flex-shrink flex-grow z-index-0 font-inherit">
                                            <div className="display-flex width-100">
                                                <div className="nav-menu-header-body--surface box-sizing width-100 z-index-0 display-block">
                                                    <div className="nav-menu-header-body--surface--width z-index-0 box-sizing width-100 display-flex flex-col flex-shrink">
                                                        <div className="display-flex flex-col flex-grow z-index-0 box-sizing">
                                                            <div className="display-flex flex-col box-sizing">
                                                                <div className="display-flex flex-col flex-grow box-sizing">
                                                                    <div ref={scrollHostRef} className="nav-menu-header-wrap-contain scrollhost overflow-h-x overflow-auto-y pespective-origin-rt transf-style overscroll-bihavior-y z-index-0 display-flex flex-col">
                                                                        <div  className="display-flex flex-col flex-grow box-sizing">
                                                                            {menuHeaderOptionArr.map(({name, dropdownOptions}, i) => {
                                                                                return(
                                                                                    <div key={i} className="nav-menu-header-body--items display-flex flex-col flex-shrink box-sizing z-index-0 max-width-100">
                                                                                        <div className="display-flex flex-col flex-grow box-sizing">
                                                                                            <div className="display-flex flex-col max-width-100 p-r-8 p-l-8 p-b-8 p-t-0">
                                                                                                <div className="display-flex flex-col flex-shrink max-width-100 p-t-8">
                                                                                                    <div className="display-flex flex-col flex-grow box-sizing position-rel">
                                                                                                        <div className="display-flex flex-col flex-shrink max-width-100 p-r-8 p-l-8 box-sizing">
                                                                                                            <div className="p-n-t-b-5">
                                                                                                                <div className="p-t-b-5">
                                                                                                                    <h2 className="label-menu font-weight-2 font-size-4 line-h-1">{name}</h2>
                                                                                                                </div>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="display-flex flex-col flex-shrink box-sizing z-index-0 max-width-100 p-r-8 p-l-8 p-t-0">
                                                                                                <ul className="display-flex flex-col flex-grow" role="listbox" aria-busy="false">
                                                                                                    {dropdownOptions.map(({name, descripción, icon, route}, i) => {
                                                                                                        return(
                                                                                                            <li key={i} className="p-r-0 p-l-0 display-block font-inherit">
                                                                                                                <Link  href="/[index]" as={route}>
                                                                                                                    <a role="link" className='nav-menu-items-link-container font-inherit display-block position-rel flex-row flex-algn-stretch flex-shrink flex-basis-a border-r-5 min-height-0 p-r-0 p-b-0 p-l-0 p-t-0 m-r-0 m-b-0 m-t-0 m-l-0 border-0'>
                                                                                                                        <div className="nav-menu-header-body--items-link border-0 min-width-0 display-flex flex-row flex-algn-center flex-justify-between flex-grow flex-shrink-1 p-r-8 p-l-8 p-t-0 p-b-0 m-r-0 m-l-0 m-t-0 m-b-0">
                                                                                                                            <div className="position-rel display-flex flex-col flex-algn-start m-r-12 m-t-8 m-b-8">
                                                                                                                                <div className="nav-menu-header-body--items-icon display-flex flex-justify-center flex-algn-center">{icon}</div>
                                                                                                                            </div>
                                                                                                                            <div className="box-sizing position-rel display-flex flex-row flex-justify-between flex-algn-center flex-grow flex-shrink-1 min-width-0 p-l-0 p-r-0 p-t-0  p-b-0 border-0">
                                                                                                                                <div className="position-rel box-sizing font-inherit min-width-0 min-height-0 display-flex flex-col flex-justify-between flex-algn-stretch flex-grow flex-shrink-1 flex-basis-0 p-l-0 p-r-0 p-t-12 p-b-12 m-r-0 m-l-0 m-t-0 border-0">
                                                                                                                                    <div className="m-n-t-b-5 display-flex flex-col">
                                                                                                                                        <div className="m-t-b-5 display-block font-inherit">
                                                                                                                                            <span className="font-weight-3 label-menu line-h-2" dir="auto">{name}</span>
                                                                                                                                        </div>
                                                                                                                                        <div className="display-block font-inherit">
                                                                                                                                            <span className="font-size-5 font-weight-4 mask-text line-h-2" dir="auto">{descripción}</span>
                                                                                                                                        </div>
                                                                                                                                    </div>
                                                                                                                                </div>
                                                                                                                            </div>
                                                                                                                        </div>
                                                                                                                    </a>
                                                                                                                </Link>
                                                                                                            </li>
                                                                                                        )
                                                                                                    })}
                                                                                                </ul>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                )
                                                                            })}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CustomScrollShape>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LayoutMenuHeaderOptions
