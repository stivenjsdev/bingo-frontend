import { useNavigate } from "react-router-dom";
import { useGame } from "../hooks/useGame";

type HeaderProps = {
  logoutButton?: boolean;
};

const Header = ({ logoutButton = false }: HeaderProps) => {
  const { state, dispatch } = useGame();
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("AUTH_TOKEN");
    state.socket.disconnect();
    dispatch({ type: "LOGOUT" });
    navigate("/auth/login");
  };

  return (
    <header className="h-16 bg-indigo-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <div className="flex items-center">
              <svg
                className="h-8 w-8 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                />
              </svg>
              <span className="ml-2 text-white text-xl font-semibold">
                Bingo Game
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
