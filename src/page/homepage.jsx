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
  console.log(isEdit);
  return (
    <section className="vh-100">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col">
            <div
              className="card"
              id="list1"
              style={{ borderRadius: ".75rem", backgroundColor: "#eff1f2" }}
            >
              <div className="card-body py-4 px-4 px-md-5">
                <p className="h1 text-center mt-3 mb-4 pb-3 text-primary">
                  <u>Task-Management System</u>
                </p>
                {isEdit.edit ? (
                  <TaskUpdate isEdit={isEdit} setEdit={setEdit} />
                ) : (
                  <TaskAdd />
                )}
                <hr className="my-4" />
                {globalData && globalData.length > 0 && (
                  <div className="task-header">
                    <div className="task-item">
                      <p className="lead fw-bold mb-0">Title</p>
                    </div>
                    <div className="task-item">
                      <p className="lead fw-bold mb-0 text-center">Status</p>
                    </div>
                    <div className="task-item">
                      <p className="lead fw-bold mb-0 text-center">Deadline</p>
                    </div>
                    <div className="task-item">
                      <p className="lead fw-bold mb-0 text-center">Created at</p>
                    </div>
                    <div className="task-item">
                      <p className="lead fw-bold mb-0 text-center">Actions</p>
                    </div>
                  </div>
                )}

                {globalData &&
                  globalData.map((data, index) => (
                    <div className="task-row" key={index}>
                      <div className="task-item task-title">
                        <h2 className="lead fw-bold mb-0">{data.title}</h2>
                        <p className="lead fw-normal fs-6 mb-0">
                          {data.description}
                        </p>
                      </div>
                      <div className="task-item task-status">
                        <p className="fs-6 mb-0" style={{color: data.status === "Completed" ? "green" : data.status === "In Progress" ? "orange" : "red" }}>{data.status}</p>
                      </div>
                      <div className="task-item task-deadline">
                        <div className="py-2 px-3 me-2 border border-warning rounded-3 d-flex align-items-center bg-body-tertiary">
                          <p className="small mb-0">
                            {data.deadline.split("T")[0]}
                          </p>
                        </div>
                      </div>
                      <div className="task-item task-createdAt">
                        <p className="small mb-0">
                          {data.createdAt.split("T")[0]}
                        </p>
                      </div>
                      <div className="task-item task-actions">
                        <div className="d-flex flex-row justify-content-end mb-1">
                          <button className="btn btn-sm btn-outline-danger me-2">
                            <TaskDelete id={data.id} isEdit={isEdit.edit}/>
                          </button>
                          <button className="btn btn-sm btn-outline-info">
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
    </section>
  );
};

export default Homepage;
