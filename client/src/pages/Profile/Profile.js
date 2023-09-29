import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import moment from 'moment';

import img from "../../img/img1.png";
import { FaAccessibleIcon } from "react-icons/fa6";

import "./profile.css";
import Spiner from "../../components/Spiner/Spiner";
import {getSingleUserFun } from "../../services/Apis"
import { useParams } from "react-router-dom";
import { BASE_URL } from "../../services/helper";

const Profile = () => {
  const [userProfile, setUserProfile] = useState({})
  const [showSpin, setShowSpin] = useState(true);
  const {id} = useParams()
  console.log(id)

  const getUser = async () => {
    const response = await getSingleUserFun(id)
    console.log(response)
    if(response.status === 200) {
      setUserProfile(response.data)      
    }else {
      console.log("error")
    }
  }

  useEffect(() => {
    getUser()
    setTimeout(() => {
      setShowSpin(false);
    }, 1200);
  }, [id]);

  return (
    <>
      {showSpin ? (
        <Spiner />
      ) : (
        <div className="container">
          <Card className="card-profile shadow col-lg-6 mx-auto mt-5">
            <Card.Body>
              <Row>
                <div className="col">
                  <div className="card-profile-stats d-flex justify-content-center">
                    <img src={`${BASE_URL}/static/${userProfile.profile}`} alt="img" />
                  </div>
                </div>
              </Row>
            </Card.Body>
            <div className="text-center">
              <h3>{userProfile.fname} {userProfile.lname}</h3>
              <h4>
                <i className="fa-solid fa-envelope email"></i>&nbsp;:-{" "}
                <span>{userProfile.email}</span>
              </h4>
              <h5>
                <i className="fa-solid fa-mobile"></i>&nbsp;:-{" "}
                <span>{userProfile.mobile}</span>
              </h5>
              <h4>
                <i className="fa-solid fa-person"></i>&nbsp;:- <span>{userProfile.gender}</span>
              </h4>
              <h4>
                <i className="fa-solid fa-location-pin location"></i>&nbsp;:-
                <span>{userProfile.location}</span>
              </h4>
              <h4>
                Status&nbsp;:-<span>{userProfile.status}</span>
              </h4>
              <h5>
                <i className="fa-solid fa-calendar-days calendar"></i>&nbsp;Date
                Created&nbsp;:- <span>{moment(userProfile.dateCreated).format('DD-MM-YYYY')}</span>
              </h5>
              <h5>
                <i className="fa-solid fa-calendar-days calendar"></i>&nbsp;Date
                Updated&nbsp;:- <span>test</span>
              </h5>
            </div>
          </Card>
        </div>
      )}
    </>
  );
};

export default Profile;
