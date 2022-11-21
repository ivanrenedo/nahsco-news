import React from 'react';
import { useRouter } from 'next/router';
import classnames from 'classnames';
import { DOTS, usePagination } from './hook/usePagination';

const Pagination = props => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
    className,
    disableArrow
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize
  });
 
  const router = useRouter();

  if (currentPage === 0 || paginationRange && paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  const onSelectPagination = 
    (pageNumber) => {
      onPageChange(pageNumber)
      router.push({query: {...router.query, offset: pageNumber, limit: pageSize }})
     
    }

  let lastPage = paginationRange && paginationRange[paginationRange.length - 1];

  


  return (
    <ul className={classnames('pagination-container m-t-16 m-b-16', { [className]: className })} >
      {!disableArrow && (
        <li className={classnames('pagination-item', { disabled: currentPage === 1 })} onClick={onPrevious} >
          <div className="arrow left" />
        </li>
      )}
      {paginationRange && paginationRange.map((pageNumber, index) => {
        if (pageNumber === DOTS) {
          return <li key={index} className="pagination-item dots">&#8230;</li>;
        }
        
        return (
          <li
            key={index}
            className={classnames('pagination-item', {
              selected: pageNumber === currentPage
            })}
            onClick={() => onSelectPagination(pageNumber)}
          >
            {pageNumber}
          </li>
        );
      })}
      {!disableArrow && (
        <li
          className={classnames('pagination-item', {
            disabled: currentPage === lastPage
          })}
          onClick={onNext}
        >
          <div className="arrow right" />
        </li>
      )}
    </ul>
  );
};

export default Pagination;
