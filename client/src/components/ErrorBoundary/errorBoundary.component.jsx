import React from "react";

import "./errorBoundary.styles.scss";

class ErrorBoundary extends React.Component {
  constructor() {
    super();

    this.state = {
      hasErrored: false,
    };
  }

  static getDerivedStateFromError(error) {
    // process the error
    return {
      hasErrored: true,
    };
  }

  componentDidCatch(error, info) {
    console.log(info);
  }

  render() {
    if (this.state.hasErrored) {
      return (
        <div className="errorImageOverlay">
          <div className="errorImageContainer" />
          <h2 className="errorImageText">Sorry! A Dog Ate this Page</h2>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
