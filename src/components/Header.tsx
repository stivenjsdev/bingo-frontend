import bingoLogo from "@/assets/logo.svg";
import { useGame } from "@/hooks/useGame";
import { disconnectSocket } from "@/sockets/socket";
import { useNavigate } from "react-router-dom";

type HeaderProps = {
  logoutButton?: boolean;
};

const Header = ({ logoutButton = false }: HeaderProps) => {
  const { dispatch } = useGame();
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("AUTH_TOKEN");
    dispatch({ type: "LOGOUT" });
    disconnectSocket(); // todo: delete this change to set socket state to null
    navigate("/auth/login");
  };

  return (
    <header className="max-h-20 bg-indigo-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-2 sm:py-4">
          <div className="flex items-center">
            <div className="flex items-center">
              <img className="w-11" src={bingoLogo} alt="" />
              <span className="ml-2 text-white text-xl font-semibold">
                Bin<span className="text-purple-300">Go</span>!
              </span>
            </div>
          </div>
          {logoutButton && (
            <nav className="flex items-center space-x-4">
              <button
                onClick={handleLogout}
                className="bg-white text-indigo-600 hover:bg-indigo-100 px-4 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out"
              >
                Cerrar Sesión
              </button>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
