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
    <div className="container mt-5">
      <form onSubmit={handleSubmit}>
        <div className="card">
          <div className="card-body">
            <div className="row mb-3">
              <div className="col-md-6">
                <input
                  type="text"
                  className={`form-control ${
                    touched.title && errors.title ? "is-invalid" : ""
                  }`}
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
                <div className="input-group">
                  <DatePicker
                    name="deadline"
                    selected={values.deadline}
                    onChange={(date) => setFieldValue("deadline", date)}
                    className={`form-control ${
                      touched.deadline && errors.deadline ? "is-invalid" : ""
                    }`}
                    placeholderText="Set due date"
                  />
                  {touched.deadline && errors.deadline ? (
                    <div className="invalid-feedback d-block">
                      {errors.deadline}
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="col-md-6">
                <select
                  name="status"
                  className={`form-select ${
                    touched.status && errors.status ? "is-invalid" : ""
                  }`}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.status}
                >
                  <option defaultValue={""} label="Select status" />
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
              <div className="d-flex justify-content-center text-end mt-3">
                <button type="submit" className="btn btn-primary">
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
