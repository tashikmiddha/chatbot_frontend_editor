const ColorPicker = ({
  label,
  value,
  onChange,
}) => {
  return (
    <div className="color-picker">
      <label>{label}</label>

      <input
        type="color"
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
      />
    </div>
  );
};

export default ColorPicker;