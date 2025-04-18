import React, { useState, useEffect, useRef } from 'react';
import Header from '../Header/Header';
import Slider from '../Slider';
import FeedbackForm from '../FeedbackForm';
import SearchBar from '../Searchbar';
import Filter from '../Filter/Filter';

const Main: React.FC = () => {
    const [showForm, setShowForm] = useState<boolean>(false);
    const formRef = useRef<HTMLDivElement | null>(null);  

    // Gestion de la fermeture du formulaire lors d'un clic en dehors
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (formRef.current && !formRef.current.contains(event.target as Node)) {
                setShowForm(false);  
            }
        };
        if (showForm) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showForm]); 

    // Ajout d'une classe pour le fond noir lorsque le formulaire est ouvert
    useEffect(() => {
        if (showForm) {
            document.body.classList.add('form-open');
        } else {
            document.body.classList.remove('form-open');
        }

        return () => {
            document.body.classList.remove('form-open');
        };
    }, [showForm]);

    const sliderOptions = {
        type: "carousel" as "carousel",
        perView: 3,
        gap: 20,
        autoplay: 5000,
        focusAt: "center" as "center",
        animationDuration: 600,
        bound: true,
        breakpoints: {
            1024: { perView: 2 },
            768: { perView: 1 }
        }
    };

    const onSearchButtonClick = async (query: string) => {
        try {
        } catch (err) {
            console.error("Erreur de recherche :", err);
        }
    };

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
                "- C'est vrai que vous êtes le fils d'un démon et d'une pucelle ?
                - Oui pourquoi ?
                - Vous avez plus pris de la pucelle…"
            </blockquote>
        </div>,
        <div className="slide-content">
            <div className="feedback-title">
                <strong>Temporalité</strong>
            </div>
            <blockquote>
                "De toute façon, les réunions de la Table Ronde c'est deux fois par mois. Donc si le mec il dit après-demain à partir de dans deux jours, suivant s'il le dit à la fin du mois, ça reporte."
            </blockquote>
        </div>,
        <div className="slide-content">
            <div className="feedback-title">
                <strong>Burn out</strong>
            </div>
            <blockquote>
                "Non, moi je crois qu'il faut que vous arrêtiez d'essayer de dire des trucs… Ça vous fatigue, déjà. Puis pour les autres vous vous rendez pas compte de ce que c'est. Moi, quand vous faites ça, ça me fout une angoisse… Je pourrais vous tuer je crois. De chagrin hein. Je vous jure, c'est pas bien. Il faut plus que vous parliez avec des gens."
            </blockquote>
        </div>,
    ];

    return (
        <div className="pageWrapper">
            {!showForm ? (
                <>
                    <button className='firstButton' onClick={() => setShowForm(true)}>
                        Afficher le formulaire
                    </button>
                    <div className="sliderContainer">
                        <SearchBar onSearch={(query) => console.log(query)} />
                        <Filter />
                        <Slider 
                            slides={slidesArray} 
                            options={sliderOptions}
                            className="diverse-content-slider"
                        />
                    </div>
                </>
            ) : (
                <>
                    <div
                        ref={formRef}
                        className="formContainer"
                        onClick={(e) => e.stopPropagation()}  
                    >
                    </div>
                    <FeedbackForm onClose={() => setShowForm(false)} />
                    <div className="sliderContainer">
                        <SearchBar onSearch={onSearchButtonClick} />
                        <Slider 
                            slides={slidesArray} 
                            options={sliderOptions}
                            className="diverse-content-slider"
                        />
                    </div>
                </>
            )}
        </div>
    );
};

export default Main;
