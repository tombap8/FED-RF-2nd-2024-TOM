const getUserList = async () => {
        // async/await를 사용하여 비동기적으로 데이터를 가져옵니다.
        // 비동기 함수는 async 키워드로 정의합니다.

        // 파이어베이스의 'users' 컬렉션의 모든 문서 가져오기
        // const allCollection = await getDocs(collection(db, "users"));
        // await는 비동기 함수에서 사용하여
        // Promise가 해결될 때까지 기다립니다.
        // getDocs는 Firestore에서 문서를 가져오는 함수입니다.
        // collection은 Firestore에서 컬렉션을 참조하는 함수입니다.
        // 'users' 컬렉션의 모든 문서를 가져오기 위해
        // collection(db, 'users')를 사용합니다.

        const usersRef = collection(db, "users");
        // -> db는 Firestore 데이터베이스 객체입니다.
        // -> 'users'는 Firestore에서 사용할 컬렉션 이름입니다.

        const q = query(usersRef, orderBy(sortField, sortOrder));
        // orderBy는 Firestore에서 문서를 정렬하는 함수입니다.
        // sortField는 정렬할 필드입니다.
        // sortOrder는 정렬 순서 (asc, desc)입니다.
        // -> asc는 오름차순, desc는 내림차순입니다.

        const snapshot = await getDocs(q);
        // snapshot은 쿼리 결과를 가져오는 객체입니다.
        // snapshot.docs는 쿼리 결과에서 문서 목록을 가져옵니다.

        // 가져온 문서들을 배열로 변환하기
        // 비동기코드로 가져온 후 데이터를 할당하는 아래 코드가
        // 실행된다!
        const userListArray = snapshot.docs.map((doc) => {
            console.log(doc.id, " => ", doc.data());
            return { id: doc.id, ...doc.data() };
        });

        // 사용자 리스트 상태 변수를 업데이트함!
        setUserList(userListArray);
        // setUserList는 상태변수를 업데이트하는 함수입니다.
    };