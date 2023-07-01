import React from 'react';

const Filter = ({filter_todo}) => {
  return (
    <div>
      <label htmlFor="filter">Filter: </label>
      <select name="filter" id="filter" onChange={((e) => filter_todo(e.target.value))}>
        <option value="All">All</option>
        <option value="Active">Active</option>
        <option value="Completed">Completed</option>
      </select>
    </div>
  )
}

export default Filter;
