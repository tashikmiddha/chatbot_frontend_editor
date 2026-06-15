import { useRef } from "react";

const UploadBox = ({
  label,
  value,
  placeholder,
  onChange,
}) => {
  const fileInputRef = useRef(null);

  const handlePick = () => {
    fileInputRef.current?.click();
  };

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Convert file to a data URL so it can be used immediately.
    // Backend can persist it later if needed.
    const reader = new FileReader();
    reader.onload = () => {
      onChange?.(String(reader.result || ""));
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="upload-box">
      <div className="upload-label">
        {label}
      </div>

      <div className="upload-row">
        <input
          type="text"
          className="upload-input"
          value={value}
          placeholder={placeholder}
          onChange={(e) =>
            onChange?.(e.target.value)
          }
        />

        <button
          type="button"
          className="upload-btn"
          onClick={handlePick}
        >
          Upload
        </button>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="upload-file-input"
          onChange={handleFile}
        />
      </div>

      {value ? (
        <div className="upload-preview">
          <img
            src={value}
            alt={label}
          />
        </div>
      ) : null}
    </div>
  );
};

export default UploadBox;

