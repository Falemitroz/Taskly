import { useContext } from "react";
import { Formik, Field, ErrorMessage } from "formik";

import { AuthContext } from "../../helpers/AuthContext";
import { authForms, newListForm, newTaskForm } from "./formConfigs";
import { useFormHandler } from "../../hooks/useFormHandler";

import {
  Button,
  Typography,
  Dialog,
  TextField,
  Box,
  Tooltip,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import {
  FormDialogContent,
  FormContentWrapper,
  FormListItem,
} from "../../styles";

// ----------------------
// BaseForm
// ----------------------
const BaseForm = ({
  open,
  title,
  titleVariant = "h4",
  titleAlignment = "center",
  fields = [],
  initialValues,
  handleSubmit,
  onClose,
  validationSchema,
  footer,
}) => (
  <Dialog open={open} onClose={onClose}>
    <Box textAlign={titleAlignment} padding={2}>
      <Typography variant={titleVariant}>{title}</Typography>
    </Box>

    <FormDialogContent>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {({ errors, touched, status }) => (
          <FormContentWrapper>
            {status && (
              <Typography color="error" variant="body2">
                {status}
              </Typography>
            )}

            {fields.map(({ label, name, placeholder, type = "text" }) => (
              <Field
                key={name}
                as={TextField}
                label={label}
                name={name}
                type={type}
                placeholder={placeholder}
                error={touched[name] && Boolean(errors[name])}
                helperText={<ErrorMessage name={name} />}
                fullWidth
              />
            ))}

            {footer}
          </FormContentWrapper>
        )}
      </Formik>
    </FormDialogContent>
  </Dialog>
);

// ----------------------
// AuthForm
// ----------------------
export const AuthForm = ({ type }) => {
  const { setAuthForm } = useContext(AuthContext);

  const config = authForms[type];

  const onClose = () => setAuthForm("");

  const onSubmit = useFormHandler(config.api, {
    onSuccess: () => {
      onClose();
    },
    resetFields: (setFieldValue) => {
      setFieldValue("password", "");
      if (type === "registration") setFieldValue("email", "");
    },
  });

  return (
    <BaseForm
      key={type}
      open
      title={config.title}
      fields={config.fields}
      initialValues={config.initialValues}
      handleSubmit={onSubmit}
      onClose={onClose}
      validationSchema={config.validationSchema}
      footer={
        <>
          <Button type="submit" variant="contained" color="primary">
            {config.title}
          </Button>
          <Typography
            onClick={() => setAuthForm(config.switchTo)}
            sx={{ "&:hover": { textDecoration: "underline" } }}
          >
            {config.footerText}
          </Typography>
        </>
      }
    />
  );
};

// ----------------------
// New List Form
// ----------------------
export const NewListForm = ({
  showDialog,
  position,
  setLists,
  handleClose,
}) => {
  const config = newListForm;

  const onSubmit = useFormHandler(config.api, {
    onSuccess: (res) => {
      setLists((prevLists) =>
        position === "end" ? [...prevLists, res] : [res, ...prevLists]
      );
      handleClose();
    },
    resetFields: (setFieldValue) => setFieldValue("name", ""),
  });

  return (
    <BaseForm
      open={showDialog}
      title={config.title}
      fields={config.fields}
      initialValues={config.initialValues}
      handleSubmit={onSubmit}
      onClose={handleClose}
      validationSchema={config.validationSchema}
      footer={
        <div style={{ display: "flex", gap: 20, marginLeft: "auto" }}>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" variant="contained" color="primary">
            Confirm
          </Button>
        </div>
      }
    />
  );
};

// ----------------------
// New Task Form
// ----------------------
export const NewTaskForm = ({ listId, addTask }) => {
  const config = newTaskForm;

  const handleSubmit = async (values, { resetForm, setStatus }) => {
    if (!values.title.trim()) {
      setStatus("Title is required");
      return;
    }
    try {
      const newTask = await config.api(listId, {
        title: values.title.trim(),
        description: values.description.trim(),
        status: false,
      });
      addTask(newTask);
      resetForm();
    } catch (err) {
      console.error("Task creation error:", err);
      setStatus("Error creating task");
    }
  };

  return (
    <>
      <Typography variant="h6" color="primary">
        {config.title}
      </Typography>
      <FormListItem>
        <Formik
          initialValues={config.initialValues}
          validationSchema={config.validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, handleChange, handleBlur, submitForm, status }) => (
            <>
              <Tooltip title="Add Task">
                <IconButton onClick={submitForm}>
                  <AddIcon />
                </IconButton>
              </Tooltip>

              <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
                {status && (
                  <Typography color="error" variant="body2">
                    {status}
                  </Typography>
                )}

                {config.fields.map(({ name, placeholder, multiline }) => (
                  <TextField
                    key={name}
                    name={name}
                    value={values[name]}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder={placeholder}
                    variant="outlined"
                    multiline={multiline || false}
                    fullWidth
                    margin="dense"
                    sx={{
                      mb: 1,
                      "& .MuiOutlinedInput-root fieldset": {
                        borderBottomRightRadius:
                          name === "description" ? 70 : 4,
                      },
                    }}
                  />
                ))}
              </Box>
            </>
          )}
        </Formik>
      </FormListItem>
    </>
  );
};
