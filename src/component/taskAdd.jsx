import React, { useContext } from "react";
import { useFormik } from "formik";
import { taskValidationSchema } from "../schema/taskSchema";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { GlobalContext } from "../context/globalContext";


const TaskAdd = () => {
  const { getGlobalData } = useContext(GlobalContext);

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
    resetForm,
  } = useFormik({
    initialValues: {
      title: "",
      description: "",
      deadline: null,
      status: "",
    },
    validationSchema: taskValidationSchema,
    onSubmit: async (values) => {
      try {
        const res = await axios.post(
          "http://localhost:4000/task/create",
          values
        );
        getGlobalData();
        resetForm();
      } catch (error) {
        console.log(error.message);
      }
    },
  });

  return (
    <div className="container my-4">
      <form onSubmit={handleSubmit}>
        <div className="card" style={{backgroundColor: "#D8EFD3"}}>
          <div className="card-body">
            <div className="row mb-3">
              <div className="col-md-6">
                <input
                  type="text"
                  className={`form-control ${
                    touched.title && errors.title ? "is-invalid" : ""
                  }`}
                  style={{ backgroundColor: "#FFFFFF" }}
                  placeholder="Enter title..."
                  name="title"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.title}
                />
                {touched.title && errors.title ? (
                  <div className="invalid-feedback">{errors.title}</div>
                ) : null}
              </div>
              <div className="col-md-6">
                <input
                  type="text"
                  className={`form-control ${
                    touched.description && errors.description
                      ? "is-invalid"
                      : ""
                  }`}
                  style={{ backgroundColor: "#FFFFFF" }}
                  placeholder="Enter description..."
                  name="description"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.description}
                />
                {touched.description && errors.description ? (
                  <div className="invalid-feedback">{errors.description}</div>
                ) : null}
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-6">
                  <DatePicker
                    name="deadline"
                    selected={values.deadline}
                    onChange={(date) => setFieldValue("deadline", date)}
                    className={`form-control ${
                      touched.deadline && errors.deadline ? "is-invalid" : ""
                    }`}
                    showTimeSelect  
                    dateFormat="Pp"
                    placeholderText="Set deadline"
                    autoComplete="off"
                  />
                  {touched.deadline && errors.deadline ? (
                    <div className="invalid-feedback d-block">
                      {errors.deadline}
                    </div>
                  ) : null}
                </div>
              <div className="col-md-6">
                <select
                  name="status"
                  className={`form-select ${
                    touched.status && errors.status ? "is-invalid" : ""
                  }`}
                  style={{ backgroundColor: "#FFFFFF"}}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.status}
                >
                  <option defaultValue={""} label="Select status"/>
                  <option value="Pending" label="Pending" />
                  <option value="In Progress" label="In Progress" />
                  <option value="Completed" label="Completed" />
                </select>
                {touched.status && errors.status ? (
                  <div className="invalid-feedback">{errors.status}</div>
                ) : null}
              </div>
            </div>

            <div className="row">
              <div className="d-flex justify-content-end text-end">
                <button type="submit" className="btn fw-bold primaryBtn" style={{backgroundColor: "#95D2B3", color: "#F1F8E8", border: "2px solid #F1F8E8"}}>
                  Add Task
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default TaskAdd;
