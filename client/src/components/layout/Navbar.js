import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import { AuthContext } from "../../helpers/AuthContext";
import { useImageUploader } from "../../hooks/useImageUploader";
import { logout } from "../../services/apiSwitcher";
import { AuthForm } from "../forms";

import { Avatar, Tooltip, MenuItem, Typography } from "@mui/material";
import { NavbarContainer, Logo, AvatarMenu } from "../../styles";

function Navbar() {
  const { authForm, setAuthForm, setUser, user } = useContext(AuthContext);

  const [anchorElUser, setAnchorElUser] = useState(null);
  const navigate = useNavigate();

  const { preview, setPreview } = useImageUploader({
    initialImage: user?.avatar,
  });

  const handleAvatarClick = (event) => {
    user ? setAnchorElUser(event.currentTarget) : setAuthForm("login");
  };

  const handleCloseUserMenu = () => setAnchorElUser(null);

  const handleLogout = async () => {
    await logout();
    setUser(null);
    setPreview(null);
    handleCloseUserMenu();
    navigate("/");
  };

  return (
    <NavbarContainer>
      {["login", "registration"].includes(authForm) && (
        <AuthForm open type={authForm} />
      )}

      <Tooltip title="Go to homepage" arrow>
        <Logo component={RouterLink} to="/">
          TASKLY
        </Logo>
      </Tooltip>

      <Avatar
        alt="/broken-image.jpg"
        src={preview}
        onClick={handleAvatarClick}
      />

      {user && (
        <AvatarMenu
          id="avatar-menu"
          anchorEl={anchorElUser}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          keepMounted
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          <MenuItem>
            <Link to="/profile" color="text.primary">
              Profile
            </Link>
          </MenuItem>
          <MenuItem>
            <Link to="/dashboard" color="text.primary">
              Lists management
            </Link>
          </MenuItem>
          <MenuItem onClick={handleLogout}>
            <Typography color="text.primary">Logout</Typography>
          </MenuItem>
        </AvatarMenu>
      )}
    </NavbarContainer>
  );
}

export default Navbar;
