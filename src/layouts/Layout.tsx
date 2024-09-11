import Header from "@/components/Header";
import { usePlayer } from "@/hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";

const Layout = () => {
  const { data, isError, isLoading } = usePlayer();

  if (isLoading) return "Cargando...";
  if (isError) {
    return <Navigate to="/auth/login" />;
  }

  if (data)
    return (
      <div className="flex flex-col h-screen">
        <Header logoutButton />
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    );
};

export default Layout;
