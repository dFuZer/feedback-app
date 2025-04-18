import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useMemo, useState } from "react";
import { getFeedbacks } from "../../data/api";
import { renderSlides } from "../../utils/renderSlides";
import BentoGrid from "../BentoGrid";
import FeedbackForm from "../FeedbackForm";
import SearchBar from "../Searchbar";
import Slider from "../Slider";

const Main: React.FC = () => {
    const [showForm, setShowForm] = useState<boolean>(false);
    const feedbackQuery = useQuery({
        queryKey: ["feedbacks"],
        queryFn: getFeedbacks,
    });
    const [initialLoaded, setInitialLoaded] = useState<boolean>(false);

    const feedbacks = useMemo(() => feedbackQuery.data ?? [], [feedbackQuery.data]);
    type Feedback = (typeof feedbacks)[number];
    const [filteredSlides, setFilteredSlides] = useState<Feedback[]>([]);

    useEffect(() => {
        if (feedbackQuery.status === "success" && !initialLoaded) {
            setFilteredSlides(feedbackQuery.data!);
            setInitialLoaded(true);
        }
    }, [feedbackQuery.status]);

    useEffect(() => {
        console.log({ feedbacks, filteredSlides });
    }, [feedbacks, filteredSlides]);

    const getRandomSlides = (slides: typeof feedbacks, count: number) => {
        const shuffled = [...slides].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    };

    const randomSlides = getRandomSlides(filteredSlides, 5);

    const onSearchButtonClick = (query: string) => {
        const lowerQuery = query.toLowerCase();
        const filtered = feedbacks.filter(
            (slide) =>
                slide.title.toLowerCase().includes(lowerQuery) || slide.content.toLowerCase().includes(lowerQuery)
        );
        setFilteredSlides(filtered);
    };

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
                    slides={renderSlides(randomSlides)}
                    options={sliderOptions}
                    className="diverse-content-slider"
                />
                <SearchBar onSearch={onSearchButtonClick} />
            </div>
            <BentoGrid slides={filteredSlides} />
            <div className="sliderContainer">
                <Slider
                    slides={renderSlides(filteredSlides)}
                    options={sliderOptions}
                    className="diverse-content-slider"
                />
            </div>
        </div>
    );
};

export default Main;
