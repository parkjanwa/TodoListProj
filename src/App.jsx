import "./App.css";
import "./index.css";
import { useState, useRef, useEffect } from "react";
import { supabase } from "./supabaseClient.js";
import Header from "./Components/Header";
import Editor from "./Components/Editor";
import List from "./Components/List";

function App() {
  const [todos, setTodos] = useState([]);
  const idRef = useRef(0); // 초기값 0으로 시작

  // ✅ Supabase에서 데이터 불러오기
  useEffect(() => {
    const fetchTodos = async () => {
      const { data, error } = await supabase
        .from("TB_TODOLIST")
        .select("id, content, is_done, created_at")
        .order("id", { ascending: false });

      if (error) {
        console.error(
          "📛 Supabase에서 데이터를 불러오지 못했습니다:",
          error.message
        );
      } else {
        console.log("✅ 불러온 Todo 데이터:", data);
        setTodos(data);
        const maxId = data.reduce((max, todo) => Math.max(max, todo.id), 0);
        idRef.current = maxId + 1;
      }
    };

    fetchTodos();
  }, []);

  // supabase INSERT
  const onCreate = async (content) => {
    const newTodo = {
      content: content,
      is_done: false,
    };

    const { data, error } = await supabase
      .from("TB_TODOLIST") // ← 실제 테이블 이름
      .insert([newTodo]) // 배열 형태로 전달해야 함!
      .select(); // 추가된 결과를 다시 불러옴

    if (error) {
      console.error("❌ Insert 에러:", error.message);
      return;
    }

    console.log("✅ Insert 성공:", data);

    // 화면에 바로 반영하고 싶다면 state에 추가
    setTodos((prev) => [data[0], ...prev]);
  };

  const onUpdate = async (targetId, currentStatus) => {
    const { error } = await supabase
      .from("TB_TODOLIST") // ← 실제 테이블 이름
      .update({ is_done: !currentStatus }) // ← 현재 값 반대로 바꿔서 업데이트
      .eq("id", targetId); // ← 해당 항목만 변경

    if (error) {
      console.error("✅ 업데이트 실패:", error.message);
      return;
    }

    // 클라이언트 상태에서도 업데이트
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === targetId ? { ...todo, is_done: !currentStatus } : todo
      )
    );
  };

  // supabase DELETE
  const onDelete = async (targetId) => {
    const { error } = await supabase
      .from("TB_TODOLIST") // ← 실제 테이블 이름
      .delete()
      .eq("id", targetId); // ← 어떤 항목을 삭제할지 조건 지정

    if (error) {
      console.error("❌ 삭제 실패:", error.message);
      return;
    }

    // 화면에서도 삭제
    setTodos((prev) => prev.filter((todo) => todo.id !== targetId));
  };

  return (
    <div className="App">
      <Header />
      <Editor onCreate={onCreate} />
      <List todos={todos} onUpdate={onUpdate} onDelete={onDelete} />
    </div>
  );
}

export default App;
