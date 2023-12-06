import React from 'react';
import Pagination from 'react-bootstrap/Pagination';

const CustomPagination = ({ pageNumbers, currentPage, onPageChange }) => {
  return (
    <Pagination>
      {pageNumbers.map((i) => (
        <Pagination.Item key={i} active={i === currentPage} onClick={() => onPageChange(i)}>
          {i}
        </Pagination.Item>
      ))}
    </Pagination>
  );
};

export default CustomPagination;
