const PositionSelector = ({
  value,
  onChange,
}) => {
  return (
    <div className="position-selector">
      <button
        type="button"
        className={`position-btn ${
          value === "bottom-left"
            ? "active"
            : ""
        }`}
        onClick={() =>
          onChange("bottom-left")
        }
      >
        Bottom Left
      </button>

      <button
        type="button"
        className={`position-btn ${
          value === "bottom-right"
            ? "active"
            : ""
        }`}
        onClick={() =>
          onChange("bottom-right")
        }
      >
        Bottom Right
      </button>
    </div>
  );
};

export default PositionSelector;