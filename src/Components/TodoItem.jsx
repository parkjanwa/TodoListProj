// import "./TodoItem.css";

const TodoItem = ({ id, isDone, content, date, onUpdate, onDelete }) => {
  const onChangeCheckbox = () => {
    onUpdate(id);
  };

  const onClickDeleteButton = () => {
    onDelete(id);
  };

  return (
    <div className="flex items-center gap-5 pb-5 border-b border-gray-300">
      <input
        onChange={onChangeCheckbox}
        readOnly
        checked={isDone}
        type="checkbox"
        className="w-5"
      />
      <div className="flex-1">{content}</div>
      <div className="text-sm text-gray-500">
        {new Date(date).toLocaleDateString()}
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
