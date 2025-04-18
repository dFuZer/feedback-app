import React from 'react';
import '../css/BentoGrid.css';

type Slide = {
  title: string;
  content: string;
};

type Props = {
  slides: Slide[];
};

const pastelColors = [
  "#E1F2F0", 
  "#FFF8D6", 
  "#FFE4C3", 
  "#E9E1FA", 
  "#FCE1EC", 
];

const BentoGrid: React.FC<Props> = ({ slides }) => {
  return (
    <div className="bento-grid-container">
      {slides.map((slide, index) => {
        const color = pastelColors[index % pastelColors.length];
        return (
          <div
            key={index}
            className="bento-grid-item"
            style={{ backgroundColor: color }}>
            <h3>{slide.title}</h3>
            <p>{slide.content}</p>
          </div>
        );
      })}
    </div>
  );
};

export default BentoGrid;