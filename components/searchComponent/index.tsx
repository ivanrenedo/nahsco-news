import React, { useEffect, useState }   from 'react';
import _ from 'lodash';
import Results from './results';
import SearchInput from './searchInput';
import useSearchForm from './useSearchForm';



interface Props {
    searchArr: Array<any>;
    placeholder?: string;
}


const SearchComponent: React.FC<Props> = ({searchArr, placeholder = 'Buscar en nahsco news'}) => {


  const {
    formatResult,
    inputContainerRef,
    inputEl,
    searchString,
    handleSetSearchString,
    autoFocus,
    OnClear,
    showIcon,
    showClear,
    handleSetHighlightedItem,
    hasFocus,
    setHasFocus,
    results,
    handleBlur,
    handleFocus,
    handleOnClick,
    setSearchString,
    MAX_RESULTS,
    resultStringKeyName,
    highlightedItem,
    showNoResultsFlag,
    showNoResultsText,

} = useSearchForm(searchArr);



  
    return(
      <div 
      className={`font-inherit width-0 box-sizing logo-size display-flex flex-algn-center m-t-4 position-fix top-0 search-bar-position ${hasFocus ? " search-bar-wrapper-focus background-v1" : " search-bar-wrapper"}`}
      onFocus={handleFocus}
      onBlur={handleBlur}
      
      >
        <div className={`search-container background-var1 display-flex flex-col  position-rel box-sizing width-100 min-width-0${hasFocus ? " show border-0 border-radius-b-5" : ""}`}> 
            <SearchInput
            inputContainerRef={inputContainerRef}
            inputRef={inputEl}
            searchString={searchString}
            setSearchString={handleSetSearchString}
            autoFocus={autoFocus}
            onFocus={handleFocus}
            onClear={OnClear}
            placeholder={placeholder}
            showIcon={showIcon}
            showClear={showClear}
            setHighlightedItem={handleSetHighlightedItem}
            hasFocus={hasFocus}
            />
            {hasFocus && <Results
            results={results || []}
            onClick={handleOnClick}
            setSearchString={setSearchString}
            showIcon={showIcon}
            maxResults={MAX_RESULTS}
            resultStringKeyName={resultStringKeyName}
            formatResult={formatResult}
            highlightedItem={highlightedItem}
            setHighlightedItem={handleSetHighlightedItem}
            showNoResultsFlag={showNoResultsFlag}
            showNoResultsText={showNoResultsText}
            />}
        </div>               
      </div>
    )
}

export default SearchComponent;