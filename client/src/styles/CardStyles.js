import { styled } from "@mui/material/styles";
import {
  Box,
  IconButton,
  Card,
  CardMedia,
  Button,
  CardContent,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

// .----------------------------------------------.
// |                  Components                  |
// '----------------------------------------------'
export const CardWrapper = styled(Card)(({ theme }) => ({
  position: "relative",
  width: 350,
  borderTopLeftRadius: 70,
  borderBottomRightRadius: 70,

  [theme.breakpoints.down("sm")]: {
    width: 300,
  },
}));

export const CardImage = styled(CardMedia)(({ theme }) => ({
  height: 200,
}));

export const ImageContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  borderBottom: "8px double",
  borderColor: theme.palette.border.card,
}));

export const EditButton = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  top: 8,
  right: 8,
  backgroundColor: theme.palette.cardButton.primary,
  color: "white",
  zIndex: 2,
  transition: "background-color 0.3s ease",
  "&:hover": { backgroundColor: theme.palette.cardButton.secondary },
}));

export const DeleteImageButton = styled(IconButton, {
  shouldForwardProp: (prop) => prop !== "visible",
})(({ visible, theme }) => ({
  position: "absolute",
  top: 8,
  right: 56,
  backgroundColor: theme.palette.cardButton.primary,
  color: "white",
  zIndex: 2,
  opacity: visible ? 1 : 0,
  transform: visible ? "translateX(0)" : "translateX(20px)",
  pointerEvents: visible ? "auto" : "none",
  transition: "opacity 0.3s ease, transform 0.3s ease",
  "&:hover": { backgroundColor: theme.palette.cardButton.secondary },
}));

export const DeleteListButtonWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  paddingBottom: theme.spacing(2),
}));

export const DeleteListButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== "visible",
})(({ visible, theme }) => ({
  display: visible ? "block" : "none",
  backgroundColor: theme.palette.cancel.main,
  color: theme.palette.cancel.contrastText,
}));

export const CardTitleContainer = styled(CardContent)(({ theme }) => ({
  borderBottom: "3px solid",
  borderBottomColor: theme.palette.border.card,
  paddingBottom: 20,
}));

export const CardTasksWrapper = styled(Box)(({ theme }) => ({
  height: "15rem",
  overflow: "scroll",
}));

export const BlurWrapper = styled(Card)(({ theme }) => ({
  filter: "blur(4px)",
  cursor: "pointer",
}));

export const ButtonOnBlur = styled(Button)(({ theme }) => ({
  position: "absolute",
  inset: 0,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: 0,
  borderTopLeftRadius: 70,
  zIndex: 1,
  "&:hover": { backgroundColor: theme.palette.cardButton.primary },
}));

export const ButtonOnBlurIcon = styled(AddCircleOutlineIcon)(({ theme }) => ({
  fontSize: 100,
  color: theme.palette.cardButton.secondary,
}));
