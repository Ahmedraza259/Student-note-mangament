import { useNavigate } from "react-router-dom";

const LogOut = () => {
    const navigate = useNavigate()
    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        navigate("/");
      };
  return (
    <>
      <button type="button" className="btn btn-danger" onClick={handleLogout}>
        Logout
      </button>
    </>
  );
};

export default LogOut;
