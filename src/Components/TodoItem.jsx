const TodoItem = ({ id, is_done, content, created_at, onUpdate, onDelete }) => {
  const onChangeCheckbox = () => {
    onUpdate(id, is_done); // ✅ 현재 상태 함께 전달
  };

  const onClickDeleteButton = () => {
    onDelete(id);
  };

  return (
    <div className="flex items-center gap-5 pb-5 border-b border-gray-300">
      <input
        onChange={onChangeCheckbox}
        // readOnly -> 상태만 보여주고 변경이 안됨
        checked={is_done}
        type="checkbox"
        className="w-5"
      />
      {/* is_done을 보고 글자에 체크처리 해준다. */}
      <div className={`flex-1 ${is_done ? "line-through text-gray-400" : ""}`}>
        {content}
      </div>
      <div className="text-sm text-gray-500">
        {new Date(created_at).toLocaleDateString()}
      </div>
      <button
        onClick={onClickDeleteButton}
        className="text-sm text-gray-500 px-2 py-1 cursor-pointer"
      >
        삭제
      </button>
    </div>
  );
};

export default TodoItem;
