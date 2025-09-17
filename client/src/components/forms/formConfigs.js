import {
  loginValidationSchema,
  registrationValidationSchema,
  newListValidationSchema,
  newTaskValidationSchema,
} from "./validationSchemas";
// import {
//   login,
//   registration,
//   createList,
//   createTask,
// } from "../../services/api";
import {
  login,
  registration,
  createList,
  createTask,
} from "../../services/apiSwitcher";

export const authForms = {
  login: {
    title: "Login",
    fields: [
      { label: "Email", name: "email", placeholder: "user@taskly.com" },
      {
        label: "Password",
        name: "password",
        type: "password",
        placeholder: "******",
      },
    ],
    initialValues: { email: "", password: "" },
    api: login,
    validationSchema: loginValidationSchema,
    footerText: "Don't have an account? Register now.",
    switchTo: "registration",
  },
  registration: {
    title: "Registration",
    fields: [
      { label: "First Name", name: "firstName", placeholder: "John" },
      { label: "Last Name", name: "lastName", placeholder: "Smith" },
      { label: "Email", name: "email", placeholder: "john123@taskly.com" },
      {
        label: "Password",
        name: "password",
        type: "password",
        placeholder: "******",
      },
    ],
    initialValues: { firstName: "", lastName: "", email: "", password: "" },
    api: registration,
    validationSchema: registrationValidationSchema,
    footerText: "Are you already registered? Log in.",
    switchTo: "login",
  },
};

export const newListForm = {
  title: "New List",
  fields: [
    { label: "Name", name: "name", placeholder: "Example: Daily goals" },
  ],
  initialValues: { name: "" },
  api: createList,
  validationSchema: newListValidationSchema,
};

export const newTaskForm = {
  title: "Add new Task",
  fields: [
    {
      label: "Title",
      name: "title",
      placeholder: "Add title...",
      variant: "h6",
    },
    {
      label: "Description",
      name: "description",
      placeholder: "Add description...",
      variant: "body2",
      multiline: true,
    },
  ],
  initialValues: { title: "", description: "" },
  api: createTask,
  validationSchema: newTaskValidationSchema,
};
