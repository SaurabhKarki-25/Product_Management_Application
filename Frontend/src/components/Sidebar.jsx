import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  const linkClass = ({ isActive }) =>
    `block px-4 py-2 rounded font-medium ${
      isActive ? "bg-blue-200" : "hover:bg-blue-100"
    }`;

  return (
    <div className="w-64 bg-white shadow-lg p-6 flex flex-col justify-between">
      
      {/* Top */}
      <div>
        <h2 className="text-xl font-bold mb-8">Admin Panel</h2>

        <nav className="space-y-2">
          <NavLink to="/dashboard" end className={linkClass}>
            Dashboard
          </NavLink>

          <NavLink to="/dashboard/products" end className={linkClass}>
            Products
          </NavLink>

          <NavLink to="/dashboard/products/add" className={linkClass}>
            Add Product
          </NavLink>
        </nav>
      </div>

      {/* Bottom */}
      <button
        onClick={logout}
        className="mt-8 w-full bg-red-100 text-red-700 py-2 rounded-lg font-semibold hover:bg-red-200 transition"
      >
        Logout
      </button>
    </div>
  );
}
