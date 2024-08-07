-- 오늘의 쿼리 : update
-- update 테이블명 set 컬럼명=값 where 특정항목

-- UPDATE `friends` SET `ftel`='888',`faddr`='제주도',`fmsg`='여름휴가만세!' WHERE `fnum` = 3

-- UPDATE `friends` SET `ftel`='024447777',`faddr`='포항시 구룡포',`fmsg`='포항이 좋아요!' WHERE `fnum` = 2

-- UPDATE `friends` SET `fmsg`='정조대왕이 짱이야~!' WHERE `fnum` = 1

-- 오늘의 쿼리 : delete
-- delete from 테이블명 where 조건항목
delete from `friends` where `fname` = 3