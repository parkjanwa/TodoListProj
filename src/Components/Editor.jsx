// import "./Editor.css";
import { useState, useRef } from "react";

const Editor = ({ onCreate }) => {
  // input tag의 status값을 저장할 status정의
  const [content, setContent] = useState("");
  // 비어있는 input값을 추가하려고 할 때 input에 focus를 줄 수 있게 하는 레퍼런스 정의
  const contentRef = useRef();

  // event handler
  const onChangeContent = (e) => {
    setContent(e.target.value);
  };

  // 엔터키로 todo를 추가하고 싶을때 실행되는 event handler
  const onKeyDown = (e) => {
    if (e.keyCode === 13) {
      onsubmit();
    }
  };

  // 추가 버튼을 클릭하면 실핼되는 함수
  const onSubmit = () => {
    if (content === "") {
      // 빈 문자열이 들어왔을 경우 input창 focus
      contentRef.current.focus();
      // 빈 문자열의 경우 추가하지않음
      return;
    }
    onCreate(content);
    // onCreat로 todo가 추가되었을 때 input에 적힌 값을 비워준다.
    setContent("");
  };

  return (
    // <div className="Editor">
    //   <input
    //     ref={contentRef}
    //     value={content}
    //     onKeyDown={onKeyDown}
    //     onChange={onChangeContent}
    //     placeholder="새로운 todo..."
    //   />
    //   <button onClick={onSubmit}>추가</button>
    // </div>
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
