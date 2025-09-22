import { useImageUploader } from "../../hooks/useImageUploader";
import { CardContent, Tooltip } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

import { EditableText } from "..";
import { defaultConfig, getEditConfig } from "./cardConfigs";

import {
  CardWrapper,
  EditButton,
  ImageContainer,
  CardImage,
  CardTasksWrapper,
  BlurWrapper,
  ButtonOnBlur,
  ButtonOnBlurIcon,
  DeleteImageButton,
  CardTitleContainer,
  DeleteListButton,
  DeleteListButtonWrapper,
} from "../../styles";

export const BaseCard = ({
  listId,
  image,
  listName = "New List",
  edit = false,
  setEdit,
  children,
  handleUpdate,
  onDeleteList,
  onDeleteImage,
  onImageUploaded,
}) => {
  const { preview, openFilePicker, FileInput } = useImageUploader({
    listId: listId,
    initialImage: image,
    onUploaded: (uploadedImage) => {
      onImageUploaded && onImageUploaded(uploadedImage);
    },
  });

  // Config overlay edit
  const mode = edit ? getEditConfig(openFilePicker, FileInput) : defaultConfig;

  return (
    <CardWrapper>
      {/* HEADER */}
      <ImageContainer>
        <mode.ImageContainer>
          <CardImage image={image || preview} />
        </mode.ImageContainer>

        {/* Delete Image */}
        <Tooltip title="Delete Image" arrow>
          <DeleteImageButton visible={mode.showDelete} onClick={onDeleteImage}>
            <DeleteForeverIcon />
          </DeleteImageButton>
        </Tooltip>

        {/* Edit / Close */}
        <Tooltip title={mode.editTooltip} arrow>
          <EditButton onClick={() => setEdit(!edit)}>
            {mode.editIcon}
          </EditButton>
        </Tooltip>

        {/* Overlay to add image */}
        {mode.overlayButton}
        {mode.fileInput}
      </ImageContainer>

      {/* BODY */}
      <CardContent>
        <CardTitleContainer>
          <EditableText
            value={listName}
            variant="h5"
            placeholder="Add list name..."
            editing={edit}
            tooltip={edit ? "Click to edit" : ""}
            onSave={handleUpdate}
            inputProps={{ maxLength: 26 }}
          />
        </CardTitleContainer>

        <CardTasksWrapper>{children}</CardTasksWrapper>
      </CardContent>
      {/* FOOTER */}
      <Tooltip title="Delete List" arrow>
        <DeleteListButtonWrapper>
          <DeleteListButton visible={mode.showDelete} onClick={onDeleteList}>
            Delete List
          </DeleteListButton>
        </DeleteListButtonWrapper>
      </Tooltip>
    </CardWrapper>
  );
};

// Bottone “New Card”
export const ButtonCard = ({ onClick }) => (
  <CardWrapper>
    <BlurWrapper>
      <BaseCard image="client/public/images/no-image.png" />
    </BlurWrapper>

    <ButtonOnBlur onClick={onClick}>
      <ButtonOnBlurIcon />
    </ButtonOnBlur>
  </CardWrapper>
);
