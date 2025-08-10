import "./index.css";
// import "./components/embla.css";
import { GsapGallery } from "./components/GsapGallery";
import { EmblaGallery } from "./components/EmblaGallery";

export function App() {
  return (
    <div className="max-w-screen lg:max-w-7xl mx-auto p-8 relative z-10">
      <h1 className="text-4xl font-bold mb-6">Slider Gallery Comparison</h1>

      <div className="space-y-12">
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-[#f3d5a3]">GSAP Gallery</h2>
          <p className="text-sm text-white/60 mb-4">
            Drag, scroll, or click to navigate. Features continuous scrolling with momentum.
          </p>
          <GsapGallery />
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-[#f3d5a3]">Embla Gallery</h2>
          <p className="text-sm text-white/60 mb-4">
            Use arrow buttons or start auto-scroll. Features smooth carousel navigation.
          </p>
          <EmblaGallery />
        </section>
      </div>
    </div>
  );
}

export default App;
