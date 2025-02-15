import "./style.css";

const MyFunction = () => {
  // const hoidanit = "Hoi Dan IT"; // string
  // const hoidanit = 123; // number
  // const hoidanit = undefined;
  // const hoidanit = null;
  // const hoidanit = true;  // boolean
  // const hoidanit = [1, 2, 3]; //array
  const hoidanit = {
    name: "Hoi Dan IT",
    age: 22,
  };

  return (
    <>
      <div>{JSON.stringify(hoidanit)} & learn React</div>
      {console.log("Edric")}
      <div className="child" style={{ borderRadius: "10px" }}>
        child
      </div>
    </>
  );
};

export default MyFunction; // dùng để export 1 function ra ngoài
