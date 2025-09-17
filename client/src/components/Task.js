import { useEffect, useState } from "react";
import { ListItem, Checkbox, Box, Tooltip, IconButton } from "@mui/material";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { getTask, updateTask, deleteTask } from "../services/apiSwitcher";
import { EditableText } from "./";

function Task({ id, listId, editMode }) {
  const [task, setTask] = useState(null);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await getTask(listId, id);
        setTask(res);
        setChecked(Boolean(res?.status));
      } catch (err) {
        console.error("fetch error:", err);
      }
    };
    fetchTask();
  }, [id, listId]);

  const handleUpdate = async (field, newValue) => {
    try {
      const res = await updateTask(listId, id, { [field]: newValue });
      setTask(res);
    } catch (err) {
      console.error("Error Task update:", err);
    }
  };

  const handleChange = async (e) => {
    const newChecked = e.target.checked;
    setChecked(newChecked);
    handleUpdate("status", newChecked);
  };

  const handleDelete = async () => {
    try {
      await deleteTask(listId, id);
      setTask(null);
    } catch (error) {
      console.error("Error Task delete:", error);
    }
  };

  if (!task) return null;

  return (
    <ListItem>
      {editMode ? (
        <Tooltip title="Delete">
          <IconButton color="cancel">
            <DeleteForeverIcon onClick={handleDelete} />
          </IconButton>
        </Tooltip>
      ) : (
        <Checkbox
          checked={checked}
          onChange={handleChange}
          icon={<RadioButtonUncheckedIcon />}
          checkedIcon={<RadioButtonCheckedIcon />}
        />
      )}

      <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
        {["title", "description"].map((field) => (
          <EditableText
            key={field}
            value={task?.[field]}
            variant={field === "title" ? "h6" : "body2"}
            placeholder={
              field === "description" && editMode
                ? "Add description..."
                : "Add title..."
            }
            tooltip={editMode ? "Click to edit" : ""}
            editing={editMode}
            textFieldProps={field === "description" ? { multiline: true } : {}}
            typographyProps={
              field === "description" ? { sx: { whiteSpace: "pre-wrap" } } : {}
            }
            onSave={(newValue) => handleUpdate(field, newValue)}
          />
        ))}
      </Box>
    </ListItem>
  );
}

export default Task;
