import { useState, useRef } from "react";

const Editor = ({ onCreate }) => {
  const [content, setContent] = useState("");

  const contentRef = useRef();

  const onChangeContent = (e) => {
    setContent(e.target.value);
  };

  const onKeyDown = (e) => {
    if (e.keyCode === 13) {
      onsubmit();
    }
  };

  const onSubmit = () => {
    if (content === "") {
      contentRef.current.focus();

      return;
    }
    onCreate(content);

    setContent("");
  };

  return (
    <div className="flex gap-2.5">
      <input
        ref={contentRef}
        value={content}
        onKeyDown={onKeyDown}
        onChange={onChangeContent}
        placeholder="새로운 todo..."
        className="flex-1 p-4 border border-gray-300 rounded-md"
      />
      <button
        onClick={onSubmit}
        className="w-20 bg-blue-500 text-white rounded-md border-none cursor-pointer"
      >
        추가
      </button>
    </div>
  );
};

export default Editor;
