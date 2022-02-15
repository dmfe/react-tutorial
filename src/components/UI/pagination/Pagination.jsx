import React from 'react';
import {getPagesArray} from '../../../utils/pages';

const Pagination = ({totalPages, currentPage, changePage}) => {
  let pagesArray = getPagesArray(totalPages);
  return (
    <div className="page__wrapper">
      {pagesArray.map(p =>
        <span
          onClick={() => changePage(p)}
          key={p}
          className={currentPage === p ? 'page page__current' : 'page'}
        >
          {p}
        </span>
      )}
    </div>
  );
};

export default Pagination;

