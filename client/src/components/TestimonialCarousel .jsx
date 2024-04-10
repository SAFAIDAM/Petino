import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

const TestimonialCarousel = ({ testimonials }) => {
  // Custom CSS styles
  const customStyles = `
    .carousel .slide img {
      width: 128px;
      vertical-align: top;
      border: 0;
    }
    .carousel .slide .text-center {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .carousel .slide .text-center p {
      width: 70%; /* Set width to 50% */
    }
  `;

  return (
    <div className="mt-32 relative"> {/* Make the container relative */}
      <style>{customStyles}</style>
      <Carousel
        showThumbs={false}
        showIndicators={false} // Hide control dots
        infiniteLoop={true}
        autoPlay={true}
        interval={5000}
        renderArrowPrev={(onClickHandler, hasPrev, label) =>
          hasPrev && (
            <button
              type="button"
              onClick={onClickHandler}
              title={label}
              style={{ left: 15, fontFamily: "'Gluten', cursive" }}
              className="absolute top-1/2 transform -translate-y-1/2 z-10 rounded-full text-black text-9xl px-3 py-2 max-sm:w-10 hidden md:inline"
            >
              {"<"}
            </button>
          )
        }
        renderArrowNext={(onClickHandler, hasNext, label) =>
          hasNext && (
            <button
              type="button"
              onClick={onClickHandler}
              title={label}
              style={{
                right: 15,
                fontFamily: "'Gluten', cursive" // Apply 'Gluten' font family
              }}
              className="absolute top-1/2 transform -translate-y-1/2 z-10 rounded-full text-orange-600 text-9xl px-3 py-2 hidden md:inline"
            >
              {">"}
            </button>
          )
        }
      >
        {testimonials.map((testimonial, index) => (
          <div key={index} className="flex flex-col items-center justify-center ">
            <img
              src={testimonial.image}
              alt={`Testimonial ${index + 1}`}
              className="rounded-full mb-4 "
            />
            <div className="text-center w-full"> {/* Set width to 100% */}
              <p className="xl:w-full">{testimonial.text}</p> {/* Remove width restriction */}
              <p className="pt-5 text-xl font-semibold  ">{testimonial.name}</p>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default TestimonialCarousel;
