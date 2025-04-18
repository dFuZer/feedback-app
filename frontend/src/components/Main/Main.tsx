import React, { useState } from 'react';
import Slider from '../Slider';
import FeedbackForm from '../FeedbackForm';
import SearchBar from '../Searchbar';
import slidesArray from '../../data/slidesData.json';
import { renderSlides } from '../../utils/renderSlides';

const Main: React.FC = () => {
    const [showForm, setShowForm] = useState<boolean>(false);
    const [filteredSlides, setFilteredSlides] = useState(slidesArray);

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
                        <SearchBar onSearch={onSearchButtonClick} />
                        <Slider 
                            slides={renderSlides(filteredSlides)}
                            options={sliderOptions}
                            className="diverse-content-slider"
                        />
                    </div>
                </>
            ) : (
                <>
                    <FeedbackForm onClose={() => setShowForm(false)} />
                    <div className="sliderContainer">
                        <SearchBar onSearch={onSearchButtonClick} />
                        <Slider 
                            slides={renderSlides(filteredSlides)}
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