import React from 'react';
import MyInfo from '../modules/MyInfo';

function MyPage() {
    return (
        <>
            <h2 className='tit'
                style={{textAlign:'center'}}
            >My Page</h2>
            {/* 1. 나의 정보 모듈 */}
            <MyInfo />

        </>
    );
}

export default MyPage;