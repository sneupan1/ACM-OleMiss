import React, { useEffect } from "react";
import { connect } from "react-redux";
import "./applicationsPage.styles.scss";
import WithSpinner from "../../components/with-spinner/with-spinner.component";
import { setTokenInHeader } from "../../redux/user/user.utils";

import ApplicationCollection from "../../components/application-card-collection/application-card-collection.component";

import { getAllApplications } from "../../redux/application/application.actions";

const ApplicationCollectionWithSpinner = WithSpinner(ApplicationCollection);

const ApplicationsPage = ({
  token,
  applications,
  getAllApplications,
  isFetching,
}) => {
  useEffect(() => {
    setTokenInHeader(token);
    getAllApplications();
  }, [getAllApplications, token]);

  return (
    <div className="applicationsPage">
      <ApplicationCollectionWithSpinner
        passItem={applications}
        isFetching={isFetching}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  applications: state.application.applications,
  isFetching: state.application.isFetching,
  token: state.user.token,
});

export default connect(mapStateToProps, { getAllApplications })(
  ApplicationsPage
);
