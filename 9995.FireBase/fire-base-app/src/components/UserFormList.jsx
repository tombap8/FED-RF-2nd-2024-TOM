// 사용자 정보 입력 및 리스트 출력 컴포넌트
// Firebase와 연결된 사용자 정보 입력 및 리스트 출력 컴포넌트
/*********************************************************** 
  [ 파이어베이스를 이용한 DB연동 구현]
   - 핵심기능 : CRUD (Create, Read, Update, Delete)
    1. 사용자 정보 입력 (이름, 나이, 주소) : addUser()
    2. 사용자 정보 리스트 출력 (이름, 나이, 주소) : getUserList()
    3. 사용자 정보 수정 (이름, 나이, 주소) : addUser()
    4. 사용자 정보 삭제 (이름, 나이, 주소) : deleteUser()
    ________________________________________________________

    - 파이어베이스 핵심 메서드
    1. addDoc() : Firestore에 문서를 추가하는 메서드
    -> addDoc(데이터베이스, 컬렉션, 데이터)
    예시) addDoc(db, collection(db, "users"), { name: userName })

    2. getDocs() : Firestore에서 문서를 가져오는 메서드
    -> getDocs(컬렉션(데이터베이스, 컬렉션명))
    예시) getDocs(collection(db, "users"))

    3. doc() : Firestore에서 문서를 참조하는 메서드
    -> doc(데이터베이스, 컬렉션명, 문서ID)
    예시) doc(db, "users", "문서ID")
    -> 문서ID는 Firestore에서 자동으로 생성됨!
    -> doc() 메서드는 컬렉션에서 특정 문서를 참조하는 메서드입니다.
    -> 하나의 레코드와 동일한 개념으로 이해하면 됩니다.

    4. deleteDoc() : Firestore에서 문서를 삭제하는 메서드
    -> deleteDoc(문서 참조)
    예시) deleteDoc(doc(db, "users", "문서ID"))

    5. updateDoc() : Firestore에서 문서를 수정하는 메서드
    -> updateDoc(문서 참조, 수정할 데이터)
    예시) updateDoc(doc(db, "users", "문서ID"), { name: userName })

    6. collection() : Firestore에서 컬렉션을 참조하는 메서드
    -> collection(데이터베이스, 컬렉션명)
    예시) collection(db, "users")

    7. setDoc() : Firestore에서 문서를 설정하는 메서드
    -> setDoc(문서 참조, 데이터)
    예시) setDoc(doc(db, "users", "문서ID"), { name: userName })
    -> setDoc() 메서드는 updateDoc()와 비슷하지만,
    -> 문서가 없으면 새로 생성하고, 있으면 덮어씌우는 메서드입니다.
    -> updateDoc() 메서드는 문서가 없으면 에러가 발생합니다.
    -> setDoc() 메서드는 문서를 생성하거나 수정하는 메서드입니다.

***********************************************************/

import { useEffect, useState } from "react";
import { addDoc, collection, deleteDoc, doc, getDocs, limit, orderBy, query, startAfter, updateDoc } from "firebase/firestore";
import { db } from "../js/firebaseConfig";

// 디자인 적용을 위한 CSS 파일 import
import "../css/user_form.scss"; // CSS 파일 import

const UserFormList = () => {
    // [1] 상태변수 정의 //////////////
    // (1) 사용자 이름
    const [userName, setUserName] = useState("");
    // (2) 사용자 나이 (숫자형)
    const [userAge, setUserAge] = useState(0);
    // (3) 사용자 주소
    const [userAddr, setUserAddr] = useState("");
    // (4) 파이어베이스에서 가져온 사용자 목록
    const [userList, setUserList] = useState([]);
    // (5) 수정모드여부 (true/false)
    const [isEditMode, setIsEditMode] = useState(false);
    // (6) 수정할 사용자 ID
    const [editUserId, setEditUserId] = useState(null);
    // (7) 정렬 필드 및 순서 상태 추가
    const [sortField, setSortField] = useState("name");
    const [sortOrder, setSortOrder] = useState("asc");
    // (8) 페이지네이션을 위한 상태변수 추가
    const PAGE_SIZE = 3; // 페이지당 문서 수
    const [totalDocs, setTotalDocs] = useState(0); // 전체 문서 수
    const [pageCount, setPageCount] = useState(0); // 전체 페이지 수
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
    const [pageStarts, setPageStarts] = useState([]); // 각 페이지 시작점 저장

    // [2] 사용자 데이터 가져오기 함수 //////
    // 파이어베이스에서 사용자 목록을 가져오는 함수
    /**
     * 사용자 목록을 가져오는 함수
     * @param {string} direction - 페이지네이션 방향 (init, next, prev)
     */
    const getUserList = async (page, starts) => {
        // Firestore 'users' 컬렉션 참조
        const usersRef = collection(db, "users");
        let q; // 쿼리 변수 선언

        // 페이지가 1이거나 시작점이 없을 경우, 기본 쿼리를 설정
        if (page === 1 || !starts || !starts[page - 2]) {
            q = query(
                usersRef, 
                orderBy(sortField, sortOrder), // 정렬 필드와 순서에 따라 정렬
                limit(PAGE_SIZE) // 페이지당 문서 개수 제한
            );
        } else {
            // 이전 페이지의 마지막 문서를 기준으로 페이지네이션 쿼리 설정
            q = query(
                usersRef,
                orderBy(sortField, sortOrder), // 정렬 필드와 순서에 따라 정렬
                startAfter(starts[page - 2]), // 이전 페이지의 마지막 문서 이후부터 시작
                limit(PAGE_SIZE) // 페이지당 문서 개수 제한
            );
        }

        // 쿼리 실행 및 결과 수집
        const snapshot = await getDocs(q);
        const userListArray = snapshot.docs.map((doc) => ({
            id: doc.id, // 문서 ID
            ...doc.data(), // 문서 데이터
        }));

        // 사용자 리스트 상태 업데이트
        setUserList(userListArray);
        // 현재 페이지 상태 업데이트
        setCurrentPage(page);
    };
  
  
  

    // 사용자 목록을 가져오는 함수 //////////////

    // [3] 사용자 추가 함수 //////////////
    const addUser = async () => {
        // async/await를 사용하여 비동기적으로 데이터를 추가합니다.
        // 비동기 함수는 async 키워드로 정의합니다.

        // 사용자 정보를 파이어베이스에 추가하는 함수
        // 이름과 나이가 입력되었는지 확인하기
        if (userName && userAge && userAddr) {
            // 이름, 나이, 주소가 모두 입력되었는지 확인합니다.

            // 수정모드 분기하기 ///
            if (isEditMode && editUserId) {
                // editMode가 true이고 editUserId가 존재할 때
                // 수정모드일 때는 updateDoc()을 사용하여 문서를 수정합니다.
                await updateDoc(doc(db, "users", editUserId), {
                    name: userName,
                    age: Number(userAge),
                    addr: userAddr,
                });
            } /// if ///

            // 사용자 추가하기 //////////////////////
            else {
                // 사용할 컬렉션 가져오기 //
                const usersRef = collection(db, "users");

                // [최대값 idx 값을 찾기위한 쿼리]
                const maxIdxQuery = await getDocs(query(usersRef, orderBy("idx", "desc"), limit(1)));
                // -> idx는 사용자 목록에서 가장 큰 값을 찾기 위한 쿼리입니다.
                // -> orderBy("idx", "desc")는 idx를 기준으로 내림차순정렬
                // -> limit(1)은 정렬된 결과에서 첫 번째 문서만 가져옴
                // -> getDocs()는 쿼리 결과를 가져오는 함수

                // 최대값 변수에 숫자를 할당함
                let maxIdx = 0;
                // 쿼리 결과가 비어있지 않으면 최대값을 찾음
                if (!maxIdxQuery.empty) {
                    const lastDoc = maxIdxQuery.docs[0].data();
                    maxIdx = lastDoc.idx || 0;
                }
                // idx는 숫자형으로 변환하여 저장합니다.
                // lastDoc은 쿼리 결과에서 첫 번째 문서를 가져옵니다.
                // lastDoc.data()는 문서의 데이터를 가져옵니다.
                // lastDoc.idx는 문서의 idx 값을 가져옵니다.
                // 만약 idx 값이 없으면 0을 저장합니다.

                const newIdx = maxIdx + 1;

                // lastDoc.idx + 1은 다음 idx 값을 계산합니다.
                // -> 결과적으로 최대값+1을 계산하여 maxIdx에 저장합니다.

                // 파이어베이스의 'users' 컬렉션에 새로운 문서 추가하기
                await addDoc(usersRef, {
                    idx: newIdx,
                    name: userName,
                    age: Number(userAge),
                    // 나이는 숫자형으로 변환하여 저장합니다.
                    addr: userAddr,
                    // 날짜넣기 : 날짜객체를 넣으면 날짜형식으로 저장됨
                    date: new Date(),
                });
                // addDoc은 Firestore에 문서를 추가하는 함수입니다.
                // collection은 Firestore에서 컬렉션을 참조하는 함수입니다.
                // 'users' 컬렉션의 모든 문서를 가져오기 위해
                // collection(db, 'users')를 사용합니다.
            } /// else ///

            // 입력된 기존 값 초기화하기 ///
            setUserName("");
            setUserAge(0);
            setUserAddr("");
            // 수정모드도 모두 초기화하기 ///
            setIsEditMode(false);
            setEditUserId(null);

            // 사용자 목록 업데이트 함수 호출 ///
            // getUserList();
            initPagination(); // 기존 getUserList() → 이걸로 바꾸기
            // 이것을 호출해야 갱신된 사용자 목록이 화면에 나옴!
        } /// if ////
        else {
            // 이름, 나이, 주소가 모두 입력되지 않았을 때
            alert("이름, 나이, 주소를 모두 입력하세요!");
        } /// else ///
    }; // 사용자 추가 함수 //////////////

    // [4] 사용자 삭제 함수 //////////////
    const deleteUser = async (id) => {
        // 사용자를 삭제하는 함수
        // 파이어베이스의 'users' 컬렉션에서 사용자를 삭제하는 함수
        await deleteDoc(doc(db, "users", id));
        // deleteDoc은 Firestore에서 문서를 삭제하는 함수입니다.
        // doc은 Firestore에서 문서를 참조하는 함수입니다.
        // 'users' 컬렉션의 모든 문서를 가져오기 위해
        // doc(db, 'users', id)를 사용합니다.

        // 사용자 목록 업데이트 함수 호출 ///
        // getUserList();
        initPagination(); // 기존 getUserList() → 이걸로 바꾸기
        // 이것을 호출해야 갱신된 사용자 목록이 화면에 나옴!
    }; // 사용자 삭제 함수 //////////////

    // [5] 사용자 수정 함수 //////////////
    const editUser = async (user) => {
        // 수정할 사용자정보를 user변수로 받아옴!

        // 수정모드업데이트
        setIsEditMode(true);

        // 수정할 사용자 id 업데이트
        setEditUserId(user.id);

        // 기존값을 입력필드에 넣어줌
        setUserName(user.name);
        setUserAge(user.age);
        setUserAddr(user.addr);
    }; // 사용자 수정하는 함수 //////////////

    // 랜더링 후 실행 구역 /////////////
    // useEffect(() => {
    //     // 사용자 정보를 DB에서 가져오는 함수 호출
    //     getUserList(page, pageStarts);
    // }, [sortField, sortOrder]); // 처음 한번만 실행되도록 빈 배열을 넣어줍니다.
    //   }, [userList]); -> 이렇게하면 성능상 문제 발생함!

    /**
     * 페이지네이션 초기화 함수
     * @description
     *  - 총 문서 수를 구하고, 총 페이지 수를 구합니다.
     *  - 각 페이지의 '이전 페이지 마지막 문서'를 저장합니다.
     *  - getUserList() 함수를 호출하여 1페이지부터 리스트를 가져옵니다.
     */
    const initPagination = async () => {
        // 1. 총 문서 수를 구합니다.
        const allDocsSnap = await getDocs(
            // query() 함수를 사용하여 'users' 컬렉션의 모든 문서를 가져옵니다.
            // orderBy() 함수를 사용하여 정렬 필드와 순서를 정합니다.
            query(collection(db, "users"), orderBy(sortField, sortOrder))
        );
        const allDocs = allDocsSnap.docs;
        const total = allDocs.length;
        setTotalDocs(total);

        // 2. 총 페이지 수를 구합니다.
        const totalPages = Math.ceil(total / PAGE_SIZE);
        setPageCount(totalPages);

        // 3. 각 페이지의 '이전 페이지 마지막 문서'를 저장합니다.
        const starts = [];
        for (let i = PAGE_SIZE - 1; i < total; i += PAGE_SIZE) {
            starts.push(allDocs[i]); // 각 페이지의 '이전 페이지 마지막 문서'
        }
        setPageStarts(starts);

        // 4. getUserList() 함수를 호출하여 1페이지부터 리스트를 가져옵니다.
        getUserList(1, starts);
    };
  



    // 페이지네이션 초기화 함수 호출
    useEffect(() => {
  
      initPagination();
  }, [sortField, sortOrder]);
  

    // 리턴 코드구역 //////////////
    return (
        <div className="user-form">
            <h2>Firebase Users</h2>
            {/* 이름 입력 필드 */}
            <label htmlFor="unm">이름:</label>
            <input
                id="unm"
                type="text"
                placeholder="이름을 입력하세요"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                // onChange 이벤트를 사용하여 입력값을 상태변수에 저장합니다.
            />
            {/* 나이 입력 필드 */}
            <label htmlFor="age">나이:</label>
            <input
                id="age"
                type="number"
                placeholder="나이을 입력해주세요"
                value={userAge}
                onChange={(e) => setUserAge(e.target.value)}
                // onChange 이벤트를 사용하여 입력값을 상태변수에 저장합니다.
            />

            {/* 주소 입력 필드 */}
            <label htmlFor="addr">주소:</label>
            <input
                id="addr"
                type="text"
                placeholder="주소을 입력해주세요"
                value={userAddr}
                onChange={(e) => setUserAddr(e.target.value)}
                // onChange 이벤트를 사용하여 입력값을 상태변수에 저장합니다.
            />

            {/* 사용자 추가 버튼 */}
            <button onClick={addUser}>{isEditMode ? "사용자 수정" : "사용자 추가"}</button>

            <br />
            <br />
            <hr />

            {/* 사용자 리스트 출력 */}
            <div className="user-list">
                <h2>사용자 리스트</h2>
                {/* 정렬옵션박스 */}
                {/* 정렬 옵션 선택 */}
                <div
                    style={{
                        backgroundColor: "#ccc",
                        marginBottom: "1rem",
                        padding: "0.5rem",
                        borderRadius: "5px",
                        textAlign: "center",
                    }}
                >
                    <label>정렬 기준:</label>
                    <select value={sortField} onChange={(e) => setSortField(e.target.value)}>
                        <option value="name">이름</option>
                        <option value="age">나이</option>
                        <option value="date">등록일</option>
                    </select>
                    &nbsp;&nbsp;
                    <label>정렬 순서:</label>
                    <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
                        <option value="asc">오름차순</option>
                        <option value="desc">내림차순</option>
                    </select>
                </div>

                {/* 사용자 목록 */}
                <ul>
                    {
                        // 리스트 데이터가 0개 이상일 때만 출력함
                        userList.length > 0 ? (
                            userList.map((user) => (
                                <li key={user.id}>
                                    {/* 사용자이름 (나이) - 주소 */}
                                    {user.name} ({user.age}세) {"🚩주소:" + user.addr ?? "주소없음"}
                                    <small style={{ display: "block" }}>
                                        [
                                        {user.date
                                            .toDate()
                                            .toJSON()
                                            .slice(2, 2 + 8)}
                                        &nbsp; (
                                        {user.date.toDate().toLocaleTimeString("ko-KR", {
                                            hour: "2-digit",
                                            minute: "2-digit",
                                            second: "2-digit",
                                            hour12: true,
                                        })}
                                        )] &nbsp;
                                        <button
                                            onClick={() => {
                                                // 수정모드 실행 함수 호출!
                                                editUser(user);
                                                // 수정할 사용자 정보를 editUser() 함수에 전달함
                                            }}
                                        >
                                            수정
                                        </button>
                                        &nbsp;
                                        <button onClick={() => window.confirm("삭제하시겠습니까?") && deleteUser(user.id)}>삭제</button>
                                    </small>{" "}
                                </li>
                            ))
                        ) : (
                            <li>사용자 정보가 없습니다.</li>
                        )
                    }
                </ul>
                {/* 페이징 박스 */}
                <div style={{ textAlign: "center", marginTop: "1rem" }}>
                    {Array.from({ length: pageCount }, (_, i) => i + 1).map((page) => (
                        // Array.from() 메서드를 사용하여 페이지 번호 배열을 생성합니다.
                        // Array.from({ length: 페이지수 }, (_, 인덱스) => { 리턴할 요소 } )
                        // _ : 이터레이터의 첫 번째 인자, i : 이터레이터의 두 번째 인자
                        // length: 페이지 수, i: 인덱스 번호

                        <button
                            key={page}
                            onClick={() => getUserList(page, pageStarts)}
                            style={{
                                margin: "0 5px",
                                fontWeight: currentPage === page ? "bold" : "normal",
                                backgroundColor: currentPage === page ? "#444" : "#ddd",
                                color: currentPage === page ? "#fff" : "#000",
                                border: "none",
                                padding: "5px 10px",
                                borderRadius: "5px",
                            }}
                        >
                            {page}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default UserFormList;
