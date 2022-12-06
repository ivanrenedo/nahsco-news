import React, {FocusEvent, KeyboardEvent, useEffect, useState, useRef} from 'react';
import _ from 'lodash';
import { default as Fuse } from 'fuse.js';
import { t } from '@lingui/macro';
import { useRouter } from 'next/router';


export const DEFAULT_INPUT_DEBOUNCE = 300;
export const MAX_RESULTS = 10;
export type Item<T> = T & { [key: string]: any }

const defaultFuseOptions: Fuse.IFuseOptions<any> = {
    shouldSort: true,
    threshold: 0.6,
    location: 0,
    distance: 100,
    minMatchCharLength: 1,
    keys: ["title", "photo"]
}

const useSearchForm = (searchArr) => {

    const options = { ...defaultFuseOptions, ...{keys: ["title", "content"]} }

    const inputSearchString = '',
        showIcon = true,
        showClear = false,
        autoFocus = false,
        showNoResults = true,
        showItemsOnFocus = false,
        resultStringKeyName = 'title',
        showNoResultsText = t`No results`

    const inputEl = useRef<HTMLInputElement>(null);
    const inputContainerRef = useRef<HTMLLabelElement>(null);

    const [searchString, setSearchString] = useState<string>(inputSearchString)
    const [results, setResults] = useState<any[]>([])
    const [highlightedItem, setHighlightedItem] = useState<number>(0)
    const [isSearchComplete, setIsSearchComplete] = useState<boolean>(false)
    const [isTyping, setIsTyping] = useState<boolean>(false)
    const [showNoResultsFlag, setShowNoResultsFlag] = useState<boolean>(false)
    const [hasFocus, setHasFocus] = useState(false);
  
    const fuse = new Fuse(searchArr, options)
    fuse.setCollection(searchArr)
    

    const { push, asPath, locale } = useRouter();


    useEffect(() => {
        setSearchString(inputSearchString)
    }, [inputSearchString])
    
    useEffect(() => {
        
      hasFocus && searchString?.length > 0 &&
          results &&
          results?.length > 0 &&
          setResults(fuseResults(searchString))
        
    }, [searchArr])

 
    useEffect(() => {
        
        if (
          showNoResults &&
          searchString.length > 0 &&
          !isTyping &&
          results.length === 0 &&
          !isSearchComplete
        ) {
          setShowNoResultsFlag(true);
            
        } else {
            setShowNoResultsFlag(false)
        }


        const onSearchResult = (e) => {
            
            if (e.key === "Enter") {
                if (showNoResults &&
                    searchString.length > 0 &&
                    !isTyping &&
                    results.length === 0 &&
                    !isSearchComplete
                ) {
                    onSelect(searchString)
                    setSearchString(results[highlightedItem][resultStringKeyName])
                    setHighlightedItem(0)
                }
            }
        }

        document.addEventListener("keypress", onSearchResult)
    
        return () => {
            document.removeEventListener("keypress", onSearchResult)
        }
        
    }, [isTyping, showNoResults, isSearchComplete, searchString, results]);

    const handleFocus = () => !hasFocus && setHasFocus(true);

    const handleBlur = (e) => {
      if (!e.currentTarget.contains(e.relatedTarget)) {
        setHasFocus(false);
      }
    };
    
    useEffect(() => {

        if (showItemsOnFocus && results.length === 0 && searchString.length === 0 && hasFocus) {
          setResults(searchArr.slice(0, MAX_RESULTS))
        }

    }, [showItemsOnFocus, results, searchString, hasFocus, inputContainerRef]);

    const callOnSearch = (keyword: string) => {
        let newResults: any[] = [];

        keyword?.length > 0 && (newResults = fuseResults(keyword))
        
        setResults(newResults)
        onSearch(keyword, newResults)
        setIsTyping(false) 
    }
   
    const handleOnSearch = React.useCallback(
        DEFAULT_INPUT_DEBOUNCE > 0
          ? _.debounce((keyword: string) => callOnSearch(keyword), DEFAULT_INPUT_DEBOUNCE)
          : (keyword) => callOnSearch(keyword),
        [searchArr]
    )

    const handleOnClick = (result: Item<any>) => {
        eraseResults()
        onSelect(result)
        setSearchString(result[resultStringKeyName])
        setHighlightedItem(0)
    }

    const fuseResults = (keyword: string) =>
    fuse
      .search(keyword, { limit: MAX_RESULTS })
      .map((result) => ({ ...result.item }))
      .slice(0, MAX_RESULTS)

    const handleSetSearchString = (keyword: string) => {
    
        setSearchString(keyword)
        handleOnSearch(keyword)
        setIsTyping(true)
        
        if (isSearchComplete) {
          setIsSearchComplete(false)
        }

    }

    const eraseResults = () => {
        setResults([])
        setIsSearchComplete(true)
    }

    const handleSetHighlightedItem = ({
        index,
        event
    }: {
        index?: number
        event?: KeyboardEvent<HTMLInputElement>
      }) => {
        let itemIndex = 0
    
        const setValues = (index: number) => {
          setHighlightedItem(index)
          onHover(results[index])
        }
    
        if (index !== undefined) {
          setHighlightedItem(index)
          onHover(results[index])
        } else if (event) {
          switch (event.key) {
            case 'Enter':
              if (results.length > 0) {
                onSelect(results[highlightedItem])
                setSearchString(results[highlightedItem][resultStringKeyName])
                console.log(results[highlightedItem][resultStringKeyName])
                setHighlightedItem(0)
              }
              eraseResults()
              break
            case 'ArrowUp':
              event.preventDefault()
              itemIndex = highlightedItem > 0 ? highlightedItem - 1 : results.length - 1
              setValues(itemIndex)
              break
            case 'ArrowDown':
              event.preventDefault()
              itemIndex = highlightedItem < results.length - 1 ? highlightedItem + 1 : 0
              setValues(itemIndex)
              break
            default:
              break
          }
        }
    }

    const onFocus = (event?: FocusEvent<HTMLInputElement, Element>) => {
        console.log("Focused");
        console.log(results[highlightedItem]?.title)
    };

    const onSearch = (string, results) => {};

    const onSelect = (item) => {
        const title = item?.title;
        console.log(title)
        /* setCheckNumber(ticketNumber) */
    };
    
    const onHover = (result) => {};

    const OnClear = () => {
        console.log("Cleared");
    };

    const formatResult = (item) => (
   
        <div className="display-flex flex-col box-sizing flex-algn-stretch position-rel post-item-image-container">
          <div className="display-flex flex-algn-center">
              <div className="overflow-h-x overflow-h-y position-rel m-r-8 flex-shrink" style={{width: 50, height: 40}}>
                <img src={item.photo} alt={item.title} srcSet={item.photo} className="image" />
              </div>
              <span className="font-weight-3 similar-titular flex-grow mask-text font-size-5 text-black-var-1 text-search">{item.title}</span>
          </div>  
        </div>
    )

    return {
        formatResult,
        handleFocus,
        handleBlur,
        setHasFocus,
        hasFocus,
        onFocus,
        inputContainerRef,
        inputEl,
        searchString,
        handleSetSearchString,
        autoFocus,
        OnClear,
        showIcon,
        showClear,
        handleSetHighlightedItem,
        results: results || [],
        handleOnClick,
        setSearchString,
        MAX_RESULTS,
        resultStringKeyName,
        highlightedItem,
        showNoResultsFlag,
        showNoResultsText

    }

}

export default useSearchForm;