const TodoData = (props) => {
  const { todoList } = props;

  return (
    <div className="todo-data">
      {todoList.map((item, index) => {
        console.log(">>> check item: ", item, index);
        return (
          <div className={`todo-item`} key={item.id}>
            <div>{item.name}</div>
            <button>Delete</button>
          </div>
        );
      })}
    </div>
  );
};

export default TodoData;
