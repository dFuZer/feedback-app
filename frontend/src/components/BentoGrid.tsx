import React from "react";
import "../css/BentoGrid.css";

type Slide = {
    title: string;
    content: string;
};

type Props = {
    slides: Slide[];
};

const BentoGrid: React.FC<Props> = ({ slides }) => {
    return (
        <div className="bento-grid-container">
            {slides.map((slide, index) => (
                <div key={index} className="bento-grid-item">
                    <h3 className="bento-grid-item-title">{slide.title}</h3>
                    <p className="bento-grid-item-content">{slide.content}</p>
                </div>
            ))}
        </div>
    );
};

export default BentoGrid;
