import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { getFeedbacks } from "../../data/api";
import { renderSlides } from "../../utils/renderSlides";
import FeedbackForm from "../FeedbackForm";
import Slider from "../Slider";

const Main: React.FC = () => {
    const [showForm, setShowForm] = useState<boolean>(false);
    const feedbacks = useQuery({
        queryKey: ["feedbacks"],
        queryFn: getFeedbacks,
    });

    const sliderOptions = {
        type: "carousel" as const,
        perView: 3,
        gap: 20,
        autoplay: 5000,
        focusAt: "center" as const,
        animationDuration: 600,
        bound: true,
        breakpoints: {
            1024: { perView: 2 },
            768: { perView: 1 },
        },
    };

    return (
        <div className="pageWrapper">
            {!showForm ? (
                <button className="firstButton" onClick={() => setShowForm(true)}>
                    Afficher le formulaire
                </button>
            ) : (
                <FeedbackForm onClose={() => setShowForm(false)} />
            )}
            <div className="sliderContainer">
                <Slider
                    slides={renderSlides(feedbacks.data ?? [])}
                    options={sliderOptions}
                    className="diverse-content-slider"
                />
            </div>
        </div>
    );
};

export default Main;
