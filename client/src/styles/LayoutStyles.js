import { styled } from "@mui/material/styles";
import { Typography, Menu, Box } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

// .----------------------------------------------.
// |                    Navbar                    |
// '----------------------------------------------'
export const NavbarContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
  padding: theme.spacing(1.5, 4),
  backgroundColor: theme.palette.primary.main,
  borderBottom: "2px solid",
  borderBottomColor: theme.palette.border,

  // Responsibility
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(0.5),
  },
}));

export const Logo = styled(Typography)(({ theme }) => ({
  mr: theme.spacing(2),
  display: { xs: "none", md: "flex" },
  fontWeight: 700,
  fontSize: "2rem",
  color: theme.palette.text.contrastText,
  letterSpacing: ".3rem",
  textDecoration: "none",
}));

export const AvatarMenu = styled(Menu)(({ theme }) => ({
  marginTop: "45px",
  "& .MuiPaper-root": {
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[4],
  },
}));

export const MenuLink = styled(RouterLink)(({ theme }) => ({
  textDecoration: "none",
  color: theme.palette.text.primary,
}));

// .----------------------------------------------.
// |                    Footer                    |
// '----------------------------------------------'
export const PageFooter = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.footer,
  color: "footer.contrastText",
  padding: theme.spacing(4),
  textAlign: "center",

  fontSize: theme.typography.h1.fontSize,
  textDecoration: "underline",
}));

export const PageFooterText = styled(Typography)(({ theme }) => ({
  fontSize: theme.typography.h6.fontSize,
  color: theme.palette.text.contrastText,
  [theme.breakpoints.down("sm")]: { fontSize: theme.typography.body2.fontSize },
}));

export const LicenseLink = styled(RouterLink)(({ theme }) => ({
  color: theme.palette.text.contrastText,
}));
