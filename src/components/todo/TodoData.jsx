const TodoData = (props) => {
  //props là một object {}
  // {
  //     name: "ERic",
  //     age: 25,
  //     data: {}
  // }
  const { name, age, data } = props;
  // const name = props.name;
  // const age = props.age;
  // const data = props.data;

  // console.log(">>> check props: ", props)

  return (
    <div className="todo-data">
      <div>My name is {name}</div>
      <div> Learning React </div>
      <div> Watching Youtube</div>
    </div>
  );
};

export default TodoData;
