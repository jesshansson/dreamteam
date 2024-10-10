import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { HeroProvider } from "../context/HeroContext";
import { Footer } from "./Footer";

export function App() {
  return (
    <>
      <section id="page-container">
        <section id="content-wrap">
          <HeroProvider>
            <Header />
            <Outlet />
          </HeroProvider>
        </section>
        <Footer />
      </section>
    </>
  );
}
