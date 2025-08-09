import { DemoCard } from "./DemoCard";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(Draggable, InertiaPlugin, ScrollTrigger);

type DemoCardData = {
  id: number;
  title: string;
  description: string;
};

/**
 *
 * TODO: duplication logic to fill the container with cards
 *
 **/
const demoCards: DemoCardData[] = Array.from({ length: 10 }, (_, index) => {
  const id = index + 1;
  return {
    id,
    title: `Demo Card ${id}`,
    description:
      "This is placeholder content for the gallery card. Replace with real data later.",
  };
});

export const GsapGallery = () => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<Array<HTMLElement | null>>([]);

  useGSAP(
    (context, contextSafe) => {
      if (!contextSafe) return;
      const wrapper = document.querySelector(".wrapper");

      const boxes = gsap.utils.toArray<HTMLElement>(".box");

      let activeElement: HTMLElement | undefined;
      const loop = horizontalLoop(boxes, {
        paused: false,
        draggable: true, // make it draggable
        center: true, // active element is the one in the center of the container rather than th left edge
        repeat: -1,
        onChange: (element, index) => {
          // when the active element changes, this function gets called.
          activeElement && activeElement.classList.remove("active");
          element?.classList.add("active");
          activeElement = element;
        },
      });

      // let cardClickListeners: (() => void)[] = [];
      // boxes.forEach((box, i) => {
      //   const fn = contextSafe(() => {
      //     loop.toIndex?.(i, {
      //       duration: 0.8,
      //       ease: "power1.inOut",
      //       // onComplete: () => {
      //       //   !isPaused && loop.play();
      //       // },
      //     });
      //   });
      //   box.addEventListener("click", fn);
      //   cardClickListeners.push(fn);
      // });

      // replace the two inline adds with named handlers
      const onEnter = contextSafe(() => {
        loop.pause();
      });
      const onLeave = contextSafe(() => {
        loop.play();
      });

      wrapper?.addEventListener("mouseenter", onEnter);
      wrapper?.addEventListener("mouseleave", onLeave);

      // Add Observer for mouse wheel scrolling with continuous scroll and inertia
      let scrollVelocity = 0;
      let momentumTween: gsap.core.Tween | null = null;
      let lastScrollTime = Date.now();
      let scrollRatio = 0;
      let currentScrollProgress = 0;
      
      // We need to wait for the loop to be fully initialized to get totalWidth
      gsap.delayedCall(0.1, () => {
        // Get the total width from the horizontalLoop for ratio calculation
        const totalWidth = loop.totalWidth || 
          ((boxes[boxes.length - 1]?.offsetLeft || 0) + 
          (boxes[boxes.length - 1]?.offsetWidth || 0) - 
          (boxes[0]?.offsetLeft || 0)) || 1000; // fallback value
        
        scrollRatio = 1 / totalWidth;
      });
      
      const observer = ScrollTrigger.observe({
        target: wrapper,
        type: "wheel",
        preventDefault: true,
        wheelSpeed: 0.5,
        onChange: (self) => {
          // Kill any existing momentum animation when new scroll starts
          if (momentumTween) {
            momentumTween.kill();
            momentumTween = null;
          }
          
          // Calculate time delta for velocity calculation
          const currentTime = Date.now();
          const timeDelta = Math.max(16, currentTime - lastScrollTime); // Min 16ms (60fps)
          lastScrollTime = currentTime;
          
          // Combine both X and Y deltas for universal scroll support
          const deltaX = self.deltaX || 0;
          const deltaY = self.deltaY || 0;
          
          // Use the larger delta (some devices only report one axis)
          const scrollDelta = Math.abs(deltaX) > Math.abs(deltaY) ? deltaX : deltaY;
          
          // Convert scroll delta to progress change
          // Adjust multiplier (2) to control scroll sensitivity
          const progressDelta = scrollDelta * scrollRatio * 2;
          
          // Update velocity for momentum calculation
          scrollVelocity = progressDelta / (timeDelta / 1000); // velocity in progress units per second
          
          // Get current progress and calculate new progress
          currentScrollProgress = loop.progress();
          let newProgress = currentScrollProgress + progressDelta;
          
          // Wrap progress between 0 and 1
          newProgress = gsap.utils.wrap(0, 1, newProgress);
          
          // Apply the progress change immediately for responsive feel
          loop.progress(newProgress);
          
          // Clear any existing momentum check
          gsap.killTweensOf(applyMomentum);
          
          // Check for scroll end to apply momentum
          gsap.delayedCall(0.1, applyMomentum);
        }
      });
      
      // Function to apply momentum when scrolling stops
      const applyMomentum = () => {
        // Only apply momentum if there's significant velocity
        if (Math.abs(scrollVelocity) > 0.01) {
          const momentum = scrollVelocity * 0.5; // Momentum factor
          const duration = Math.min(2, Math.abs(momentum) * 2); // Duration based on momentum
          
          // Create momentum tween with easing
          momentumTween = gsap.to({}, {
            duration: duration,
            ease: "power2.out",
            onUpdate: function() {
              const progress = this.progress();
              const remainingMomentum = momentum * (1 - progress);
              const currentProgress = loop.progress();
              const newProgress = gsap.utils.wrap(0, 1, currentProgress + remainingMomentum * 0.016); // 60fps frame
              loop.progress(newProgress);
            },
            onComplete: () => {
              momentumTween = null;
              scrollVelocity = 0;
              
              // Optional: Snap to nearest item when momentum ends
              // Uncomment the following lines if you want snapping after momentum
              /*
              const closestIndex = loop.closestIndex?.(false) || 0;
              loop.toIndex?.(closestIndex, {
                duration: 0.3,
                ease: "power2.inOut"
              });
              */
            }
          });
        }
        
        scrollVelocity = 0;
      };

      // document
      //   .querySelector(".toggle")
      //   .addEventListener("click", () =>
      //     wrapper.classList.toggle("show-overflow"),
      //   );
      // document
      //   .querySelector(".next")
      //   .addEventListener("click", () =>
      //     loop.next({ duration: 0.4, ease: "power1.inOut" }),
      //   );
      // document
      //   .querySelector(".prev")
      //   .addEventListener("click", () =>
      //     loop.previous({ duration: 0.4, ease: "power1.inOut" }),
      //   );

      /*
This helper function makes a group of elements animate along the x-axis in a seamless, responsive loop.

Features:
 - Uses xPercent so that even if the widths change (like if the window gets resized), it should still work in most cases.
 - When each item animates to the left or right enough, it will loop back to the other side
 - Optionally pass in a config object with values like draggable: true, center: true, speed (default: 1, which travels at roughly 100 pixels per second), paused (boolean), repeat, reversed, and paddingRight.
 - The returned timeline will have the following methods added to it:
   - next() - animates to the next element using a timeline.tweenTo() which it returns. You can pass in a vars object to control duration, easing, etc.
   - previous() - animates to the previous element using a timeline.tweenTo() which it returns. You can pass in a vars object to control duration, easing, etc.
   - toIndex() - pass in a zero-based index value of the element that it should animate to, and optionally pass in a vars object to control duration, easing, etc. Always goes in the shortest direction
   - current() - returns the current index (if an animation is in-progress, it reflects the final index)
   - times - an Array of the times on the timeline where each element hits the "starting" spot.
 */
      function horizontalLoop(
        items: HTMLElement[],
        config: {
          onChange: (element: HTMLElement | undefined, index: number) => void;
          paused: boolean;
          draggable: boolean; // make it draggable
          center: boolean; // active element is the one in the center of the container rather than th left edge
          repeat?: number | undefined;
          speed?: number;
          snap?: number | undefined;
          paddingRight?: string;
          reversed?: boolean;
        }
      ) {
        let timeline: gsap.core.Timeline & { 
          totalWidth?: number;
          toIndex?: (index: number, vars: gsap.TweenVars) => gsap.core.Tween | void;
          closestIndex?: (setCurrent: boolean) => number;
          current?: () => number;
          next?: (vars: gsap.TweenVars) => gsap.core.Tween | void;
          previous?: (vars: gsap.TweenVars) => gsap.core.Tween | void;
          times?: number[];
          draggable?: Draggable;
        };
        items = gsap.utils.toArray(items);
        config = config || {};

        gsap.context(() => {
          // use a context so that if this is called from within another context or a gsap.matchMedia(), we can perform proper cleanup like the "resize" event handler on the window
          let onChange = config.onChange;
          let lastIndex = 0;
          let tl = gsap.timeline({
            repeat: config.repeat,
            onUpdate:
              onChange &&
              function () {
                let i = tl.closestIndex();
                // console.log("onUpdate", i);
                if (lastIndex !== i) {
                  lastIndex = i;
                  onChange(items[i], i);
                }
              },
            paused: config.paused,
            defaults: { ease: "none" },
            onReverseComplete: () => {
              tl.totalTime(tl.rawTime() + tl.duration() * 100);
            },
          });
          let length = items.length;
          let startX = items[0]?.offsetLeft;
          let times: number[] = [];
          let widths: number[] = [];
          let spaceBefore: number[] = [];
          let xPercents: number[] = [];
          let curIndex = 0;
          let indexIsDirty = false;
          let center = config.center;
          let pixelsPerSecond = (config.speed || 1) * 100;
          let snap =
            config.snap === undefined
              ? (snapConfig: number | number[] | gsap.utils.SnapNumberConfig) =>
                  snapConfig
              : gsap.utils.snap(config.snap || 1); // some browsers shift by a pixel to accommodate flex layouts, so for example if width is 20% the first element's width might be 242px, and the next 243px, alternating back and forth. So we snap to 5 percentage points to make things look more natural
          let timeOffset = 0;
          let container: HTMLElement | null = items[0]
            ?.parentNode as HTMLElement;
          // center === true
          //   ? items[0]?.parentNode
          //   : gsap.utils.toArray(center)[0] || items[0]?.parentNode;
          let totalWidth: number = 0;
          let getTotalWidth = () => {
            return (
              Number(items?.[length - 1]?.offsetLeft) +
              ((xPercents?.[length - 1] ?? 0) / 100) *
                (widths?.[length - 1] ?? 0) -
              (startX ?? 0) +
              (spaceBefore?.[0] ?? 0) +
              (items?.[length - 1]?.offsetWidth ?? 0) *
                Number(gsap.getProperty(items[length - 1] ?? "", "scaleX")) +
              (parseFloat(config.paddingRight || "0") || 0)
            );
          };
          let populateWidths = () => {
            let b1 = container?.getBoundingClientRect();
            let b2;
            items.forEach((el, i) => {
              widths[i] = parseFloat(
                gsap.getProperty(el, "width", "px").toString()
              );
              xPercents[i] = Number(
                snap(
                  (parseFloat(gsap.getProperty(el, "x", "px").toString()) /
                    widths[i]) *
                    100 +
                    Number(gsap.getProperty(el, "xPercent"))
                )
              );
              b2 = el.getBoundingClientRect();
              spaceBefore[i] = b2.left - (i ? b1.right : b1.left);
              b1 = b2;
            });
            gsap.set(items, {
              // convert "x" to "xPercent" to make things responsive, and populate the widths/xPercents Arrays to make lookups faster.
              xPercent: (i) => xPercents[i] ?? 0,
            });
            totalWidth = getTotalWidth();
          };
          let timeWrap: (time: number) => number;
          let populateOffsets = () => {
            timeOffset = center
              ? (tl.duration() * (container.offsetWidth / 2)) / totalWidth
              : 0;
            center &&
              times.forEach((t, i) => {
                times[i] = timeWrap(
                  (tl.labels?.[`label${i}`] ?? 0) +
                    (tl.duration() * (widths[i] ?? 0)) / 2 / (totalWidth ?? 0) -
                    timeOffset
                );
              });
          };
          let getClosest = (values: number[], value: number, wrap: number) => {
            let i = values.length,
              closest = 1e10,
              index = 0,
              d;
            while (i--) {
              d = Math.abs(values[i] ?? 0 - value);
              if (d > wrap / 2) {
                d = wrap - d;
              }
              if (d < closest) {
                closest = d;
                index = i;
              }
            }
            return index;
          };
          let populateTimeline = () => {
            let i, item, curX, distanceToStart, distanceToLoop;
            tl.clear();
            for (i = 0; i < length; i++) {
              item = items[i];
              curX = ((xPercents[i] ?? 0) / 100) * (widths[i] ?? 0);
              distanceToStart =
                (item?.offsetLeft ?? 0) +
                curX -
                (startX ?? 0) +
                (spaceBefore[0] ?? 0);
              distanceToLoop =
                distanceToStart +
                (widths[i] ?? 0) *
                  Number(gsap.getProperty(item ?? "", "scaleX"));
              // @ts-ignore
              tl.to(
                item ?? null,
                {
                  xPercent: snap(
                    ((curX - distanceToLoop) / (widths[i] ?? 0)) * 100
                  ),
                  duration: distanceToLoop / pixelsPerSecond,
                },
                0
              )
                // @ts-ignore
                .fromTo(
                  item ?? null,
                  {
                    xPercent: snap(
                      ((curX - distanceToLoop + totalWidth) /
                        (widths[i] ?? 0)) *
                        100
                    ),
                  },
                  {
                    xPercent: xPercents[i],
                    duration:
                      (curX - distanceToLoop + totalWidth - curX) /
                      pixelsPerSecond,
                    immediateRender: false,
                  },
                  distanceToLoop / pixelsPerSecond
                )
                .add("label" + i, distanceToStart / pixelsPerSecond);
              times[i] = distanceToStart / pixelsPerSecond;
            }
            timeWrap = gsap.utils.wrap(0, tl.duration());
          };

          let refresh = (deep: boolean = false) => {
            let progress = tl.progress();
            tl.progress(0, true);
            populateWidths();
            deep && populateTimeline();
            populateOffsets();
            deep && tl.draggable && tl.paused()
              ? tl.time(times[curIndex] ?? 0, true)
              : tl.progress(progress, true);
          };
          let onResize = () => refresh(true);
          let proxy: HTMLElement | null = null;

          // --- vars ends here ---

          gsap.set(items, { x: 0 });
          populateWidths();
          populateTimeline();
          populateOffsets();
          window.addEventListener("resize", onResize);
          function toIndex(index: number, vars: gsap.TweenVars) {
            vars = vars || {};
            Math.abs(index - curIndex) > length / 2 &&
              (index += index > curIndex ? -length : length); // always go in the shortest direction
            let newIndex = gsap.utils.wrap(0, length, index);
            let time = times[newIndex] ?? 0;
            if (
              time > (tl.time() ?? 0) !== index > curIndex &&
              index !== curIndex
            ) {
              // if we're wrapping the timeline's playhead, make the proper adjustments
              time += (tl.duration() ?? 0) * (index > curIndex ? 1 : -1);
            }
            if (time < 0 || time > tl.duration()) {
              vars.modifiers = { time: timeWrap };
            }
            curIndex = newIndex;
            vars.overwrite = true;
            gsap.killTweensOf(proxy);
            return vars.duration === 0
              ? tl.time(timeWrap(time))
              : tl.tweenTo(time, vars);
          }
          tl.toIndex = (index: number, vars: gsap.TweenVars) =>
            toIndex(index, vars);
          tl.closestIndex = (setCurrent: boolean) => {
            let index = getClosest(times, tl.time(), tl.duration());
            if (setCurrent) {
              curIndex = index;
              indexIsDirty = false;
            }
            return index;
          };
          tl.current = () => (indexIsDirty ? tl.closestIndex(true) : curIndex);
          tl.next = (vars: gsap.TweenVars) => toIndex(tl.current() + 1, vars);
          tl.previous = (vars: gsap.TweenVars) =>
            toIndex(tl.current() - 1, vars);
          tl.times = times;
          tl.progress(1, true).progress(0, true); // pre-render for performance
          if (config.reversed) {
            tl.vars?.onReverseComplete?.();
            tl.reverse();
          }
          if (config.draggable && typeof Draggable === "function") {
            proxy = document.createElement("div");
            let wrap = gsap.utils.wrap(0, 1);
            let ratio: number;
            let startProgress: number;
            let draggable: Draggable | undefined;
            let dragSnap: number;
            let lastSnap: number;
            let initChangeX: number;
            let wasPlaying: boolean;
            let align = () =>
              tl.progress(
                wrap(
                  startProgress +
                    ((draggable?.startX ?? 0) - (draggable?.x ?? 0)) * ratio
                )
              );
            let syncIndex = () => tl.closestIndex(true);

            typeof InertiaPlugin === "undefined" &&
              console.warn(
                "InertiaPlugin required for momentum-based scrolling and snapping. https://greensock.com/club"
              );

            draggable = Draggable.create(proxy, {
              trigger: items?.[0]?.parentNode as HTMLElement,
              type: "x",
              onPressInit() {
                let x = this.x;
                gsap.killTweensOf(tl);
                wasPlaying = !tl.paused();
                tl.pause();
                startProgress = tl.progress();
                refresh();
                ratio = 1 / totalWidth;
                initChangeX = startProgress / -ratio - x;
                gsap.set(proxy, { x: startProgress / -ratio });
              },
              onDrag: () => {
                align();
              },
              onThrowUpdate: () => {
                align();
              },
              overshootTolerance: 0,
              inertia: true,
              snap(value) {
                //note: if the user presses and releases in the middle of a throw, due to the sudden correction of proxy.x in the onPressInit(), the velocity could be very large, throwing off the snap. So sense that condition and adjust for it. We also need to set overshootTolerance to 0 to prevent the inertia from causing it to shoot past and come back
                if (Math.abs(startProgress / -ratio - this.x) < 10) {
                  return lastSnap + initChangeX;
                }
                let time = -(value * ratio) * tl.duration(),
                  wrappedTime = timeWrap(time),
                  snapTime =
                    times[getClosest(times, wrappedTime, tl.duration())],
                  dif = snapTime ?? 0 - wrappedTime;
                Math.abs(dif) > tl.duration() / 2 &&
                  (dif += dif < 0 ? tl.duration() : -tl.duration());
                lastSnap = (time + dif) / tl.duration() / -ratio;
                return lastSnap;
              },
              onRelease() {
                syncIndex();
                draggable?.isThrowing && (indexIsDirty = true);
              },
              onThrowComplete: () => {
                syncIndex();
                wasPlaying && tl.play();
              },
            })[0];
            tl.draggable = draggable;
          }
          tl.closestIndex(true);
          lastIndex = curIndex;
          onChange && onChange(items[curIndex], curIndex);
          
          // Expose totalWidth for wheel scroll calculation
          tl.totalWidth = totalWidth;
          
          timeline = tl;
          return () => window.removeEventListener("resize", onResize); // cleanup
        });

        // @ts-ignore
        return timeline;
      }

      return () => {
        wrapper?.removeEventListener("mouseenter", onEnter);
        wrapper?.removeEventListener("mouseleave", onLeave);
        boxes.forEach((box, i) => {
          // @ts-ignore
          // box.removeEventListener("click", cardClickListeners[i]);
        });
        // Clean up the Observer
        observer.kill();
      };
    },
    { scope: wrapperRef }
  );

  return (
    <div
      ref={wrapperRef}
      className="wrapper relative flex overflow-hidden items-center"
    >
      {demoCards.map((card, index) => (
        <div
          key={card.id}
          ref={(elem: HTMLDivElement | null) => {
            cardRefs.current[index] = elem;
          }}
          className="box"
        >
          <DemoCard
            id={card.id}
            title={card.title}
            description={card.description}
          />
        </div>
      ))}
    </div>
  );
};
