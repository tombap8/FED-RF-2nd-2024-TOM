import React, { useEffect, useState } from "react";
import DaumPostcode from "react-daum-postcode";

const AddressInput = ({changeAddr}) => {
    // 상태관리변수
    // [1] 우편번호
    const [zonecode, setZonecode] = useState("");
    // [2] 주소
    const [address, setAddress] = useState("");
    // [3] 주소찾기 창 보이기여부
    const [isOpen, setIsOpen] = useState(false);

    const themeObj = {
        bgColor: "#FFFFFF",
        pageBgColor: "#FFFFFF",
        postcodeTextColor: "#C05850",
        emphTextColor: "#222222",
    };

    const postCodeStyle = {
        width: "40vw",
        height: "60vh",
    };

    const wholeBoxStyle = {
        display: "inline-block",
        verticalAlign: "top",
    };

    const popupWindowStyle = {
        position: "fixed",
        top: "50%",
        left: "50%",
        translate: "-50% -50%",
        backgroundColor: "white",
        padding: "20px",
        border: "4px double #000",
        zIndex: "1",
    };

    const closeButtonStyle = {
        position: "absolute",
        top: "0",
        right: "0",
        fontSize: "40px",
        backgroundColor: "transparent",
        border: "none",
    };

    const completeHandler = (data) => {
        const { address, zonecode } = data;
        setZonecode(zonecode);
        setAddress(address);
    };

    const closeHandler = (state) => {
        if (state === "FORCE_CLOSE") {
            setIsOpen(false);
        } else if (state === "COMPLETE_CLOSE") {
            setIsOpen(false);
        }
    };

    const toggleHandler = () => {
        setIsOpen((prevOpenState) => !prevOpenState);
    };

    // 랜더링 구역 ////////////
    useEffect(()=>{
        changeAddr();
    }); ////// useEffect //////////


    // 코드리턴구역 //////////////////////
    return (
        <div style={wholeBoxStyle}>
            <div>
                <div style={{ paddingLeft: "20px", lineHeight: "2" }}>
                    <button type="button" onClick={toggleHandler}>
                        Search Address
                    </button>
                    <div>
                        ZipCode :
                        <input className="zipcode" value={zonecode} readOnly
                        onClick={toggleHandler}
                        placeholder="Click 'Search Address'" />
                    </div>
                </div>
                {isOpen && (
                    <div style={popupWindowStyle}>
                        <DaumPostcode theme={themeObj} style={postCodeStyle} onComplete={completeHandler} onClose={closeHandler} />
                        <button style={closeButtonStyle} onClick={toggleHandler}>
                            ×
                        </button>
                    </div>
                )}
                <input className="addr1" value={address} readOnly 
                onClick={toggleHandler}
                style={{ width: "100%" }} placeholder="Click 'Search Address'" />
                <input className="addr2" placeholder="input detail adress" style={{ width: "100%" }}
                onChange={changeAddr}
                onBlur={changeAddr}
                />
            </div>
        </div>
    );
};

export default AddressInput;
