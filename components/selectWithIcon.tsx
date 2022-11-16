import React, {useState, useRef, useEffect, useCallback} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import Arrow from './icons/Arrow';
import CustomScrollDiv from './hook/customSrollDiv';

library.add(fas, fab)


interface NavegationSelect {
    items: any[];
    id: string;
    setItem?: any
}

const SelectWithIcon: React.FC<NavegationSelect> = ({
    items,
    id,
    setItem
}) => {
    
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [menuOpen, setMenuOpen] = useState(false);
    const [getName, setgetName] = useState("");
    let navRef = useRef<HTMLDivElement>(null);
    const scrollHostRef = React.useRef<HTMLDivElement>(null)

    const handleOutsideClick = useCallback(event => {
        if (navRef.current && !navRef.current!.contains(event.target)) {
            toggleMenuOpen();
        }
    }, []);

    useEffect(() => {
        if (navRef.current) {
            setgetName(navRef.current.attributes[0].value)
        }

        if (menuOpen) {
            document.addEventListener("click", handleOutsideClick);
        } else {
            document.removeEventListener("click", handleOutsideClick);
        }

        return () => document.removeEventListener("click", handleOutsideClick);
    }, [navRef, getName, menuOpen, handleOutsideClick])

    const toggleMenuOpen = () => {
        setMenuOpen(prev => !prev);
    };

    const setActiveIndex = (event, index) => {
        if (selectedIndex !== index) {
            setSelectedIndex(index);
        }
    }

    const setIcon = (event, item) => {
        setItem(item)
    }

    const {
        handlerMouseOver,
        handlerMouseOut,
        handlerDocumentMouseDown,
        hovering,
        scrollBoxHeight,
        scrollBoxTop
    } = CustomScrollDiv(scrollHostRef)
    
    return (
        <div id={id} className="display-block" ref={navRef}>
            <button className="main-input-container display-flex flex-algn-center width-100 p-r-12 p-l-12 p-t-12 p-b-12 border-r-5" type='button' onClick={toggleMenuOpen}>                 
                <div className="display-flex flex-algn-center flex-grow flex-shrink-1">
                    {items[selectedIndex].font && <FontAwesomeIcon className="m-r-12 m-l-8" size="lg" icon={[items[selectedIndex].prefix, items[selectedIndex].font]} style={{color: items[selectedIndex].color}} />}
                    <span className="font-weight-4">{items[selectedIndex].name ? items[selectedIndex].name : items[selectedIndex]}</span>
                </div>
                <div className="icon-button display-flex flex-shrink">
                    <Arrow />
                </div>
            </button>
            <div className={`display-flex position-abs ${menuOpen ? 'open' : 'close'}`}>
                <div 
                className="navbar-nav scrollhost-container z-index-99 font-inherit min-height-0 pespective-origin-rt pespective-1 will-change m-l-8"
                onMouseOver={handlerMouseOver}
                onMouseOut={handlerMouseOut}
                onTouchMove={handlerMouseOver}
                onTouchEnd={handlerMouseOut}
                >
                    <div className="display-block height-100 position-rel">
                        <div className="width-100 max-width-100 display-block box-sizing">
                            <div className="font-inherit display-flex flex-algn-stretch flex-justify-center">
                                <div className="width-100 max-width-100 display-block flex-basis-0 flex-shrink flex-grow z-index-0 font-inherit">
                                    <div className="display-flex width-100">
                                        <div className="box-sizing width-100 z-index-0 display-block">
                                            <div className="navbar-nav-background select-conteiner p-l-8 p-r-8 p-t-8 p-b-8 border-r-5">
                                                <div
                                                id="lock-menu"
                                                className='scrollhost select-content pespective-origin-rt transf-style overscroll-bihavior-y z-index-0 display-flex flex-col overflow-h-x overflow-auto-y'
                                                onClick={toggleMenuOpen}
                                                ref={scrollHostRef}
                                                >
                                                    <ul className="display-flex flex-col flex-grow box-sizing p-r-8">
                                                        {items.map((item, index) => {

                                                            return(
                                                                <li
                                                                    key={index}
                                                                    className="option--item"
                                                                    onClick={event => {setActiveIndex(event, index); setIcon(event, item)}}
                                                                >
                                                                    <div className="display-flex flex-algn-center drop-item "> 
                                                                    {item.font && <FontAwesomeIcon className="m-r-8" size="lg" icon={[item.prefix, item.font]} style={{color: item.color}} />}
                                                                        <span className="label-title-menu-item">{item.name ? item.name : item}</span>
                                                                    </div>
                                                                </li>
                                                            )
                                                        })}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={`scroll-bar${hovering ? " active" : ""}`} style={{opacity: hovering ? 1 : 0}}>
                        <div 
                        className="scroll-thumb" 
                        style={{height: scrollBoxHeight, top: scrollBoxTop}}
                        onMouseDown={handlerDocumentMouseDown}
                        ></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SelectWithIcon;
