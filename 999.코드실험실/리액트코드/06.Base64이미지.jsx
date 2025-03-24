import React, { useState } from 'react';

function App() {
  const [base64, setBase64] = useState('');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBase64(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="App">
      <h1>이미지 파일을 Base64로 변환</h1>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {base64 && (
        <div>
          <h2>Base64 인코딩 결과:</h2>
          <textarea rows="10" cols="50" value={base64} readOnly />
          <h2>이미지 미리보기:</h2>
          <img src={base64} alt="Selected" style={{ maxWidth: '100%' }} />
        </div>
      )}
    </div>
  );
}

export default App;