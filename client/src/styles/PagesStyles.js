import { styled } from "@mui/material/styles";
import {
  Typography,
  Box,
  Paper,
  Grid,
  IconButton,
  DialogContent,
  Avatar,
  Button,
} from "@mui/material";

// .----------------------------------------------.
// |                     Home                     |
// '----------------------------------------------'
export const HomeHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "1rem",
  padding: theme.spacing(3),
  border: "4px dashed",
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  borderColor: theme.palette.border.default,

  maxWidth: "80%",
  margin: "10rem auto",

  // Responsibility
  [theme.breakpoints.down("sm")]: {
    textAlign: "center",
    margin: "2rem auto 0 auto",
  },
}));

export const HomeHeaderTitle = styled(Typography)(({ theme }) => ({
  fontSize: theme.typography.h1.fontSize,

  // Responsibility
  [theme.breakpoints.down("sm")]: {
    fontSize: theme.typography.h3.fontSize,
  },
}));

export const FeatureContainer = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(6),
  minHeight: "100vh",
}));

export const FeatureContainerTitle = styled(Typography)(({ theme }) => ({
  fontSize: theme.typography.h3.fontSize,

  // Responsibility
  [theme.breakpoints.down("sm")]: {
    fontSize: theme.typography.h4.fontSize,
  },
}));

export const Feature = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  height: "10rem",
}));

export const LinkButtonContainer = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  width: "max-content",
  margin: "2rem auto",
}));

export const LinkButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  fontSize: theme.typography.h5.fontSize,
  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: theme.typography.h6.fontSize,
    padding: theme.spacing(1, 2),
  },
}));

// .-----------------------------------------------.
// |                   Dashboard                   |
// '-----------------------------------------------'
export const ListContainer = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(6),
  minHeight: "100vh",
  justifyContent: "center",
  alignItems: "flex-start",
}));

// .-----------------------------------------------.
// |                    Profile                    |
// '-----------------------------------------------'
export const ProfileWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  minHeight: "100vh",
  gap: theme.spacing(5),
  background: "inherit",
}));

export const ProfileAvatar = styled(Avatar)(({ theme }) => ({
  width: 300,
  height: 300,
  position: "relative",
  "&::after": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    border: "8px solid",
    borderColor: theme.palette.border.card,
    borderRadius: "50%",
    pointerEvents: "none",
    boxSizing: "border-box",
  },

  // Responsibility
  [theme.breakpoints.down("sm")]: {
    width: 150,
    height: 150,
    "&::after": {
      border: "5px solid",
      borderColor: theme.palette.border.card,
    },
  },
}));

export const ProfileDialog = styled(DialogContent)(() => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  marginLeft: "auto",
}));

export const ProfileDialogAction = styled(DialogContent)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-around",
  gap: theme.spacing(2),
}));

export const ProfileDialogButton = styled(IconButton)(({ variant, theme }) => ({
  color: theme.palette.dialogIconButton.iconColor,
  backgroundColor:
    variant === "delete"
      ? theme.palette.dialogIconButton.delete.background
      : theme.palette.dialogIconButton.edit.background,
  "&:hover": {
    backgroundColor:
      variant === "delete"
        ? theme.palette.dialogIconButton.delete.hover
        : theme.palette.dialogIconButton.edit.hover,
  },
}));

export const InfoWrapper = styled(Grid)(({ theme }) => ({
  width: 350,
  padding: theme.spacing(3),
  gap: theme.spacing(2),
  background: theme.palette.background.paper,

  // Responsibility
  [theme.breakpoints.down("sm")]: {
    width: "80%",
  },
}));

export const ProfileTitle = styled(Typography)(({ theme }) => ({
  fontSize: theme.typography.h2.fontSize,
  fontWeight: theme.typography.h4.fontWeight,

  // Responsibility
  [theme.breakpoints.down("sm")]: {
    fontSize: theme.typography.h4.fontSize,
  },
}));
