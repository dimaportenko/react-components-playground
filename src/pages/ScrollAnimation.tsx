import { Link } from "react-router";
import { useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function ScrollAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Fade in animation for hero section
    gsap.fromTo(".hero-content", 
      { opacity: 0, y: 50 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 1,
        ease: "power2.out"
      }
    );

    // Parallax effect for cards
    gsap.utils.toArray<HTMLElement>(".scroll-card").forEach((card, index) => {
      gsap.fromTo(card,
        { opacity: 0, y: 100 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    // Text reveal animation
    gsap.utils.toArray<HTMLElement>(".text-reveal").forEach((text) => {
      gsap.fromTo(text,
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: text,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    // Parallax background elements
    gsap.to(".parallax-bg", {
      yPercent: -50,
      ease: "none",
      scrollTrigger: {
        trigger: ".parallax-section",
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="relative">
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
          
          <div className="hero-content">
            <h1 className="text-4xl font-bold mb-2">Scroll Animations</h1>
            <p className="text-white/60">
              Experience smooth scroll-triggered animations using GSAP's ScrollTrigger plugin.
            </p>
          </div>
        </div>

        {/* Scroll content sections */}
        <div className="space-y-20">
          {/* Section 1 */}
          <section className="scroll-card bg-gradient-to-br from-black/40 to-black/20 backdrop-blur-sm p-8 rounded-lg border border-[#f3d5a3]/20">
            <h2 className="text-2xl font-semibold mb-4 text-[#f3d5a3] text-reveal">Fade In Animation</h2>
            <p className="text-white/80 text-reveal">
              This section demonstrates a fade-in animation triggered when it enters the viewport. 
              The content smoothly transitions from invisible to visible with a subtle upward movement.
            </p>
          </section>

          {/* Section 2 */}
          <section className="scroll-card bg-gradient-to-br from-black/40 to-black/20 backdrop-blur-sm p-8 rounded-lg border border-[#f3d5a3]/20">
            <h2 className="text-2xl font-semibold mb-4 text-[#f3d5a3] text-reveal">Staggered Text Reveal</h2>
            <p className="text-white/80 text-reveal">
              Each text element animates in from the left with a staggered timing effect. 
              This creates a natural reading flow and draws attention to the content progressively.
            </p>
          </section>

          {/* Parallax Section */}
          <section className="parallax-section relative overflow-hidden bg-gradient-to-br from-black/60 to-black/40 backdrop-blur-sm p-12 rounded-lg border border-[#f3d5a3]/20 min-h-[60vh] flex items-center">
            <div className="parallax-bg absolute inset-0 bg-gradient-to-r from-[#f3d5a3]/10 to-[#fbf0df]/10 opacity-50"></div>
            <div className="relative z-10 max-w-2xl">
              <h2 className="text-3xl font-bold mb-6 text-[#f3d5a3] text-reveal">Parallax Background</h2>
              <p className="text-lg text-white/90 text-reveal">
                This section features a parallax background that moves at a different speed than the content, 
                creating depth and visual interest as you scroll. The background gradient shifts and moves 
                independently from the text content.
              </p>
            </div>
          </section>

          {/* Section 3 */}
          <section className="scroll-card bg-gradient-to-br from-black/40 to-black/20 backdrop-blur-sm p-8 rounded-lg border border-[#f3d5a3]/20">
            <h2 className="text-2xl font-semibold mb-4 text-[#f3d5a3] text-reveal">Scale Animation</h2>
            <p className="text-white/80 text-reveal">
              Elements can scale in from smaller sizes, creating an engaging zoom effect. 
              This animation technique is perfect for highlighting important content sections.
            </p>
          </section>

          {/* Section 4 */}
          <section className="scroll-card bg-gradient-to-br from-black/40 to-black/20 backdrop-blur-sm p-8 rounded-lg border border-[#f3d5a3]/20">
            <h2 className="text-2xl font-semibold mb-4 text-[#f3d5a3] text-reveal">Reverse on Leave</h2>
            <p className="text-white/80 text-reveal">
              These animations can reverse when the element leaves the viewport, 
              creating a smooth bi-directional effect that enhances the scrolling experience.
            </p>
          </section>

          {/* Final section with larger spacing */}
          <section className="scroll-card bg-gradient-to-br from-[#f3d5a3]/10 to-[#fbf0df]/10 backdrop-blur-sm p-12 rounded-lg border border-[#f3d5a3]/40 text-center">
            <h2 className="text-3xl font-bold mb-6 text-[#f3d5a3] text-reveal">End of Journey</h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto text-reveal">
              You've experienced various scroll-triggered animations. These techniques can be combined 
              and customized to create rich, interactive experiences that engage users as they explore your content.
            </p>
            <div className="mt-8 text-reveal">
              <Link 
                to="/sliders" 
                className="inline-flex items-center px-6 py-3 bg-[#f3d5a3]/20 hover:bg-[#f3d5a3]/30 text-[#f3d5a3] hover:text-[#fbf0df] rounded-lg border border-[#f3d5a3]/40 transition-all duration-300"
              >
                Explore Slider Galleries
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default ScrollAnimation;