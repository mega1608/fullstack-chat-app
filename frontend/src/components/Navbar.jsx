import { Link, useLocation } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, MessageSquare, Settings, User } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  const isActive = (path) => location.pathname === path;

  const handleLogout = async () => {
    setLoading(true);
    await logout();
    setLoading(false);
  };

  return (
    <header className="bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 backdrop-blur-lg bg-base-100/80">
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          {/* Logo Section */}
          <div className="flex items-center gap-8">
            <Link
              to="/"
              className="flex items-center gap-2.5 hover:opacity-80 transition-all"
              aria-label="Go to homepage"
            >
              <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-primary" />
              </div>
              <h1 className="text-lg font-bold">CHATT</h1>
            </Link>
          </div>

          {/* Navigation Section */}
          <div className="flex items-center gap-2">
            {/* Settings Link */}
            <Link
              to="/settings"
              className={`btn btn-sm gap-2 transition-colors ${
                isActive("/settings") ? "bg-primary text-white" : ""
              }`}
              aria-label="Settings"
            >
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Settings</span>
            </Link>

            {/* Conditional Rendering for Authenticated Users */}
            {authUser && (
              <>
                {/* Profile Link */}
                <Link
                  to="/profile"
                  className={`btn btn-sm gap-2 ${
                    isActive("/profile") ? "bg-primary text-white" : ""
                  }`}
                  aria-label="Profile"
                >
                  <User className="w-5 h-5" />
                  <span className="hidden sm:inline">Profile {authUser.name}</span>
                </Link>

                {/* Logout Button */}
                <button
                  className="flex gap-2 items-center btn btn-sm"
                  onClick={handleLogout}
                  disabled={loading}
                  aria-label="Logout"
                >
                  {loading ? (
                    <div className="animate-spin w-4 h-4 border-2 border-t-transparent rounded-full" />
                  ) : (
                    <LogOut className="w-5 h-5" />
                  )}
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
