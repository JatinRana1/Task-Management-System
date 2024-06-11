import React, { useContext } from "react";
import { GlobalContext } from "../context/globalContext";
import "../index.css";
import TaskAdd from "../component/taskAdd";
import TaskDelete from "../component/taskDelete";
import TaskUpdate from "../component/taskUpdate";
import { FaEdit } from "react-icons/fa";
import Notification from "../notification/notification";

const Homepage = () => {
  const { globalData } = useContext(GlobalContext);
  const [isEdit, setEdit] = React.useState({ edit: false, id: "" });
  console.log(isEdit);
  return (
    <section className="vh-100" style={{ backgroundColor: "#D8EFD3" }}>
      <div className="container py-5">
        <div className="row d-flex justify-content-center align-items-center">
          <div className="col">
            <div
              className="card"
              id="list1"
              style={{ borderRadius: ".75rem", backgroundColor: "#95D2B3" }}
              >
              <div className="card-body py-4 px-4 px-md-5">
                <div className="d-flex justify-content-between align-items-center mt-3 mb-4 pb-3">
                <p
                  className="h1 fw-bold fs-1"
                  style={{ color: "#FFFFFF" }}
                  >
                  Task Management System
                </p>
                <span style={{backgroundColor: "#ffffff", height: "4rem", width: "4rem", borderRadius: "50%", display: "grid", placeItems: "center"}}>
                  <Notification />
                </span>
                </div>
                {isEdit.edit ? (
                  <TaskUpdate isEdit={isEdit} setEdit={setEdit} />
                ) : (
                  <TaskAdd />
                )}
                {globalData && globalData.length > 0 && (
                  <div className="task-header" style={{ color: "#FFFFFF" }}>
                    <div className="task-item">
                      <p className="lead fw-bold mb-0 fs-4">Title</p>
                    </div>
                    <div className="task-item">
                      <p className="lead fw-bold mb-0 fs-4 text-center">
                        Status
                      </p>
                    </div>
                    <div className="task-item">
                      <p className="lead fw-bold mb-0 fs-4 text-center">
                        Deadline
                      </p>
                    </div>
                    <div className="task-item">
                      <p className="lead fw-bold mb-0 fs-4 text-center">
                        Created at
                      </p>
                    </div>
                    <div className="task-item">
                      <p className="lead fw-bold mb-0 fs-4 text-center">
                        Actions
                      </p>
                    </div>
                  </div>
                )}
                <div style={{ height: "300px", overflow: "auto" }}>
                  {globalData &&
                    globalData.map((data, index) => (
                      <div
                        className="task-row"
                        key={index}
                        style={{
                          backgroundColor: "#FFFFFF",
                          borderRadius: ".75rem",
                          marginBlock: "10px",
                        }}
                      >
                        <div className="task-item task-title">
                          <h2
                            className="lead fw-bold mb-0"
                            style={{ color: "#55AD9B" }}
                          >
                            {data.title}
                          </h2>
                          <p
                            className="lead fw-normal fs-6 mb-0"
                            style={{ color: "#808080" }}
                          >
                            {data.description}
                          </p>
                        </div>
                        <div className="task-item task-status">
                          <p
                            className="fs-6 mb-0"
                            style={{
                              color:
                                data.status === "Completed"
                                  ? "green"
                                  : data.status === "In Progress"
                                  ? "#F6B26B"
                                  : "#E06666",
                            }}
                          >
                            {data.status}
                          </p>
                        </div>
                        <div className="task-item task-deadline">
                          <p className="small mb-0">
                            {data.deadline.split("T")[0]}
                          </p>
                        </div>
                        <div className="task-item task-createdAt">
                          <p className="small mb-0">
                            {data.createdAt.split("T")[0]}
                          </p>
                        </div>
                        <div className="task-item task-actions">
                          <div className="d-flex flex-row justify-content-end mb-1">
                            <button className="btn btn-md btn-outline-danger me-2" title="Delete">
                              <TaskDelete id={data.id} isEdit={isEdit.edit} />
                            </button>
                            <button className="btn btn-md btn-outline-info" title="Edit">
                              <FaEdit
                                onClick={() =>
                                  setEdit({ edit: true, id: data.id })
                                }
                              />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Homepage;
