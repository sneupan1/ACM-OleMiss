import React, { useEffect } from "react";
import { connect } from "react-redux";
import "./applicationsPage.styles.scss";
import WithSpinner from "../../components/with-spinner/with-spinner.component";
import { setTokenInHeader } from "../../redux/user/user.utils";

// import MemberCollection from "../../components/member-card-collections/member-card-collections";

import { getAllApplications } from "../../redux/application/application.actions";

// const MemberCollectionWithSpinner = WithSpinner(MemberCollection);

const ApplicationsPage = ({
  token,
  profiles,
  getAllApplications,
  isFetching,
}) => {
  useEffect(() => {
    setTokenInHeader(token);
    getAllApplications();
  }, [getAllApplications, token]);

  return <div className="applicationsPage">applications</div>;
};

const mapStateToProps = (state) => ({
  applications: state.application.applications,
  isFetching: state.application.isFetching,
  token: state.user.token,
});

export default connect(mapStateToProps, { getAllApplications })(
  ApplicationsPage
);
