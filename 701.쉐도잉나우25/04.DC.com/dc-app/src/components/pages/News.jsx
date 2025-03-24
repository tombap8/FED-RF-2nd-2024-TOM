import React from 'react';
import Banner from '../modules/Banner';

function News(props) {
    return (
        <>
          {/* 1. 배너 컴포넌트 */}
          <Banner catName="NEWS" />
        </>
    );
}

export default News;