import React  from 'react';
import _ from 'lodash';
import { t } from '@lingui/macro';


import Results from './results';
import SearchInput from './searchInput';
import useSearchForm from './useSearchForm';



interface Props {
    searchArr: Array<any>;
}


const SearchComponent: React.FC<Props> = ({searchArr}) => {


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
      className={`font-inherit width-0 box-sizing display-flex flex-algn-center position-abs top-0 height-100 search-bar-position ${hasFocus ? " search-bar-wrapper-focus" : " search-bar-wrapper"}`}
      onFocus={handleFocus}
      onBlur={handleBlur}
      
      >
        <div className={`search-container display-flex flex-col position-rel box-sizing width-100 min-width-0${hasFocus ? " show border-0 border-radius-b-5" : ""}`}> 
            <SearchInput
            inputContainerRef={inputContainerRef}
            inputRef={inputEl}
            searchString={searchString}
            setSearchString={handleSetSearchString}
            autoFocus={autoFocus}
            onFocus={handleFocus}
            onClear={OnClear}
            placeholder={t`Search on nahsco news`}
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