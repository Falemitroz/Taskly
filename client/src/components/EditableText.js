import { useState, useEffect, useRef } from "react";
import { TextField, Tooltip, Typography } from "@mui/material";

function EditableText({
  value: initialValue,
  onSave,
  variant = "body1",
  placeholder = "",
  tooltip = "",
  debounce = 1000,
  editing: parentEditing = false,
  textFieldProps,
  typographyProps,
}) {
  const [value, setValue] = useState(initialValue || "");
  const [editing, setEditing] = useState(false);
  const debounceRef = useRef(null);

  useEffect(() => {
    if (!editing) setValue(initialValue || "");
  }, [initialValue, editing]);

  const startEditing = () => {
    if (parentEditing) setEditing(true);
  };
  const stopEditing = () => setEditing(false);

  const save = async (val) => {
    if (val === "" || val === initialValue) return;
    try {
      await onSave(val);
    } catch (err) {
      console.error("Errore salvataggio:", err);
    }
  };

  const handleChange = (e) => {
    const val = e.target.value;
    setValue(val);

    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => save(val), debounce);
  };

  const handleBlur = async () => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    await save(value);
    stopEditing();
  };

  const handleKeyDown = async (e) => {
    if (e.key === "Enter" && !textFieldProps?.multiline) {
      e.preventDefault();
      if (debounceRef.current) clearTimeout(debounceRef.current);
      await save(value);
      stopEditing();
    }
  };

  return editing ? (
    <TextField
      fullWidth
      size="small"
      variant="outlined"
      value={value}
      onChange={handleChange}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      autoFocus
      placeholder={placeholder}
      {...textFieldProps}
    />
  ) : (
    <Typography variant={variant} onClick={startEditing} {...typographyProps}>
      <Tooltip title={tooltip} arrow>
        {value || placeholder}
      </Tooltip>
    </Typography>
  );
}

export default EditableText;
