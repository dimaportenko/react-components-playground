import { Link } from "react-router";
import { GsapGallery } from "@/components/GsapGallery";
import { EmblaGallery } from "@/components/EmblaGallery";

export function Sliders() {
  return (
    <div className="max-w-screen lg:max-w-7xl mx-auto p-8 relative z-10">
      <div className="mb-6">
        <Link 
          to="/" 
          className="inline-flex items-center text-[#f3d5a3] hover:text-[#fbf0df] transition-colors mb-4"
        >
          <svg className="mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Home
        </Link>
        <h1 className="text-4xl font-bold mb-2">Slider Gallery Comparison</h1>
        <p className="text-white/60">
          Compare different slider implementations and their animation approaches.
        </p>
      </div>

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

export default Sliders;