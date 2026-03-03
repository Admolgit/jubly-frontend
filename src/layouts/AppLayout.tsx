/* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { useState } from "react";
// import { useSelector } from "react-redux";
// import { NavLink } from "react-router-dom";

// function AppLayout({ children }: any) {
//   const user = useSelector((state: { auth: { user: any } }) => state.auth.user);
//   const [isOpen, setIsOpen] = useState(false);

//   const navItems = [
//     { name: "Home", path: "/dashboard" },
//     { name: "Profile", path: "/profile" },
//     { name: "Settings", path: "/settings" },
//     { name: "Reports", path: "/reports" },
//   ];

//   return (
//     <div className="flex min-h-screen bg-gray-50">
//       {/* Mobile overlay */}
//       {isOpen && (
//         <div
//           className="fixed inset-0 bg-black opacity-25 z-10 md:hidden"
//           onClick={() => setIsOpen(false)}
//         />
//       )}

//       {/* Mobile toggle button */}
//       <button
//         className="absolute top-4 left-4 md:hidden bg-blue-600 text-white p-2 rounded-md z-20"
//         onClick={() => setIsOpen(!isOpen)}
//       >
//         {isOpen ? "Close" : "Menu"}
//       </button>

//       {/* SideNav */}
//       <aside
//         className={`fixed top-0 left-0 h-full bg-white shadow-md w-64 transform transition-transform duration-300 z-20
//           ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:relative`}
//       >
//         <div className="p-6 font-bold text-xl border-b">
//           {user?.email || "Jubly"}
//         </div>
//         <nav className="flex-1 p-4 space-y-2">
//           {navItems.map((item) => (
//             <NavLink
//               key={item.name}
//               to={item.path}
//               className={({ isActive }) =>
//                 `block px-4 py-2 rounded hover:bg-blue-100 ${
//                   isActive ? "bg-blue-200 font-semibold" : "text-gray-700"
//                 }`
//               }
//               onClick={() => setIsOpen(false)} // close mobile menu
//             >
//               {item.name}
//             </NavLink>
//           ))}
//         </nav>
//         <div className="p-4 border-t">
//           <button className="w-full text-left text-red-500 hover:text-red-700">
//             Logout
//           </button>
//         </div>
//       </aside>

//       {/* Main content */}
//       <main className="flex-1 p-6 md:ml-64">{children}</main>
//     </div>
//   );
// }

// export default AppLayout;

import { Outlet } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

export default function AppLayout() {
  const user = useSelector((state: { auth: { user: any } }) => state.auth.user);
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Home", path: "/dashboard" },
    { name: "Profile", path: "/profile" },
    { name: "Settings", path: "/settings" },
    { name: "Reports", path: "/reports" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Mobile toggle button */}
      <button
        className="absolute top-4 left-4 md:hidden bg-blue-600 text-white p-2 rounded-md z-20"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? "Close" : "Menu"}
      </button>

      {/* SideNav */}
      <aside
        className={`fixed top-0 left-0 h-full bg-white shadow-md w-64 transform transition-transform duration-300 z-20
          ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:relative`}
      >
        <div className="p-6 font-bold text-xl border-b">
          {user?.email || "Jubly"}
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `block px-4 py-2 rounded hover:bg-blue-100 ${
                  isActive ? "bg-blue-200 font-semibold" : "text-gray-700"
                }`
              }
              onClick={() => setIsOpen(false)}
            >
              {item.name}
            </NavLink>
          ))}
        </nav>
        <div className="p-4 border-t">
          <button className="w-full text-left text-red-500 hover:text-red-700">
            Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 md:ml-64">
        <Outlet />
      </main>
    </div>
  );
}
