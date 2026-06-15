import {
  FaEnvelope,
  FaUser,
} from "react-icons/fa";

import useAuth from "../hooks/useAuth";

const Account = () => {
  const { user } =
    useAuth();

  return (
    <>
      <div className="page-header">
        <h1>
          Account
        </h1>

        <p>
          Manage your
          profile settings.
        </p>
      </div>

      <div
        className="settings-card"
        style={{
          maxWidth:
            "700px",
        }}
      >
        <div
          style={{
            display:
              "flex",
            flexDirection:
              "column",
            gap: "25px",
          }}
        >
          <div
            style={{
              display:
                "flex",
              alignItems:
                "center",
              gap: "16px",
            }}
          >
            <FaUser
              size={
                22
              }
            />

            <div>
              <small>
                Full Name
              </small>
              <h3>
                {user?.name}
              </h3>
            </div>
          </div>

          <div
            style={{
              display:
                "flex",
              alignItems:
                "center",
              gap: "16px",
            }}
          >
            <FaEnvelope
              size={
                22
              }
            />

            <div>
              <small>
                Email
              </small>
              <h3>
                {user?.email}
              </h3>
            </div>
          </div>

          <button className="save-btn">
            Change Password
          </button>
        </div>
      </div>
    </>
  );
};

export default Account;