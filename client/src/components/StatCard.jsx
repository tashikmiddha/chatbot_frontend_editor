const StatCard = ({
  title,
  value,
  icon,
}) => {
  return (
    <div className="settings-card">
      <div
        style={{
          display: "flex",
          justifyContent:
            "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <p
            style={{
              color: "#94a3b8",
            }}
          >
            {title}
          </p>

          <h2
            style={{
              marginTop: "10px",
            }}
          >
            {value}
          </h2>
        </div>

        <div
          style={{
            fontSize: "2rem",
          }}
        >
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatCard;