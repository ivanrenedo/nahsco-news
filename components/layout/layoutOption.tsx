import React, { useState, useEffect, useRef, useCallback, ReactNode } from 'react';

import Arrow from '../icons/Arrow';
import { DropdownItem } from '../../interfaces';
import LogOut from '@components/auth/logOut'
import LeftIcon from '@components/icons/leftArrow';
import { layoutHelpArr } from '@components/header/mainData';
import { AppContext } from '@components/hook/context/mainContext';
import { Types } from '@components/hook/context/mainReducer';

interface DropdownMenu {
    id?: string;
    closeOnSelection: boolean;
    openOnHover?: boolean;
    dataServer: any;
    handleSelection: any;
    children: ReactNode
}

const LayoutOptions: React.FC<DropdownMenu> = ({
    id,
    closeOnSelection,
    handleSelection,
    openOnHover = false,
    dataServer,
    children
}) => {
    
    const dropdownEl = useRef<HTMLDivElement>(null);
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeMenu, setActiveMenu] = useState("main");

    const { openSidebar, dispatch } = React.useContext(AppContext);

    const email = dataServer && dataServer?.email ? `${dataServer?.email}` : "-- --";

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

    const onPersonalInfo = () => {

        if (closeOnSelection) {
            openSidebar();
        }
        
        dispatch({
            type: Types.config,
            payload: {
                config: true
            }
        })
        
        setMenuOpen(prev => !prev);
    }

    const onChangeEmail = () => {

        if (closeOnSelection) {
            openSidebar();
        }

        dispatch({
            type: Types.config,
            payload: {
                email: true
            }
        })
        
        setMenuOpen(prev => !prev);
    }

    const onChangePasword = () => {

        if (closeOnSelection) {
            openSidebar();
        }

        dispatch({
            type: Types.config,
            payload: {
                privacy: true
            }
        })
        
        setMenuOpen(prev => !prev);
    }

    const onDeleteAccount = () => {

        if (closeOnSelection) {
            openSidebar();
        }

        dispatch({
            type: Types.config,
            payload: {
                deleteAccount: true
            }
        })
        
        setMenuOpen(prev => !prev);
    }

    const DropdownItem = ({leftIcon, rightIcon, goToMenu, children}:DropdownItem) => {
        return (
            <button aria-label="Opciones" type='button' className="drop-item display-flex flex-algn-center option--item" onClick={() => goToMenu && setActiveMenu(goToMenu)}>
                <div className="icon-button display-flex flex-algn-center">{leftIcon}</div>
                <div className="label">{children}</div>
                <div className="icon-button display-flex flex-algn-center">{rightIcon}</div>
            </button>
        );
    }
    
    return (
        <>
            <div id={id} className="position-rel display-flex flex-algn-center" ref={dropdownEl} >
                <button type="button" onClick={toggleMenuOpen} onMouseOver={toggleOnHover}>
                    {children}
                </button>
                <nav className={`swipe-wrap rad-shadow ${menuOpen ? "open" : "close"}`}>
                    <div className="swipe-menu">
                        <div className="tray">
                            <ul className={`navbar-nav ${activeMenu === 'main' ? 'menu-primary-enter-active' : 'menu-primary-exit-active'}`} >
                                <li className="option--item visit-profile cursor-initial">
                                    <div className='display-flex flex-algn-center'>
                                        <div className="display-flex flex-col avatar-info">
                                            <span className="font-weight-2 title-file font-size-4">{email}</span>
                                        </div>
                                    </div>
                                </li> 
                                <hr /> 
                                {layoutHelpArr?.map(({ icon, name, ...rest }, i) => {
                                    return (
                                        <li key={i} onClick={onSelection(rest)}>
                                            <DropdownItem
                                                leftIcon={icon}
                                                rightIcon={rest && <Arrow /> }
                                                goToMenu={name}
                                                >
                                                {name}
                                            </DropdownItem>
                                        </li>
                                    )
                                })}
                                <li className="option--item">
                                    <LogOut/>
                                </li>
                            </ul>
                            {
                                layoutHelpArr!.map(({ submenu, name }, i) => {
                                    if (submenu) {
                                        
                                        return( 
                                            <div key={i} className={`drop-submenu navbar-nav ${activeMenu === name ? 'menu-secondary-enter-active' : 'menu-secondary-exit-active'}`}>
                                                <button type='button' className="display-flex flex-algn-center backward" onClick={() => 'main' && setActiveMenu('main')}>
                                                    <span className="icon-button icon-button-hover display-flex flex-algn-center"><LeftIcon /></span>
                                                    <span className="label font-weight-1 font-size-3">{name}</span>
                                                </button>
                                                <ul className="submunu-option">
                                                    <li className="option--item" onClick={onPersonalInfo}>
                                                        <div className='drop-item display-flex flex-algn-center'>
                                                            <span className="icon-button display-flex flex-algn-center"></span>
                                                            <span className="label display-flex flex-algn-center">Modificar información personal</span>
                                                        </div>
                                                    </li>
                                                    <li className="option--item" onClick={onChangeEmail}>
                                                        <div className='drop-item display-flex flex-algn-center'>
                                                            <span className="icon-button display-flex flex-algn-center"></span>
                                                            <span className="label display-flex flex-algn-center">Cambiar Email</span>
                                                        </div>
                                                    </li>
                                                    <li className="option--item" onClick={onChangePasword}>
                                                        <div className='drop-item display-flex flex-algn-center'>
                                                            <span className="icon-button display-flex flex-algn-center"></span>
                                                            <span className="label display-flex flex-algn-center">Cambiar contraseña</span>
                                                        </div>
                                                    </li>
                                                    <li className="option--item" onClick={onDeleteAccount}>
                                                        <div className='drop-item display-flex flex-algn-center'>
                                                            <span className="icon-button display-flex flex-algn-center"></span>
                                                            <span className="label display-flex flex-algn-center color-delete">Eliminar cuenta</span>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        )
                                    }
                                    return null
                                })
                            }
                        </div>
                    </div>
                </nav>
            </div>
        </>
    )
}

export default LayoutOptions
