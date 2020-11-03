import React from "react";
import ControlledCarousel from "../../components/Carousel/carousel.component";
import "./homepage.styles.scss";

const Homepage = ({ history }) => {
  return (
    <div className="homepage">
      <ControlledCarousel history={history} />
    </div>
  );
};

export default Homepage;
