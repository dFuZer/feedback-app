import { renderSlides } from '../../utils/renderSlides';
import slidesArray from '../../data/slidesData.json';
import FeedbackForm from '../FeedbackForm';
import React, { useState } from 'react';
import SearchBar from '../Searchbar';
import BentoGrid from '../BentoGrid';
import Slider from '../Slider';

const Main: React.FC = () => {
    const [showForm, setShowForm] = useState<boolean>(false);
    const [filteredSlides, setFilteredSlides] = useState(slidesArray);

    const getRandomSlides = (slides: typeof slidesArray, count: number) => {
        const shuffled = [...slides].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    };

    const randomSlides = getRandomSlides(filteredSlides, 5);

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

    const onSearchButtonClick = (query: string) => {
        const lowerQuery = query.toLowerCase();
        const filtered = slidesArray.filter(
          (slide) =>
            slide.title.toLowerCase().includes(lowerQuery) ||
            slide.content.toLowerCase().includes(lowerQuery)
        );
        setFilteredSlides(filtered);
    };

    return (
        <div className="pageWrapper">
            {!showForm ? (
                <>
                    <button className='firstButton' onClick={() => setShowForm(true)}>
                        Afficher le formulaire
                    </button>
                    <div className="sliderContainer">
                        <Slider 
                            slides={renderSlides(randomSlides)}
                            options={sliderOptions}
                            className="diverse-content-slider"
                        />
                        <SearchBar onSearch={onSearchButtonClick} />
                    </div>
                    <BentoGrid slides={filteredSlides} />
                </>
            ) : (
                <>
                    <FeedbackForm onClose={() => setShowForm(false)} />
                    <div className="sliderContainer">
                        <Slider 
                            slides={renderSlides(randomSlides)}
                            options={sliderOptions}
                            className="diverse-content-slider"
                        />
                        <SearchBar onSearch={onSearchButtonClick} />
                    </div>
                    <BentoGrid slides={filteredSlides} />
                </>
            )}
        </div>
    );
};

export default Main;