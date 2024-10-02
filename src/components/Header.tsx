import { Link } from "react-router-dom"

export function Header() {
  return (
    <header className="header">
      <Link to={"/"}> <h1>Dream Team</h1></Link>
    </header>
  );
}
