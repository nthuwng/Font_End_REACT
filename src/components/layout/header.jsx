import { Link, NavLink } from "react-router-dom";
import "./header.css";
const Header = () => {
  return (
    <ul>
      <li>
        <NavLink class="active" to="/">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/Users">Users</NavLink>
      </li>
      <li>
        <NavLink to="/Products">Products</NavLink>
      </li>
    </ul>
  );
};
export default Header;
