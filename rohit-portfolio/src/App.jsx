import Cursor    from "./components/Cursor";
import Navbar    from "./components/Navbar";
import Hero      from "./components/Hero";
import About     from "./components/About";
import Projects  from "./components/Projects";
import Skills    from "./components/Skills";
import Education from "./components/Education";
import Room      from "./components/Room";
import Contact   from "./components/Contact";
import Footer    from "./components/Footer";
import HeroBg from "./components/HeroBg";
import HologramAvatar from "./components/HologramAvatar";
export default function App() {
  return (
    <>
      <Cursor/>
      <Navbar/>
      <main>
        <Hero/>
        <About/>
        <Projects/>
        <Skills/>
        <Education/>
        <Room/>
        <HologramAvatar/>
        <Contact/>
      </main>
      <Footer/>
      <HeroBg/>
    </>
  );
}