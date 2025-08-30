import { Link } from "react-router";

export function Home() {
  return (
    <div className="max-w-screen lg:max-w-7xl mx-auto p-8 relative z-10">
      <h1 className="text-4xl font-bold mb-8 text-center">GSAP Animation Showcase</h1>
      
      <div className="space-y-6 max-w-2xl mx-auto">
        <div className="text-center">
          <p className="text-lg text-white/80 mb-8">
            Explore different animation techniques and implementations using GSAP with React.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Link 
            to="/sliders" 
            className="group relative overflow-hidden rounded-lg border border-[#f3d5a3]/20 bg-gradient-to-br from-black/40 to-black/20 backdrop-blur-sm p-6 transition-all duration-300 hover:border-[#f3d5a3]/40 hover:shadow-lg hover:shadow-[#f3d5a3]/10"
          >
            <div className="relative z-10">
              <h2 className="text-2xl font-semibold mb-3 text-[#f3d5a3] group-hover:text-[#fbf0df] transition-colors">
                Slider Galleries
              </h2>
              <p className="text-white/70 group-hover:text-white/90 transition-colors">
                Interactive slider galleries with drag, scroll, and click navigation. Compare GSAP and Embla implementations.
              </p>
              <div className="mt-4 inline-flex items-center text-sm text-[#f3d5a3] group-hover:text-[#fbf0df] transition-colors">
                View Sliders
                <svg className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>

          <Link 
            to="/scroll-animation" 
            className="group relative overflow-hidden rounded-lg border border-[#f3d5a3]/20 bg-gradient-to-br from-black/40 to-black/20 backdrop-blur-sm p-6 transition-all duration-300 hover:border-[#f3d5a3]/40 hover:shadow-lg hover:shadow-[#f3d5a3]/10"
          >
            <div className="relative z-10">
              <h2 className="text-2xl font-semibold mb-3 text-[#f3d5a3] group-hover:text-[#fbf0df] transition-colors">
                Scroll Animations
              </h2>
              <p className="text-white/70 group-hover:text-white/90 transition-colors">
                Scroll-triggered animations using GSAP's ScrollTrigger plugin. Experience smooth parallax and reveal effects.
              </p>
              <div className="mt-4 inline-flex items-center text-sm text-[#f3d5a3] group-hover:text-[#fbf0df] transition-colors">
                View Animations
                <svg className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;