import React from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Table from "react-bootstrap/Table";
import Dropdown from "react-bootstrap/Dropdown";
import { NavLink } from "react-router-dom";
import { BASE_URL } from "../../services/helper";
import { changeStatusFun } from "../../services/Apis";
import { ToastContainer, toast } from "react-toastify";
import "./table.css";

import Paginations from "../../components/Pagination/Pagination";
import img from "../../img/img1.png";

const Tables = ({
  userdata,
  deleteUser,
  userGet,
  handlePrevious,
  handleNext,
  page,
  pageCount,
  setPage,
}) => {
  const handleChange = async (id, status) => {
    const response = await changeStatusFun(id, status);
    // console.log(id, status);
    if (response.status === 200) {
      userGet();
      toast.success("Status Updated Successfully");
    } else {
      toast.error("Error in update status");
    }
  };
  return (
    <>
      <div className="container">
        <Row>
          <div className="col mt-0">
            <Card className="shadow">
              <Table className="align-items-center" responsive="sm">
                {/* class thead-dark is breaking i use table-dark */}
                <thead className="table-dark">
                  <tr className="table-dark">
                    <th>ID</th>
                    <th>FullName</th>
                    <th>Email</th>
                    <th>Gender</th>
                    <th>Status</th>
                    <th>Profile</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {userdata.length > 0 ? (
                    userdata.map((element, index) => {
                      return (
                        <tr key={index}>
                         <td>{index + 1 + (page - 1)*4}</td>  {/* 4 vient de item_per_page dans userController */}
                          <td>
                            {element.fname} {element.lname}
                          </td>
                          <td>{element.email}</td>
                          <td>{element.gender === "Male" ? "M" : "F"}</td>
                          <td>
                            <Dropdown className="text-center">
                              <Dropdown.Toggle
                                className="dropdown_btn"
                                id="dropdown-basic"
                              >
                                <span
                                  className={`badge ${
                                    element.status == "Active"
                                      ? "text-bg-primary"
                                      : "text-bg-danger"
                                  }`}
                                >
                                  {element.status}{" "}
                                  <i className="fa-solid fa-angle-down"></i>
                                </span>
                              </Dropdown.Toggle>
                              <Dropdown.Menu>
                                <Dropdown.Item
                                  onClick={() =>
                                    handleChange(element._id, "Active")
                                  }
                                >
                                  Active
                                </Dropdown.Item>
                                <Dropdown.Item
                                  onClick={() =>
                                    handleChange(element._id, "InActive")
                                  }
                                >
                                  InActive
                                </Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                          </td>
                          <td className="img_parent">
                            <img
                              src={`${BASE_URL}/static/${element.profile}`}
                              alt="img_profile"
                            />
                          </td>
                          <td>
                            <Dropdown className="text-center">
                              <Dropdown.Toggle
                                className="dropdown_btn"
                                id="dropdown-basic"
                                variant="light"
                              >
                                <i className="fa-solid fa-ellipsis-vertical"></i>
                              </Dropdown.Toggle>
                              <Dropdown.Menu>
                                <Dropdown.Item>
                                  <NavLink
                                    to={`/userprofile/${element._id}`}
                                    className="text-decoration-none"
                                  >
                                    <i
                                      className="fa-solid fa-eye"
                                      style={{ color: "green" }}
                                    ></i>
                                    <span>View</span>
                                  </NavLink>
                                </Dropdown.Item>
                                <Dropdown.Item>
                                  <NavLink
                                    to={`/edit/${element._id}`}
                                    className="text-decoration-none"
                                  >
                                    <i
                                      className="fa-solid fa-pen-to-square"
                                      style={{ color: "blue" }}
                                    ></i>
                                    <span>Edit</span>
                                  </NavLink>
                                </Dropdown.Item>
                                <Dropdown.Item>
                                  <div onClick={() => deleteUser(element._id)}>
                                    <i
                                      className="fa-solid fa-trash"
                                      style={{ color: "red" }}
                                    ></i>
                                    <span>Delete</span>
                                  </div>
                                </Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <div>No Data Found</div>
                  )}
                </tbody>
              </Table>
              <Paginations
                handlePrevious={handlePrevious}
                handleNext={handleNext}
                page={page}
                pageCount={pageCount}
                setPage={setPage}
              />
            </Card>
          </div>
        </Row>
        <ToastContainer />
      </div>
    </>
  );
};

export default Tables;
