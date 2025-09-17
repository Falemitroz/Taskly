import { useRef, useState } from "react";
import { uploadAvatar, uploadListImage } from "../services/apiSwitcher";

export function useImageUploader({ listId, initialImage, onUploaded }) {
  const [preview, setPreview] = useState(initialImage || null);
  const fileInputRef = useRef(null);

  const openFilePicker = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    try {
      const res = listId
        ? await uploadListImage(listId, file)
        : await uploadAvatar(file);

      const isMock = process.env.REACT_APP_USE_MOCK === "true";
      const fullPath = isMock
        ? res.path || initialImage
        : `${process.env.API_URL}${res.path}`;

      setPreview(fullPath);

      if (onUploaded) onUploaded(fullPath);

      setPreview(fullPath);
    } catch (err) {
      if (err.message)
        alert(
          "The image exceeds the maximum dimensions."
        ); // custom error for mock mode
      else alert("Session expired. Please log in again.");
    }
  };

  const FileInput = (
    <input
      type="file"
      accept="image/*"
      ref={fileInputRef}
      onChange={handleFileChange}
      style={{ display: "none" }}
    />
  );

  const displayImage =
    preview ||
    (initialImage ? initialImage : listId ? "/images/no-image.png" : "");

  return { preview: displayImage, openFilePicker, setPreview, FileInput };
}
