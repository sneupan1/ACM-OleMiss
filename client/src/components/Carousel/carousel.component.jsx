import React, { useState } from "react";
import { connect } from "react-redux";
import Carousel from "react-bootstrap/Carousel";
import Button from "react-bootstrap/Button";
import "./carousel.styles.scss";

import { motion } from "framer-motion";

const h3Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 1,
    },
  },
};

const pVariants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      delay: 0.2,
      duration: 1,
    },
  },
};

const buttonVariants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      delay: 0.3,
      duration: 1,
    },
  },
};

function ControlledCarousel({ token, history }) {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel
      className="carousel-component"
      activeIndex={index}
      onSelect={handleSelect}
    >
      <Carousel.Item>
        <img
          className="d-block w-100 wierhall"
          src="./weirhall.jpg"
          alt="First slide"
        />
        <div className="dark-overlay" />
        <Carousel.Caption>
          <motion.div variants={h3Variants} initial="initial" animate="animate">
            <h3>Association of Computing Machinery</h3>
          </motion.div>
          <motion.div variants={pVariants} initial="initial" animate="animate">
            <p>
              Dedicated to promoting interest in computing and information
              technologies among members of the Ole Miss Community.
            </p>
          </motion.div>

          {!token && (
            <motion.div
              className="homepageButtons"
              variants={buttonVariants}
              initial="initial"
              animate="animate"
            >
              <Button
                variant="primary"
                onClick={() => history.push("/register/user")}
              >
                Register
              </Button>
              <Button variant="info" onClick={() => history.push("/login")}>
                Login
              </Button>
            </motion.div>
          )}
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="./teamwork2.jpg"
          alt="Second slide"
        />
        <div className="dark-overlay" />
        <Carousel.Caption>
          <h3>Register for an event</h3>
          <p>
            We host a variety of events providing our students an enhanced
            understanding of advance science and technologies.
          </p>
          <div className="homepageButtons">
            <Button variant="primary" onClick={() => history.push("/events")}>
              Events
            </Button>
          </div>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src="./CSLabs.jpg" alt="Third slide" />
        <div className="dark-overlay" />
        <Carousel.Caption>
          <h3>About the ACM Club</h3>
          <p>
            ACM brings together computing educators, researchers, and
            professionals to inspire dialogue, share resources, and address the
            field's challenges. ACM also supports the professional growth of its
            members by providing opportunities for life‐long learning, career
            development, and professional networking.
          </p>
          <div className="homepageButtons">
            <Button
              href="https://www.acm.org/about-acm/about-the-acm-organization"
              target="_blank"
              variant="primary ACMOrg"
            >
              Learn More
            </Button>
          </div>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

const mapStateToProps = (state) => ({
  token: state.user.token,
});

export default connect(mapStateToProps)(ControlledCarousel);
