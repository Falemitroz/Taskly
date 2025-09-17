import { styled } from "@mui/material/styles";
import { DialogContent, ListItem } from "@mui/material";
import { Form } from "formik";

export const FormDialogContent = styled(DialogContent)(({ theme }) => ({
  width: 400,

  // Responsibility
  [theme.breakpoints.down("sm")]: {
    width: 320,
  },
}));

export const FormContentWrapper = styled(Form)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: theme.spacing(2),
  padding: theme.spacing(2),
}));

export const FormListItem = styled(ListItem)(({ theme }) => ({
  borderBottomRightRadius: theme.spacing(7),
  borderBottom: "5px solid",
  borderBottomColor: theme.palette.border.card,
  backgroundColor: theme.palette.cardButton.newTask.main,
  "&:hover": { backgroundColor: theme.palette.cardButton.newTask.hover },
}));
