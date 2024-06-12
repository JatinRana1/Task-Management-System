import React, { useContext } from "react";
import { GlobalContext } from "../context/globalContext";
import "../index.css";
import TaskAdd from "../component/taskAdd";
import TaskDelete from "../component/taskDelete";
import TaskUpdate from "../component/taskUpdate";
import { FaEdit } from "react-icons/fa";

const Homepage = () => {
  const { globalData } = useContext(GlobalContext);
  const [isEdit, setEdit] = React.useState({ edit: false, id: "" });

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
                  <p className="h1 fw-bold fs-1" style={{ color: "#FFFFFF" }}>
                    Task Management System
                  </p>
                  <img
                    src="public/profilePic.jpg"
                    alt="Profile Picture"
                    style={{
                      height: "4rem",
                      width: "3.5rem",
                      borderRadius: "50%",
                    }}
                    title="Profile Picture"
                  />
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
                    globalData.map((data, index) => {
                      // Parse the createdAt and deadline datetime strings
                      const createdAtDate = new Date(data.createdAt);
                      const deadlineDate = data.deadline
                        ? new Date(data.deadline)
                        : null;

                      // Format the date parts
                      const createdAtFormattedDate =
                        createdAtDate.toLocaleDateString();
                      const deadlineFormattedDate = deadlineDate
                        ? deadlineDate.toLocaleDateString()
                        : null;

                      // Format the time parts
                      const createdAtFormattedTime =
                        createdAtDate.toLocaleTimeString();
                      const deadlineFormattedTime = deadlineDate
                        ? deadlineDate.toLocaleTimeString()
                        : null;

                      return (
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
                              style={{
                                color: "#808080",
                                wordBreak: "break-all",
                              }}
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
                              {deadlineFormattedDate
                                ? `${deadlineFormattedDate} at ${deadlineFormattedTime}`
                                : "No Deadline"}
                            </p>
                          </div>
                          <div className="task-item task-createdAt">
                            <p className="small mb-0">
                              {`${createdAtFormattedDate}`}
                            </p>
                          </div>
                          <div className="task-item task-actions">
                            <div className="d-flex flex-row justify-content-end mb-1">
                              <button
                                className="btn btn-md btn-outline-danger me-2"
                                title="Delete"
                              >
                                <TaskDelete id={data.id} isEdit={isEdit.edit} />
                              </button>
                              <button
                                className="btn btn-md btn-outline-info"
                                title="Edit"
                                onClick={() =>
                                  setEdit({ edit: true, id: data.id })
                                }
                              >
                                <FaEdit />
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
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
