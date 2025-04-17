import "./App.css";
import React from "react";
import Slider from "./components/Slider";

function App() {

    const slidesArray = [
        <div className="slide-content">
            <div className="feedback-title">
                <strong>La tarte</strong>
            </div>
            <blockquote>
                "Sans vouloir la ramener, la seule différence concrète avec des briques, c'est que vous appelez ça des tartes hein !"
            </blockquote>
        </div>,

        <div className="slide-content">
            <div className="feedback-title">
                <strong>Démon ou pucelle ?</strong>
            </div>
            <blockquote>
                "- C’est vrai que vous êtes le fils d’un démon et d’une pucelle ?
                - Oui pourquoi ?
                - Vous avez plus pris de la pucelle…"
            </blockquote>
        </div>,

        <div className="slide-content">
            <div className="feedback-title">
                <strong>Temporalité</strong>
            </div>
            <blockquote>
                "De toute façon, les réunions de la Table Ronde c’est deux fois par mois. Donc si le mec il dit après-demain à partir de dans deux jours, suivant s’il le dit à la fin du mois, ça reporte."
            </blockquote>
        </div>,

        <div className="slide-content">
            <div className="feedback-title">
                <strong>Burn out</strong>
            </div>
            <blockquote>
                "Non, moi je crois qu’il faut que vous arrêtiez d’essayer de dire des trucs… Ça vous fatigue, déjà. Puis pour les autres vous vous rendez pas compte de ce que c’est. Moi, quand vous faites ça, ça me fout une angoisse… Je pourrais vous tuer je crois. De chagrin hein. Je vous jure, c’est pas bien. Il faut plus que vous parliez avec des gens."
            </blockquote>
        </div>,
    ]

    const sliderOptions = {
        type: "carousel" as "carousel",
        perView: 3,
        gap: 20,
        autoplay: 5000,
        focusAt: "center" as "center",
        animationDuration: 600,
        breakpoints: {
            1024: { perView: 2 },
            768: { perView: 1 }
        }
      };

    return (
        <div className="app">
          <h1 className="app-title">🌟 The world's best feedback app 🌟</h1>

          <div className="app-slider-container">
            <Slider 
                slides={slidesArray} 
                options={sliderOptions}
                className="diverse-content-slider"
            />
          </div>
        </div>
      );
}

export default App;
