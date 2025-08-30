import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./pages/Home";
import Sliders from "./pages/Sliders";
import ScrollAnimation from "./pages/ScrollAnimation";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sliders" element={<Sliders />} />
        <Route path="/scroll-animation" element={<ScrollAnimation />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
