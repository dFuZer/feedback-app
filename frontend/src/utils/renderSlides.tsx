export interface Slide {
  title: string;
  content: string;
}

export const renderSlides = (data: Slide[]) =>
  data.map((slide, index) => (
    <div className="slide-content" key={index}>
      <div className="feedback-title">
        <strong>{slide.title}</strong>
      </div>
      <blockquote>{slide.content}</blockquote>
    </div>
));