import { useMemo } from "react";
import TodoItem from "./TodoItem";
import { useState } from "react";

const List = ({ todos, onUpdate, onDelete, isLoading }) => {
  const [search, setSearch] = useState("");

  const onChangeSearch = (e) => {
    setSearch(e.target.value);
  };

  /**
   * @todo
   *  prev. const getFilteredData = ()
   *  next. const filteredTodos = useMemo
   *
   *  일반 함수에서 useMemo로 교체
   *  왜? search와 todos 바뀔때 마다 상태 추적을 할 수 있고
   *  값은 값이면 메모제이션을 하여 성능 최적화 가능
   */
  const filteredTodos = useMemo(() => {
    if (search === "") {
      return todos;
    }
    return todos.filter((todo) =>
      todo.content.toLowerCase().includes(search.toLowerCase())
    );
  }, [todos, search]);

  //TODO. 로딩중 UI 만들어주세요
  if (isLoading) {
    return <div>로딩중...</div>;
  }

  return (
    <div className="flex flex-col gap-5">
      <h4>Todo List🌱</h4>
      <input
        value={search}
        onChange={onChangeSearch}
        disabled={isLoading}
        placeholder="검색어를 입력하세요"
        className="w-full border-b border-gray-300 py-4 focus:outline-none focus:border-blue-500"
      />
      <div className="flex flex-col gap-5">
        {filteredTodos.length === 0
          ? //TODO. 없을 때 UI 만드세요
            "없어요"
          : filteredTodos.map((todo) => {
              return (
                <TodoItem
                  key={todo.id}
                  {...todo}
                  onUpdate={onUpdate}
                  onDelete={onDelete}
                />
              );
            })}
      </div>
    </div>
  );
};

export default List;
