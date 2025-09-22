import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../helpers/AuthContext";
import { useImageUploader } from "../../hooks/useImageUploader";
import { logout } from "../../services/apiSwitcher";
import { AuthForm } from "../forms";

import { Avatar, Tooltip, MenuItem } from "@mui/material";
import { NavbarContainer, Logo, AvatarMenu, MenuLink } from "../../styles";

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
        <Logo component={Link} to="/">
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
            <MenuLink to="/profile">Profile</MenuLink>
          </MenuItem>
          <MenuItem>
            <MenuLink to="/dashboard">Lists management</MenuLink>
          </MenuItem>
          <MenuItem onClick={handleLogout}>
            <MenuLink>Logout</MenuLink>
          </MenuItem>
        </AvatarMenu>
      )}
    </NavbarContainer>
  );
}

export default Navbar;
