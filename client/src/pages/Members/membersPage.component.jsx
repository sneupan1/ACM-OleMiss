import React, { useEffect } from "react";
import { connect } from "react-redux";
import "./membersPage.styles.scss";
import WithSpinner from "../../components/with-spinner/with-spinner.component";
import { setTokenInHeader } from "../../redux/user/user.utils";

import MemberCollection from "../../components/member-card-collections/member-card-collections";

import { getAllProfiles } from "../../redux/profile/profile.actions";

const MemberCollectionWithSpinner = WithSpinner(MemberCollection);

const MembersPage = ({ token, profiles, getAllProfiles, isFetching }) => {
  useEffect(() => {
    setTokenInHeader(token);
    getAllProfiles();
  }, [getAllProfiles, token]);

  return (
    <div className="membersPage">
      <MemberCollectionWithSpinner
        passItem={profiles}
        isFetching={isFetching}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  profiles: state.profile.allProfiles,
  isFetching: state.profile.isFetching,
  token: state.user.token,
});

export default connect(mapStateToProps, { getAllProfiles })(MembersPage);
