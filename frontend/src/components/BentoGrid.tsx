import React from 'react';
import '../css/BentoGrid.css';

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
          <h3>{slide.title}</h3>
          <p>{slide.content}</p>
        </div>
      ))}
    </div>
  );
};

export default BentoGrid;