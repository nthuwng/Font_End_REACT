import { useState } from "react";

const TodoNew = (props) => {
  const { addNewTodo } = props;
  //   addNewTodo();
  //   const valueInput = "My text input";
  const [valueInput, setValueInput] = useState("Edric");
  const handleOnClick = () => {
    console.log(">>> valueInput: ", valueInput);
  };

  const handleOnChange = (name) => {
    setValueInput(name);
  };
  return (
    <div className="todo-new">
      <input
        type="text"
        onChange={(Event) => handleOnChange(Event.target.value)}
      />
      <button style={{ cursor: "pointer" }} onClick={handleOnClick}>
        Add
      </button>
      <div>My text input = {valueInput}</div>
    </div>
  );
};

export default TodoNew;
