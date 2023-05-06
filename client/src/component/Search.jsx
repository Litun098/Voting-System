import React from 'react'
import SearchIcon from '@mui/icons-material/Search';

const Search = () => {
  return (
    <div className='search-container'>
        <input type="text" name="search" id="search" />
        <SearchIcon/>
    </div>
  )
}

export default Search