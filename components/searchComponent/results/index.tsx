import { MouseEvent, ReactNode } from 'react';
import SearchIcon from '../searchInput/seachIcon';



export type Item<T> = T & { [key: string]: any }

export interface ResultsProps<T> {
  results: Item<T>[]
  onClick: Function
  highlightedItem: number
  setHighlightedItem: Function
  setSearchString: Function
  formatResult?: Function
  showIcon: boolean
  maxResults: number
  resultStringKeyName: string
  showNoResultsFlag?: boolean
  showNoResultsText?: string
}

export default function Results<T>({
  results = [] as any,
  onClick,
  setSearchString,
  showIcon,
  maxResults,
  resultStringKeyName,
  highlightedItem,
  setHighlightedItem,
  formatResult,
  showNoResultsFlag,
  showNoResultsText
}: ResultsProps<T>) {
  type WithStringKeyName = T & Record<string, unknown>

  const formatResultWithKey = formatResult
    ? formatResult
    : (item: WithStringKeyName) => item[resultStringKeyName]

  const handleClick = (result: WithStringKeyName) => {
    onClick(result)
    setSearchString(result[resultStringKeyName])
  }

  const handleMouseDown = ({
    event,
    result
  }: {
    event: MouseEvent<HTMLLIElement>
    result: WithStringKeyName
  }) => {
    if (event.button === 0) {
      event.preventDefault()
      handleClick(result)
    }
  }
  
  const ResultsWrapper = ({ children }: { children: ReactNode }) => {
    return (
      <div className='search-result position-rel display-block font-inherit position-abs background-var1 rad-shadow'>
        <ul className='card-item-component-bg border-r-5 p-t-12 p-r-16 p-l-16 p-b-16'>{children}</ul>
      </div>
    )
  }
  

  if (showNoResultsFlag) {
    return (
      <ResultsWrapper>
        <li className='display-flex' data-test="no-results-message">
          <div className="m-r-8">
            <SearchIcon showIcon={showIcon} />
          </div>
          <div className="ellipsis">{showNoResultsText}</div>
        </li>
      </ResultsWrapper>
    )
  }

  if (results?.length <= 0 && !showNoResultsFlag) {
    return null
  }

  return (
    <ResultsWrapper>
      {results.slice(0, maxResults).map((result, index) => (
        <li
          key={`rsa-result-${result.id}`}
          className={`display-flex flex-algn-center p-r-4 p-b-4 p-t-4${highlightedItem === index ? ' selected-ticket' : ''}`}
          onMouseEnter={() => setHighlightedItem({ index })}
          data-test="result"
          onMouseDown={(event) => handleMouseDown({ event, result })}
          onClick={() => handleClick(result)}
        >
          <div className="m-r-8">
            <SearchIcon showIcon={showIcon} />
          </div>
          {formatResultWithKey(result)}
        </li>
      ))}
    </ResultsWrapper>
      
  )
}