const TodoNew = (props) => {
  const { addNewTodo } = props;
  addNewTodo();
  return (
    <div className="todo-new">
      <input type="text" />
      <button>Add</button>
    </div>
  );
};

export default TodoNew;
