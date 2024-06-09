// src/validationSchema.js
import * as Yup from 'yup';

const today = new Date();
const todayString = today.toISOString().split('T')[0];

export const taskValidationSchema = Yup.object().shape({
  title: Yup.string()
    .required('Title is required')
    .max(50, 'Title cannot be more than 50 characters'),
  description: Yup.string()
    .required('Description is required')
    .max(200, 'Description cannot be more than 200 characters'),
  deadline: Yup.date()
    .required('Deadline is required')
    .min(todayString, 'Deadline cannot be in the past'),
  status: Yup.string()
    .required('Status is required')
    .oneOf(['Pending', 'In Progress', 'Completed'], 'Invalid status')
});
