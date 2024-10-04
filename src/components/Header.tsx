import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

export function Header() {
  return (
    <header className="header">
      <div className="logo-title">
        <img src={logo} alt="" className="src" />
        <Link to={"/"}>
          <h1>Dream Team</h1>
        </Link>
      </div>
      <div className="header-links">
        <Link to={"/"}>
          <h2>Home</h2>
        </Link>
        <Link to={"/my-team"}>
          <h2>My Team</h2>
        </Link>
        <Link to={"#"}>
          <h2>Search</h2>
        </Link>
      </div>
    </header>
  );
}
