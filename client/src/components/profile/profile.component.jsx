import React from "react";
import "./profile.styles.scss";
import Image from "react-bootstrap/Image";

const Profile = () => {
  return (
    <div className="profileContainer">
      <div className="profileComponent">
        <div className="profileInfo-container">
          <div className="profile-img">
            <Image
              className="dp-img"
              src={`${process.env.REACT_APP_SERVER_URL}/api/profile/5f8887c511e719481ca65bfb/avatar`}
              roundedCircle
            />
          </div>
          <div className="profile-basicInfo">
            <h1 className="profile-name">Saurav Neupane</h1>
            <span>
              UNIVERSITY OF MISSISSIPPI<span id="dashBackground"></span>
              UNDERGRADUATE
            </span>
            <span>MAY 2021 GRADUATION</span>
            <h4 className="profile-basic-tag">Basic Info</h4>
            <div className="basicInfo-fieldbox">
              <span className="basicInfo-category">Major</span>
              <span className="basicInfo-value">Computer Science</span>
            </div>
            <div className="basicInfo-fieldbox">
              <span className="basicInfo-category">Email</span>
              <span className="basicInfo-value">sneupan1@go.olemiss.edu</span>
            </div>
            <div className="basicInfo-fieldbox">
              <span className="basicInfo-category">Github</span>
              <span className="basicInfo-value">github.com/sneupan1</span>
            </div>
            <div className="basicInfo-fieldbox dues">
              <span className="basicInfo-category dues">Dues</span>
              <span className="basicInfo-value dues">$5.00</span>
            </div>
          </div>
        </div>
        <div className="profile-aboutMe">
          <h4 className="profile-tag">About Me</h4>
          <div className="aboutMe-data">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illo
            ducimus, architecto eaque numquam impedit, repudiandae sunt quasi
            eos, consequuntur cum dignissimos illum cupiditate quod temporibus.
            Corrupti pariatur nesciunt cum repudiandae?
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
