// DC.com 캐릭터 리스트 컴포넌트 - CatList.jsx

import React from 'react';

// 모듈 CSS 불러오기
import '../../css/modules/cat_list.scss';
import { SwiperCat } from '../plugin/SwiperCat';

function CatList(props) {
    return (
        <section className='cat-swbox'>
            {/* 1. 모듈 타이틀 */}
            <h2 className="tit">
                WHO'S WHO: THE JUSTICE LEAGUE
            </h2>
            {/* 2. 스와이퍼 컴포넌트 */}
            <SwiperCat />
        </section>
    );
}

export default CatList;