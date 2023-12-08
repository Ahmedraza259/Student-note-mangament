import React from 'react';

const Filter = ({ selectedFilter, onFilterChange }) => {
  return (
    <div className="mb-3">
      <label>Filter:</label>
      <select
        className="form-control"
        value={selectedFilter}
        onChange={(e) => onFilterChange(Number(e.target.value))}
      >
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={15}>15</option>
        <option value={20}>20</option>
      </select>
    </div>
  );
};

export default Filter;
