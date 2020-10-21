import React, { useEffect } from "react";
import { connect } from "react-redux";
import "./viewProfile.styles.scss";
import WithSpinner from "../../components/with-spinner/with-spinner.component";
import Profile from "../../components/profile/profile.component";
import { setTokenInHeader } from "../../redux/user/user.utils";
import { getProfileById } from "../../redux/profile/profile.actions";

const ProfileWithSpinner = WithSpinner(Profile);

const ViewProfile = ({
  match,
  token,
  isFetching,
  profileById,
  getProfileById,
  history,
}) => {
  useEffect(() => {
    setTokenInHeader(token);
    getProfileById(match.params.id);
  }, [token, getProfileById, match.params.id]);

  return (
    <div className="viewProfilePage">
      <ProfileWithSpinner
        passItem={profileById}
        history={history}
        isFetching={isFetching}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  profileById: state.profile.profileById,
  isFetching: state.profile.isFetching,
  token: state.user.token,
});

export default connect(mapStateToProps, { getProfileById })(ViewProfile);
