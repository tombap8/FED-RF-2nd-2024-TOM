import React from 'react';
import Searching from '../modules/Searching';

function SearchPage(props) {
    return (
        <>
            <h1 className='tit'>
                Search Result
            </h1>
            <Searching />
        </>
    );
}

export default SearchPage;