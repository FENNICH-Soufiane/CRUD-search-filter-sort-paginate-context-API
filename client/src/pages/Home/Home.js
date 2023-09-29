import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Dropdown from "react-bootstrap/Dropdown";
import Spiner from "../../components/Spiner/Spiner";
import Alert from "react-bootstrap/Alert";
import { ToastContainer, toast } from "react-toastify";

import "./home.css";
import Tables from "../../components/Tables/Tables";
import {
  addData,
  deleteData,
  updateData,
} from "../../components/context/ContextProvider";
import { deleteFun, exportToCsvFunc, usergetFunc } from "../../services/Apis";

const Home = () => {
  const navigate = useNavigate();
  const adduser = () => {
    navigate("/register");
  };
  const [userdata, setUserdata] = useState([]);
  const [showSpin, setShowSpin] = useState(true);
  const [search, setSearch] = useState("");
  const [gender, setGender] = useState("All");
  const [status, setStatus] = useState("All");
  const [sort, setSort] = useState("new");
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);

  const { userAdd, setUserAdd } = useContext(addData);
  const { userUpdate, setUserUpdate } = useContext(updateData);
  const { userDelete, setUserDelete } = useContext(deleteData);

  const [show, setShow] = useState(true);

  // Get User
  const userGet = async () => {
    const response = await usergetFunc(search, gender, status, sort, page);
    // console.log(response)
    if (response.status === 200) {
      console.log(response);
      setUserdata(response.data.userData);
      setPageCount(response.data.Pagination.pageCount);
    } else {
      console.log("error for get user data");
    }
  };

  // Delete User
  const deleteUser = async (id) => {
    console.log(id);
    const response = await deleteFun(id);
    console.log(response);
    if (response.status === 200) {
      setUserDelete(response.data.deleteUser);
      userGet();
    } else {
      console.log("error");
    }
  };

  // export User
  const exportUser = async () => {
    const response = await exportToCsvFunc();
    if (response.status === 200) {
      window.open(response.data.downloadUrl, "blank");
    } else {
      toast.error("Error to download file csv");
    }
    // console.log(response);
  };

  // pagiantion
  // handle prev btn
  const handlePrevious = () => {
    setPage(() => {
      if (page === 1) return page;
      return page - 1;
    });
  };
  const handleNext = () => {
    setPage(() => {
      if (page === pageCount) return page;
      return page + 1;
    });
  };

  useEffect(() => {
    userGet();
    setTimeout(() => {
      setShowSpin(false);
    }, 1200);
  }, [search, gender, status, sort, page]);

  return (
    <>
      {userAdd ? (
        <Alert variant="success" onClose={() => setShow(false)} dismissible>
          {userAdd.data?.fname.toUpperCase()} Added Successfully
        </Alert>
      ) : null}
      {userUpdate ? (
        <Alert variant="primary" onClose={() => setShow(false)} dismissible>
          {userUpdate?.fname.toUpperCase()} Updated Successfully
        </Alert>
      ) : null}
      {userDelete ? (
        <Alert variant="danger" onClose={() => setShow(false)} dismissible>
          {userDelete?.fname?.toUpperCase()} Deleted Successfully
        </Alert>
      ) : null}
      <div className="container">
        <div className="main_div">
          {/* search add btn */}
          <div className="search_add mt-4 d-flex justify-content-between">
            <div className="search col-lg-4">
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                  onChange={(e) => setSearch(e.target.value)}
                />
                <Button className="search_btn" variant="success">
                  {/* class search_btn */}
                  Search
                </Button>
              </Form>
            </div>
            <div className="add_btn">
              <Button variant="primary" onClick={adduser}>
                {" "}
                <i className="fa-solid fa-plus"></i>&nbsp; Add User
              </Button>
            </div>
          </div>
          {/* export, gender, status */}
          <div className="filter_div mt-5 d-flex justify-content-between flex-wrap">
            <div className="export_csv">
              <Button className="export_btn" onClick={exportUser}>
                {" "}
                <i className="fa-solid fa-plus"></i>&nbsp; Export To Csv
              </Button>
            </div>
            <div className="filter_gender">
              <div className="filter">
                <h3>Filter By Gender</h3>
                <div className="gender d-flex justify-content-between">
                  <Form.Check
                    type="radio"
                    id="allRadio"
                    name="gender"
                    label="All"
                    value="All"
                    defaultChecked
                    onChange={(e) => setGender(e.target.value)}
                  />
                  <Form.Check
                    type="radio"
                    id="femaleRadio"
                    name="gender"
                    label="Female"
                    value="Female"
                    onChange={(e) => setGender(e.target.value)}
                  />
                  <Form.Check
                    type="radio"
                    id="maleRadio"
                    name="gender"
                    label="Male"
                    value="Male"
                    onChange={(e) => setGender(e.target.value)}
                  />
                </div>
              </div>
            </div>
            {/* sort by value */}
            <div className="filter_newold">
              <h3>Sort by Value</h3>
              <Dropdown className="text-center">
                <Dropdown.Toggle className="dropdown_btn" id="dropdown-basic">
                  <i className="fa-solid fa-sort"></i>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => setSort("new")}>
                    New
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => setSort("old")}>
                    Old
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
            {/* filter by status */}
            <div className="filter_status">
              <div className="status">
                <h3>Filter by Status</h3>
                <div className="status_radio d-flex justify-content-between flex-wrap">
                  <Form.Check
                    type="radio"
                    id="allRadio"
                    name="status"
                    label="All"
                    value="All"
                    defaultChecked
                    onChange={(e) => setStatus(e.target.value)}
                  />
                  <Form.Check
                    type="radio"
                    id="ActiveRadio"
                    name="status"
                    label="Active"
                    value="Active"
                    onChange={(e) => setStatus(e.target.value)}
                  />
                  <Form.Check
                    type="radio"
                    id="InActiveRadio"
                    name="status"
                    label="InActive"
                    value="InActive"
                    onChange={(e) => setStatus(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {showSpin ? (
          <Spiner />
        ) : (
          <Tables
            userdata={userdata}
            deleteUser={deleteUser}
            userGet={userGet}
            handlePrevious={handlePrevious}
            handleNext={handleNext}
            page={page}
            pageCount={pageCount}
            setPage={setPage}
          />
        )}
      </div>
      <ToastContainer />
    </>
  );
};

export default Home;
