import { Link } from "react-router-dom";

export function Header() {
  return (
    <header className="header">
      <Link to={"/"}>
        <h1>Dream Team</h1>
      </Link>
      <div className="header-links">
        <Link to={"/my-team"}>
          <h2>My Team</h2>
        </Link>
      </div>
    </header>
  );
}
