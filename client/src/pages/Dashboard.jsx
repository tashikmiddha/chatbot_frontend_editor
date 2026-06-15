import { Link } from "react-router-dom";

const Dashboard = () => {
  const cards = [
    {
      title: "Total Bots",
      value: "1",
    },
    {
      title: "Webhook",
      value: "Active",
    },
    {
      title: "Theme",
      value: "Custom",
    },
    {
      title: "Messages",
      value: "--",
    },
  ];

  return (
    <>
      <div className="page-header">
        <h1>
          Dashboard
        </h1>
        <p>
          Welcome to your
          AI chatbot control
          panel.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(220px,1fr))",
          gap: "20px",
        }}
      >
        {cards.map(
          (
            card,
            index
          ) => (
            <div
              key={index}
              className="settings-card"
            >
              <h3>
                {
                  card.title
                }
              </h3>
              <h1
                style={{
                  marginTop:
                    "15px",
                }}
              >
                {
                  card.value
                }
              </h1>
            </div>
          )
        )}
      </div>

      <div
        className="settings-card"
        style={{
          marginTop:
            "30px",
        }}
      >
        <h2>
          Quick Start
        </h2>

        <p
          style={{
            margin:
              "15px 0",
            color:
              "#94a3b8",
          }}
        >
          Configure your
          chatbot, connect
          your n8n webhook,
          customize the
          theme, and copy
          the generated
          embed script.
        </p>

        <Link
          to="/dashboard/settings"
          className="save-btn"
          style={{
            display:
              "inline-block",
            width: "auto",
            padding:
              "14px 24px",
            textDecoration:
              "none",
          }}
        >
          Configure Bot
        </Link>
      </div>
    </>
  );
};

export default Dashboard;