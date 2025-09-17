import * as Yup from "yup";

export const loginValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Please enter your email"),
  password: Yup.string().required("Password is required"),
});

export const registrationValidationSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(3, "The First Name must be at least 3 characters long")
    .max(15, "The First Name can have a maximum of 15 characters")
    .required("The First Name is required"),

  lastName: Yup.string()
    .min(3, "The Last Name must be at least 3 characters long")
    .max(15, "The Last Name can have a maximum of 15 characters")
    .required("The Last Name is required"),

  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Email is required"),

  password: Yup.string()
    .min(4, "Password must be at least 4 characters long")
    .required("Password is required"),
});

export const newListValidationSchema = Yup.object().shape({
  name: Yup.string()
    .max(26, "The Name can have a maximum of 26 characters")
    .required("The name is required"),
});

export const newTaskValidationSchema = Yup.object().shape({
  title: Yup.string().max(50, "The Title can have a maximum of 50 characters"),
});
