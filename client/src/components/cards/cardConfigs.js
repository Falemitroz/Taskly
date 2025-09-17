import { Box, Tooltip } from "@mui/material";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import CheckIcon from "@mui/icons-material/Check";
import { BlurWrapper, ButtonOnBlur, ButtonOnBlurIcon } from "../../styles";

export const defaultConfig = {
  ImageContainer: Box,
  editIcon: <ModeEditIcon />,
  editTooltip: "Edit",
  overlayButton: null,
  fileInput: null,
  addTaskTooltip: "",
  showDelete: false,
};

export const getEditConfig = (openFilePicker, FileInput) => ({
  ImageContainer: BlurWrapper,
  editIcon: <CheckIcon />,
  editTooltip: "Close",
  overlayButton: (
    <Tooltip title="Add image">
      <ButtonOnBlur onClick={openFilePicker} sx={{ display: "block" }}>
        <ButtonOnBlurIcon sx={{ fontSize: 100 }} />
      </ButtonOnBlur>
    </Tooltip>
  ),
  fileInput: FileInput,
  addTaskTooltip: "Add Task",
  showDelete: true,
});
