import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { HeroProvider } from "../context/HeroContext";
import { Footer } from "./Footer";

export function App() {
  return (
    <>
      <HeroProvider>
        <Header />
        <Outlet />
      </HeroProvider>
      <Footer />
    </>
  );
}
