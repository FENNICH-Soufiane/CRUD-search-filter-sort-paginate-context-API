import React, { useEffect, useState } from "react";
import Select from "react-select";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Dropdown from "react-bootstrap/Dropdown";
import { ToastContainer, toast } from "react-toastify";

import "./register.css";
import img from "../../img/img1.png";

const Register = (title) => {
//   const [selectedOption, setSelectedOption] = useState(null);

//   const [status, setStatus] = useState("Active");
//   const [image, setImage] = useState("");
//   const [preview, setPreview] = useState("");

//   // for show image in home page
//   useEffect(() => {
//     if (image) {
//       setPreview(URL.createObjectURL(image));
//     }
//   }, [image]);

//   // Status select react-select
//   const options = [
//     { value: "Active", label: "Active" },
//     { value: "InActive", label: "InActive" },
//   ];
//   // for capture data
//   const [inputData, setInputData] = useState({
//     fname: "",
//     lname: "",
//     email: "",
//     mobile: "",
//     gender: "",
//     user_profile: "",
//     location: "",
//   });
//   // For capture data
//   const setInputValue = (e) => {
//     const { name, value } = e.target;
//     setInputData({ ...inputData, [name]: value });
//     console.log(value);
//   };
//   // for capture value of status (react-select)
//   const setStatusValue = (e) => {
//     setStatus(e.value);
//     // console.log(e) // {value: 'Active', label: 'Active'}
//   };
//   // ☝🏻 👇🏻on peut utiliser soit setStatusValue ou handleChange
//   const handleChange = (selectedOption) => {
//     setSelectedOption(selectedOption);
//     console.log(selectedOption);
//   };

//   // capture image profile
//   const setProfile = (e) => {
//     setImage(e.target.files[0]);
//     // console.log(e)
//   };

//   // for validation email
//   const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

//   // For submit Data
//   const submitUserData = (e) => {
//     e.preventDefault();
//     const { fname, lname, email, mobile, gender, user_profile, location } =
//       inputData;
//     if (fname === "") {
//       toast.error("First name is Required");
//     } else if (lname === "") {
//       toast.error("Last name is Required");
//     } else if (!emailRegex.test(email)) {
//       //if false run this condition
//       toast.error("Format of email is invalid");
//     } else if (mobile.length > 10) {
//       toast.error("Enter Valid Mobile Number");
//     } else if (gender === "") {
//       toast.error("Gender is Required");
//     } else if (status === "") {
//       toast.error("Status is Required");
//     } else if (image === "") {
//       toast.error("Profile image is Required");
//     } else if (location === "") {
//       toast.error("Location is Required");
//     } else {
//       toast.success("Registration successfully done.");
//     }
//   };
    
  return (
    <>
      <div className="container">
        <h2 className="text-center mt-1">{title}</h2>
        <Card className="shadow mt-3 p-3">
          <div className="profile-div text-center">
            <img src={preview ? preview : img} alt="icon" />
          </div>

          {/* Form Data */}
          <Form>
            <Row>
              <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                <Form.Label>First name</Form.Label>
                <Form.Control
                  type="text"
                  name="fname"
                  value={inputData.fname}
                  placeholder="Enter FirstName"
                  onChange={setInputValue}
                />
              </Form.Group>
              <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                <Form.Label>Last name</Form.Label>
                <Form.Control
                  type="text"
                  name="lname"
                  value={inputData.lname}
                  placeholder="Enter LastName"
                  onChange={setInputValue}
                />
              </Form.Group>
              <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={inputData.email}
                  placeholder="Enter Email"
                  onChange={setInputValue}
                />
              </Form.Group>
              <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
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
                  // value={selectedOption}
                  // onChange={handleChange}
                  value={status}
                  onChange={setStatusValue}
                  options={options}
                />
              </Form.Group>
              <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                <Form.Label>Select your Profile</Form.Label>
                <Form.Control
                  type="file"
                  name="user_profile"
                  placeholder="Enter your Profile"
                  onChange={setProfile}
                />
              </Form.Group>
              <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                <Form.Label>Enter your Location</Form.Label>
                <Form.Control
                  type="text"
                  name="location"
                  value={inputData.location}
                  placeholder="Enter your Location"
                  onChange={setInputValue}
                />
              </Form.Group>
              <Button onClick={submitUserData} variant="primary" type="submit">
                Submit
              </Button>
            </Row>
          </Form>
        </Card>
        <ToastContainer position="top-right" />
      </div>
    </>
  );
};

export default Register;
