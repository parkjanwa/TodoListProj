import "./App.css";
import "./index.css"; // 테일윈드 사용
import { useState, useRef } from "react";
import Header from "./Components/Header";
import Editor from "./Components/Editor";
import List from "./Components/List";

// 랜덤데이터
// 다시 생성되지 않도록 app component밖에다 정의한다.
const mockData = [
  // 데이터 모델링 : 데이터를 어떻게 나타내는지에 대한 모델을 세운다.
  {
    id: 0,
    isDone: false, // 투두 체크 상태
    content: "React 공부하기", // 투두 내용
    date: new Date().getTime(), // 현재시간
  },
  {
    id: 1,
    isDone: false, // 투두 체크 상태
    content: "빨래하기", // 투두 내용
    date: new Date().getTime(), // 현재시간
  },
  {
    id: 2,
    isDone: false, // 투두 체크 상태
    content: "노래 연습하기", // 투두 내용
    date: new Date().getTime(), // 현재시간
  },
];

function App() {
  const [todos, setTodos] = useState(mockData);
  const idRef = useRef(3); // Todo id의 값을 저장할 레퍼런스 정의, mock데이터와 겹치지 않는 3번부터 시작

  const onCreate = (content) => {
    const newTodo = {
      id: idRef.current++,
      isDone: false,
      content: content,
      date: new Date().getTime(),
    };

    // 스프레드 연산자로 기존 todo에 담긴 값 앞에 새로 생성한 todo list 객체를 넣어준다.
    setTodos([newTodo, ...todos]);
  };

  const onUpdate = (targetId) => {
    // todos state의 값들 중에
    // target id와 일치하는 id를 갖는 todo item의 isDone 변경

    // todo 배열에서 targetId와 일차하는 id를 갖는 요소의 데이터만 바꾼 새로운 배열
    setTodos(
      todos.map((todo) =>
        todo.id === targetId ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  };

  const onDelete = (targetId) => {
    // todos 배열에서 targetId와 일치하는 id를 갖는 요소만 삭제한 새로운 배열
    setTodos(todos.filter((todo) => todo.id !== targetId));
  };

  return (
    <div className="App">
      <Header />
      {/* Editor component에 onCreate props 전달 */}
      <Editor onCreate={onCreate} />
      <List todos={todos} onUpdate={onUpdate} onDelete={onDelete} />
    </div>
  );
}

export default App;
