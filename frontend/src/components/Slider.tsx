import React, { useEffect, useRef } from "react";
import Glide from "@glidejs/glide";
import "@glidejs/glide/dist/css/glide.core.min.css";
import "@glidejs/glide/dist/css/glide.theme.min.css";
import "../css/Slider.css";
import { Controls, Breakpoints, Swipe, Images, Autoplay } from "@glidejs/glide/dist/glide.modular.esm";

interface SliderOptions {
    type?: "slider" | "carousel";
    startAt?: number;
    perView?: number;
    focusAt?: number | "center";
    gap?: number;
    autoplay?: number | boolean;
    hoverpause?: boolean;
    keyboard?: boolean;
    bound?: boolean;
    swipeThreshold?: number | boolean;
    dragThreshold?: number | boolean;
    perTouch?: number | boolean;
    touchRatio?: number;
    touchAngle?: number;
    animationDuration?: number;
    rewind?: boolean;
    rewindDuration?: number;
    animationTimingFunc?: string;
    direction?: "ltr" | "rtl";
    peek?: number | { before?: number; after?: number };
    breakpoints?: Record<string, Partial<SliderOptions>>;
    classes?: Record<string, string>;
    throttle?: number;
}

interface SliderProps {
    options?: SliderOptions;
    slides: React.ReactNode[];
    className?: string;
    modules?: Record<string, any>;
}
  
const Slider: React.FC<SliderProps> = ({ 
    options, 
    slides, 
    className = "",
    modules = { Controls, Breakpoints, Swipe, Images, Autoplay }
  }) => {
    const sliderRef = useRef<HTMLDivElement>(null);
    const glideInstance = useRef<Glide | null>(null);
  
    useEffect(() => {
      if (sliderRef.current && slides.length > 0) {
        const defaultOptions: SliderOptions = {
          type: "carousel",
          startAt: 0,
          perView: 3,
          gap: 0,
          animationDuration: 400,
        };
  
        glideInstance.current = new Glide(sliderRef.current, {
          ...defaultOptions,
          ...options,
        });
  
        glideInstance.current!.mount(modules);
      }
  
      return () => {
        if (glideInstance.current) {
          glideInstance.current.destroy();
        }
      };
    }, [options, slides, modules]);
  
    useEffect(() => {
      if (glideInstance.current) {
        glideInstance.current.update();
      }
    }, [slides]);
  
    return (
      <div className={`slider-container ${className}`}>
        <div className="glide" ref={sliderRef}>
          <div className="glide__track" data-glide-el="track">
            <ul className="glide__slides">
              {slides.map((slide, index) => (
                <li key={index} className="glide__slide">
                  {slide}
                </li>
              ))}
            </ul>
          </div>
  
          <div className="glide__arrows" data-glide-el="controls">
            <button
              className="glide__arrow glide__arrow--left"
              data-glide-dir="<"
              aria-label="Précédent"
            >
              &#10094;
            </button>
            <button
              className="glide__arrow glide__arrow--right"
              data-glide-dir=">"
              aria-label="Suivant"
            >
              &#10095;
            </button>
          </div>
  
          <div className="glide__bullets" data-glide-el="controls[nav]">
            {slides.map((_, index) => (
              <button
                key={index}
                className="glide__bullet"
                data-glide-dir={`=${index}`}
                aria-label={`Aller au slide ${index + 1}`}
              ></button>
            ))}
          </div>
        </div>
      </div>
    );
  };

export default Slider;