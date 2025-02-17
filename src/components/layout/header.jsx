import "./header.css";
const Header = () => {
  return (
    <ul>
      <li>
        <a class="active" href="/">
          Home
        </a>
      </li>
      <li>
        <a href="/Users">Users</a>
      </li>
      <li>
        <a href="/Products">Products</a>
      </li>
    </ul>
  );
};
export default Header;
