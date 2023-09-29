import React, { useContext, useEffect, useState } from "react";
import Select from "react-select";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Dropdown from "react-bootstrap/Dropdown";
import { ToastContainer, toast } from "react-toastify";

import {useNavigate} from "react-router-dom"

import "./register.css";
import img from "../../img/img1.png";
import Spiner from "../../components/Spiner/Spiner";

import { registerFunc } from "../../services/Apis";
import { addData } from "../../components/context/ContextProvider";

const Register = () => {

  const navigate = useNavigate()

  // const [selectedOption, setSelectedOption] = useState(null);
  const [showSpin, setShowSpin] = useState(true);

  const [status, setStatus] = useState("Active");
  const [image, setImage] = useState("");
  const [preview, setPreview] = useState("");

  // context API
  const {userAdd, setUserAdd} = useContext(addData)

  // for show image in home page
  useEffect(() => {
    if (image) {
      setPreview(URL.createObjectURL(image));
    }
    setTimeout(() => {
      setShowSpin(false);
    }, 1200);
  }, [image]);

  // Status select react-select
  const options = [
    { value: "Active", label: "Active" },
    { value: "InActive", label: "InActive" },
  ];
  // for capture data
  const [inputData, setInputData] = useState({
    fname: "",
    lname: "",
    email: "",
    mobile: "",
    gender: "",
    user_profile: "",
    location: "",
  });
  // For capture data
  const setInputValue = (e) => {
    const { name, value } = e.target;
    setInputData({ ...inputData, [name]: value });
    console.log(value);
  };
  // for capture value of status (react-select)
  const setStatusValue = (e) => {
    setStatus(e.value);
    // console.log(e) // {value: 'Active', label: 'Active'}
  };
  // ☝🏻 👇🏻on peut utiliser soit setStatusValue ou handleChange
  // const handleChange = (selectedOption) => {
  //   setSelectedOption(selectedOption);
  //   console.log(selectedOption);
  // };

  // capture image profile
  const setProfile = (e) => {
    setImage(e.target.files[0]);
    // console.log(e)
  };

  // for validation email
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

  // For submit Data
  const submitUserData = async (e) => {
    e.preventDefault();
    const { fname, lname, email, mobile, gender, location } =
      inputData;
    if (fname === "") {
      return toast.error("First name is Required");
    } else if (lname === "") {
      return toast.error("Last name is Required");
    } else if (!emailRegex.test(email)) {
      //if false run this condition
      return toast.error("Format of email is invalid");
    } else if (mobile.length > 10) {
      return toast.error("Enter Valid Mobile Number");
    } else if (gender === "") {
      return toast.error("Gender is Required");
    } else if (status === "") {
      return toast.error("Status is Required");
    } else if (image === "") {
      return toast.error("Profile image is Required");
    } else if (location === "") {
      return toast.error("Location is Required");
    } else {
      // toast.success("Registration successfully done.");
      const data = new FormData();
      data.append("fname", fname);
      data.append("lname", lname);
      data.append("email", email);
      data.append("mobile", mobile);
      data.append("gender", gender);
      data.append("status", status);
      // user_profile est le nom de l'image dans le backend
      data.append("user_profile", image);
      data.append("location", location);

      const config = {
        "Content-Type": "multipart/form-data",
      };

      const response = await registerFunc(data, config);
      console.log(response); //if success it return 201
      if(response.status === 201) {
        setInputData({
          fname: "",
          lname: "",
          email: "",
          mobile: "",
          gender: "",
          user_profile: "",
          location: "",
        });
        setStatus("");
        setImage("");        
        setUserAdd(response.data)
        navigate("/");
      }else{
        toast.error("Error!")
      }
    }
  };

  return (
    <>
      {showSpin ? (
        <Spiner />
      ) : (
        <div className="container">
          <h2 className="text-center mt-1">Register Your Details</h2>
          <Card className="shadow mt-3 p-3">
            <div className="profile-div text-center">
              <img src={preview ? preview : img} alt="icon" />
            </div>

            {/* Form Data */}
            <Form>
              <Row>
                <Form.Group
                  className="mb-3 col-lg-6"
                  controlId="formBasicEmail"
                >
                  <Form.Label>First name</Form.Label>
                  <Form.Control
                    type="text"
                    name="fname"
                    value={inputData.fname}
                    placeholder="Enter FirstName"
                    onChange={setInputValue}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3 col-lg-6"
                  controlId="formBasicEmail"
                >
                  <Form.Label>Last name</Form.Label>
                  <Form.Control
                    type="text"
                    name="lname"
                    value={inputData.lname}
                    placeholder="Enter LastName"
                    onChange={setInputValue}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3 col-lg-6"
                  controlId="formBasicEmail"
                >
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={inputData.email}
                    placeholder="Enter Email"
                    onChange={setInputValue}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3 col-lg-6"
                  controlId="formBasicEmail"
                >
                  <Form.Label>Mobile</Form.Label>
                  <Form.Control
                    type="text"
                    name="mobile"
                    value={inputData.mobile}
                    placeholder="Enter Mobile"
                    onChange={setInputValue}
                  />
                </Form.Group>
                <Form.Group className="mb-3 col-lg-6">
                  <label htmlFor="">Select Your Gender</label>
                  <div>
                    <Form.Check
                      type="radio"
                      id="maleRadio"
                      name="gender"
                      label="Male"
                      value="Male"
                      onChange={setInputValue}
                    />
                  </div>
                  <div>
                    <Form.Check
                      type="radio"
                      id="femaleRadio"
                      name="gender"
                      label="Female"
                      value="Female"
                      onChange={setInputValue}
                    />
                  </div>
                </Form.Group>
                <Form.Group className="mb-3 col-lg-6">
                  <Form.Label>Select your Status</Form.Label>
                  <Select
                    // value={selectedOption} //don't use this ligne
                    // onChange={handleChange}
                    onChange={setStatusValue}
                    options={options}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3 col-lg-6"
                  controlId="formBasicEmail"
                >
                  <Form.Label>Select your Profile</Form.Label>
                  <Form.Control
                    type="file"
                    name="user_profile"
                    placeholder="Enter your Profile"
                    onChange={setProfile}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3 col-lg-6"
                  controlId="formBasicEmail"
                >
                  <Form.Label>Enter your Location</Form.Label>
                  <Form.Control
                    type="text"
                    name="location"
                    value={inputData.location}
                    placeholder="Enter your Location"
                    onChange={setInputValue}
                  />
                </Form.Group>
                <Button
                  onClick={submitUserData}
                  variant="primary"
                  type="submit"
                >
                  Submit
                </Button>
              </Row>
            </Form>
          </Card>
          <ToastContainer position="top-right" />
        </div>
      )}
    </>
  );
};

export default Register;

// ----------------------------------------------
