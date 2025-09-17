import { useContext, useState } from "react";
import { Grid, Typography, Dialog, Button, Box } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import PageLayout from "../PageLayout";

import {
  InfoWrapper,
  ProfileAvatar,
  ProfileDialog,
  ProfileDialogAction,
  ProfileDialogButton,
  ProfileTitle,
  ProfileWrapper,
} from "../styles";
import { AuthContext } from "../helpers/AuthContext";
// import { deleteAvatar, deleteUser } from "../services/api";
import { deleteAvatar, deleteUser } from "../services/apiSwitcher";
import { useNavigate } from "react-router-dom";
import { useImageUploader } from "../hooks/useImageUploader";

function Profile() {
  const { user, setUser, setAuthForm } = useContext(AuthContext);

  const { preview, openFilePicker, setPreview, FileInput } = useImageUploader({
    initialImage: user?.avatar,
    onUploaded: (newUrl) => setUser((prev) => ({ ...prev, avatar: newUrl })),
  });

  const [edit, setEdit] = useState(false);
  const [userDelete, setUserDelete] = useState(false);

  const navigate = useNavigate();

  const fields = [
    { label: "First Name", content: user?.firstName },
    { label: "Last Name", content: user?.lastName },
    { label: "Email", content: user?.email },
  ];

  const handleAvatarClick = async (variant) => {
    try {
      if (variant === "edit") {
        user ? openFilePicker() : setAuthForm("login");
      } else {
        await deleteAvatar();
        setUser((prev) => ({ ...prev, avatar: null }));
        setPreview(null);
      }
      setEdit(false);
    } catch (error) {
      setEdit(false);
      setAuthForm("login");
    }
  };

  const handleUserDelete = async () => {
    try {
      await deleteUser();
      setUser(null);
      navigate("/");
    } catch (error) {
      console.error("Error deleting account: ", error);
    }
  };

  return (
    <PageLayout>
      <ProfileWrapper>
        {/* HEADER */}
        <ProfileTitle>User informations</ProfileTitle>

        <ProfileAvatar
          src={preview}
          alt="/broken-image.jpg"
          onClick={() => setEdit(true)}
        />

        {FileInput}

        <Dialog open={edit} onClose={() => setEdit(false)}>
          <Box padding={2}>
            <Typography variant="body2">
              Load, update or delete your avatar.
            </Typography>
          </Box>
          <ProfileDialogAction>
            <ProfileDialogButton
              variant="delete"
              onClick={() => handleAvatarClick("delete")}
            >
              <DeleteForeverIcon />
            </ProfileDialogButton>
            <ProfileDialogButton
              variant="edit"
              onClick={() => handleAvatarClick("edit")}
            >
              <ModeEditIcon />
            </ProfileDialogButton>
          </ProfileDialogAction>
        </Dialog>

        {/* BODY */}
        <InfoWrapper container columns={{ xs: 1, md: 2 }}>
          {fields.map((field, index) => (
            <Grid key={index} size={1}>
              <Typography variant="h4">{field.label}</Typography>
              <Typography varian="body2">{field.content}</Typography>
            </Grid>
          ))}
        </InfoWrapper>
        {/* FOOTER */}
        <Button
          variant="contained"
          color="cancel"
          onClick={() => setUserDelete(true)}
        >
          Delete account permanently
        </Button>
        <Dialog open={userDelete} onClose={() => setUserDelete(false)}>
          <Box padding={2}>
            <Typography variant="body2">
              Are you sure you want to permanently delete your account?
            </Typography>
          </Box>
          <ProfileDialog>
            <Button color="primary" onClick={() => setUserDelete(false)}>
              Cancel
            </Button>
            <Button color="cancel" onClick={handleUserDelete}>
              Confirm
            </Button>
          </ProfileDialog>
        </Dialog>
      </ProfileWrapper>
    </PageLayout>
  );
}

export default Profile;
