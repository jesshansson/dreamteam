import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { HamburgerMenu } from "../assets/HamburgerMenu";

export function Header() {
  return (
    <header className="header relative">
      {/* Hamburger-menyn placerad absolut i övre vänstra hörnet */}
      <div className="absolute top-4 left-4 sm:hidden z-20">
        <HamburgerMenu />
      </div>

      {/* Centrerad logotyp och titel */}
      <div className="logo-title flex flex-col items-center">
        <img src={logo} alt="Logo" className="src" />
        <Link to={"/"}>
          <h1 className="text-center">Dream Team</h1>
        </Link>
      </div>

      {/* Visa länkar endast på större skärmar */}
      <div className="hidden sm:flex header-links">
        <Link to={"/"}>
          <h2>Home</h2>
        </Link>
        <Link to={"/my-team"}>
          <h2>My Team</h2>
        </Link>
        <Link to={"/search"}>
          <h2>Search</h2>
        </Link>
      </div>
    </header>
  );
}
