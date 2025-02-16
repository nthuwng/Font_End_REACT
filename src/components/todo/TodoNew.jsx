const TodoNew = (props) => {
  const { addNewTodo } = props;
  //   addNewTodo();

  const handleOnClick = () => {
    alert("Handle on click");
  };

  const handleOnChange = (name) => {
    console.log("=>>> Handle on change", name);
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
    </div>
  );
};

export default TodoNew;
