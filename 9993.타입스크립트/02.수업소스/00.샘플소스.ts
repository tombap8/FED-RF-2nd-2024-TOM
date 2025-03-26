import React, { useState, useEffect, createContext, useContext, ReactNode } from 'react';

// 컨텍스트 상태에 대한 타입 정의
type AppState = {
  count: number;
  increment: () => void;
};

// 기본값으로 컨텍스트 생성
const AppContext = createContext<AppState | undefined>(undefined);

// 프로바이더 props에 대한 타입 정의
type AppProviderProps = {
  children: ReactNode;
};

// 프로바이더 컴포넌트 생성
const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [count, setCount] = useState<number>(0);

  // 카운트를 증가시키는 함수
  const increment = () => setCount(count + 1);

  return (
    <AppContext.Provider value={{ count, increment }}>
      {children}
    </AppContext.Provider>
  );
};

// AppContext를 사용하는 커스텀 훅
const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext는 AppProvider 내에서 사용해야 합니다');
  }
  return context;
};

// 카운트를 표시하는 컴포넌트
const DisplayCount: React.FC = () => {
  const { count } = useAppContext();
  return <div>Count: {count}</div>;
};

// 카운트를 증가시키는 컴포넌트
const IncrementButton: React.FC = () => {
  const { increment } = useAppContext();
  return <button onClick={increment}>Increment</button>;
};

// 메인 App 컴포넌트
const App: React.FC = () => {
  return (
    <AppProvider>
      <h1>Hello, React with TypeScript!</h1>
      <DisplayCount />
      <IncrementButton />
    </AppProvider>
  );
};

export default App;