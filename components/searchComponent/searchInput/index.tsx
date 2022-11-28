import LeftIcon from '@components/icons/leftArrow';
import React, { FocusEventHandler, FocusEvent, useRef } from 'react';

import ClearIcon from './clearIcon';
import SearchIcon from './seachIcon';


interface ISearchInputProps {
    inputContainerRef: React.RefObject<HTMLLabelElement>;
    inputRef: React.RefObject<HTMLInputElement>;
    searchString: string;
    setSearchString: Function;
    setHighlightedItem: Function;
    autoFocus: boolean;
    onFocus: FocusEventHandler<HTMLInputElement>;
    onClear: Function;
    placeholder: string;
    showIcon: boolean;
    showClear: boolean;
    hasFocus: boolean
}


const SearchInput: React.FC<ISearchInputProps> = ({
    inputContainerRef,
    inputRef,
    searchString,
    setSearchString,
    setHighlightedItem,
    autoFocus,
    onClear,
    onFocus,
    placeholder,
    showClear = true,
    showIcon = true,
    hasFocus
}) => {

    let manualFocus = true;

    const setFocus = () => {
        manualFocus = false;
        inputRef.current && inputRef.current.focus();
        manualFocus = true;
    }

    const handlerOnFocus = (e: FocusEvent<HTMLInputElement, Element>) => {
        manualFocus && onFocus(e)
    }

    const getSearchTerm = () => {
        setSearchString(inputRef.current?.value!)
    }
    
    return (    
        <>
            <div className="font-inherit display-flex flex-algn-center search-container-padd">
                <div className="font-inherit width-100">
                    <div className="font-inherit display-flex flex-algn-center width-100">
                        {/* <div className="font-inherit box-sizing display-flex flex-shrink flex-algn-center backward-container-width">
                            <div className=" font-inherit backward-container-width" data-visualcompletion="ignore">
                                <div className="backward-contain-width">
                                    <div role="button" onClick={() => {}} tabIndex={-1} className="font-inherit box-sizing position-rel webkit-apparience default-style cursor-point touch-act-man p-t-0 p-b-0 p-r-0 p-l-0 m-t-0 m-b-0 m-r-0 m-l-0 display-inline-flex flex-basis-a flex-algn-stretch z-index-0 min-height-0 min-width-0 border-0">
                                        <span className="icon-button icon-button-hover display-flex flex-algn-center"><LeftIcon /></span>
                                    </div>
                                </div>
                            </div>
                        </div> */}
                        <div className={`font-inherit display-flex flex-shrink will-change--width ${hasFocus ? "width-0 will-change--width input-search--transitionWidth" : "space-search will-change--width input-search--transitionWidth"}`}>
                            &nbsp;
                        </div>
                        <label ref={inputContainerRef} className="box-sizing font-inherit position- will-change display-flex flex-algn-stretch width-100 inputSearch-container">
                            <span className="font-inherit display-flex flex-algn-center flex-justify-center p-l-12 input-search--transition white-space-nowwrap pointer-e-none">
                                <SearchIcon showIcon={showIcon}/>
                            </span>
                            <input
                            aria-autocomplete='list'
                            aria-label="buscar en Networking"
                            role="combobox"
                            ref={inputRef}
                            spellCheck={false}
                            value={searchString}
                            onChange={getSearchTerm}
                            onFocus={handlerOnFocus}
                            placeholder={placeholder} 
                            autoFocus={autoFocus}
                            onKeyDown={event => setHighlightedItem({ event })}
                            className="input-search webkit-apparience input-search--transition touch-act-man box-sizing font-inherit min-width-0 flex-basis-a flex-grow flex-shrink-1 position-rel p-l-8 p-t-8 p-b-8"
                            autoComplete="off"
                            data-test = "search-input"
                            />
                            {!showClear && (
                                <ClearIcon
                                showClear={showClear}
                                setSearchString={setSearchString}
                                searchString={searchString}
                                onclear={onClear}
                                setFocus={setFocus}
                                />
                            )}
                        </label>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SearchInput;